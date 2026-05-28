"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Content, BlogPost, BlogSection, BlogComment } from "@/lib/types";
import { slugify } from "@/lib/blog-shared";
import { BlogCommentAdminList } from "@/components/admin/BlogCommentAdminList";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { normalizeUploadUrl } from "@/lib/upload-url";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const defaultBlogSection: BlogSection = {
  title: "Insights & Articles",
  description: "Technical writing, lessons from real projects, and ideas worth sharing.",
  viewAllLabel: "View all articles",
  readLatestLabel: "Read latest article",
};

const emptyPost = (): Partial<BlogPost> => ({
  title: "",
  slug: "",
  excerpt: "",
  body: "<p>Start writing your article...</p>",
  coverImage: "/project/plaze1.png",
  author: "Ahmad Alhalwany",
  tags: [],
  status: "draft",
});

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function BlogAdminSection({ content, setContent }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<BlogPost>>(emptyPost());
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const section = content.blogSection ?? defaultBlogSection;

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?all=true");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    loadPosts();
  }, [loadPosts]);

  const loadCommentCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/comments?all=true");
      if (!res.ok) return;
      const data = await res.json();
      const comments = (data.comments ?? []) as BlogComment[];
      const counts: Record<string, number> = {};
      for (const comment of comments) {
        if (comment.status !== "pending") continue;
        counts[comment.postSlug] = (counts[comment.postSlug] ?? 0) + 1;
      }
      setCommentCounts(counts);
    } catch {
      setCommentCounts({});
    }
  }, []);

  useEffect(() => {
    loadCommentCounts();
  }, [loadCommentCounts, posts]);

  useEffect(() => {
    if (!selectedId) {
      setDraft(emptyPost());
      setTagsInput("");
      return;
    }
    const post = posts.find((p) => p.id === selectedId);
    if (post) {
      setDraft(post);
      setTagsInput(post.tags.join(", "));
    }
  }, [selectedId, posts]);

  const updateSection = (key: keyof BlogSection, value: string) => {
    setContent({
      ...content,
      blogSection: { ...section, [key]: value },
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog");
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return normalizeUploadUrl(data.url as string);
  };

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          // eslint-disable-next-line
          image: function imageHandler(this: { quill: { getSelection: (focus?: boolean) => { index: number } | null; insertEmbed: (i: number, t: string, u: string) => void; setSelection: (i: number) => void } }) {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
              formData.append("folder", "blog");
              const res = await fetch("/api/upload", { method: "POST", body: formData });
              if (!res.ok) return;
              const data = await res.json();
              const range = this.quill.getSelection(true);
              if (!range) return;
              this.quill.insertEmbed(range.index, "image", data.url);
              this.quill.setSelection(range.index + 1);
            };
          },
        },
      },
    }),
    []
  );

  const savePost = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: draft.title,
      slug: draft.slug || slugify(draft.title || ""),
      excerpt: draft.excerpt,
      body: draft.body,
      coverImage: draft.coverImage,
      author: draft.author,
      tags,
      status: draft.status,
    };

    try {
      if (selectedId) {
        const res = await fetch(`/api/blog/${selectedId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        setMessage("Article updated.");
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const data = await res.json();
        setSelectedId(data.post.id);
        setMessage("Article created.");
      }
      await loadPosts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async () => {
    if (!selectedId || !confirm("Delete this article permanently?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${selectedId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSelectedId(null);
      setMessage("Article deleted.");
      await loadPosts();
    } catch {
      setError("Could not delete article.");
    } finally {
      setSaving(false);
    }
  };


  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg space-y-8">
      <header>
        <h2 className="text-2xl font-semibold">Blog & Articles</h2>
        <p className="text-slate-400 mt-1">Write, publish, and manage articles. Section copy saves with the main Save button.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm lg:col-span-2">
          Section title
          <input
            value={section.title}
            onChange={(e) => updateSection("title", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Description
          <textarea
            value={section.description}
            onChange={(e) => updateSection("description", e.target.value)}
            className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          View all label
          <input
            value={section.viewAllLabel}
            onChange={(e) => updateSection("viewAllLabel", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Read latest label
          <input
            value={section.readLatestLabel}
            onChange={(e) => updateSection("readLatestLabel", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <div className="border-t border-slate-800 pt-6 grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Articles</h3>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="rounded-full bg-purple px-3 py-1 text-xs font-semibold text-black"
            >
              + New
            </button>
          </div>
          {loading && <p className="text-sm text-slate-400">Loading...</p>}
          <ul className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
            {posts.map((post) => (
              <li key={post.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(post.id)}
                  className={`w-full rounded-xl border p-3 text-left text-sm transition ${
                    selectedId === post.id
                      ? "border-purple bg-purple/10 text-white"
                      : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <p className="font-medium line-clamp-1">{post.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs capitalize text-slate-500">
                    <span>{post.status}</span>
                    {(commentCounts[post.slug.toLowerCase()] ?? 0) > 0 && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-300 normal-case">
                        {commentCounts[post.slug.toLowerCase()]} pending
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <EditorToolbar
            draft={draft}
            selectedId={selectedId}
            saving={saving}
            onSave={savePost}
            onDelete={deletePost}
          />

          <label className="block space-y-1 text-sm">
            Title
            <input
              value={draft.title || ""}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  title: e.target.value,
                  slug: d.slug || slugify(e.target.value),
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </label>

          <label className="block space-y-1 text-sm">
            Slug
            <input
              value={draft.slug || ""}
              onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </label>

          <label className="block space-y-1 text-sm">
            Excerpt
            <textarea
              value={draft.excerpt || ""}
              onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
              rows={2}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1 text-sm">
              Author
              <input
                value={draft.author || ""}
                onChange={(e) => setDraft((d) => ({ ...d, author: e.target.value }))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </label>
            <label className="block space-y-1 text-sm">
              Tags (comma separated)
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
              />
            </label>
          </div>

          <label className="block space-y-1 text-sm">
            Status
            <select
              value={draft.status || "draft"}
              onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as BlogPost["status"] }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>


          <AdminImageUpload
            label="Cover image"
            hint="PNG, JPG, WebP — max 2MB"
            value={draft.coverImage || ""}
            folder="blog"
            onChange={(url) => setDraft((d) => ({ ...d, coverImage: url }))}
            allowManualUrl={false}
            previewHeight="sm"
          />

          <label className="block space-y-2 text-sm">
            Article body
            <div className="blog-editor rounded-xl border border-slate-700 bg-white text-black overflow-hidden">
              {isClient && (
                <ReactQuill
                  theme="snow"
                  value={draft.body || ""}
                  onChange={(body) => setDraft((d) => ({ ...d, body }))}
                  modules={quillModules}
                  className="min-h-[280px]"
                />
              )}
            </div>
          </label>

          {message && <p className="text-sm text-emerald-300">{message}</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}

          {selectedId && draft.slug && (
            <div className="border-t border-slate-800 pt-6">
              <BlogCommentAdminList
                key={draft.slug}
                postSlug={draft.slug}
                title="Article comments"
                description="Comments on this article — approve to publish or delete permanently."
                onUpdated={loadCommentCounts}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EditorToolbar({
  draft,
  selectedId,
  saving,
  onSave,
  onDelete,
}: {
  draft: Partial<BlogPost>;
  selectedId: string | null;
  saving: boolean;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
      <p className="font-medium text-white">{selectedId ? "Edit article" : "New article"}</p>
      <div className="flex flex-wrap gap-2">
        {draft.slug && draft.status === "published" && (
          <Link
            href={`/blog/${draft.slug}`}
            target="_blank"
            className="rounded-full border border-slate-600 px-4 py-2 text-xs text-slate-300 hover:text-white"
          >
            Preview
          </Link>
        )}
        {selectedId && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="rounded-full border border-red-500 px-4 py-2 text-xs text-red-300"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-purple px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Saving..." : selectedId ? "Update article" : "Create article"}
        </button>
      </div>
    </div>
  );
}
