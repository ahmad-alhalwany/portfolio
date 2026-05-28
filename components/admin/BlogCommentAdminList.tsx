"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BlogComment } from "@/lib/types";

type Props = {
  /** When set, only comments for this article slug are shown */
  postSlug?: string;
  /** Show article slug on each row (useful in global comments view) */
  showPostSlug?: boolean;
  /** Heading override */
  title?: string;
  description?: string;
  /** Called after approve, reject, or delete */
  onUpdated?: () => void;
  defaultFilter?: "all" | BlogComment["status"];
};

export function BlogCommentAdminList({
  postSlug,
  showPostSlug = !postSlug,
  title = "Comments",
  description = "Approve, reject, or delete visitor comments.",
  onUpdated,
  defaultFilter = "all",
}: Props) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | BlogComment["status"]>(defaultFilter);

  const normalizedSlug = postSlug?.trim().toLowerCase() ?? "";

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const query = normalizedSlug
        ? `/api/comments?slug=${encodeURIComponent(normalizedSlug)}&admin=true`
        : "/api/comments?all=true";
      const res = await fetch(query);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [normalizedSlug]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const setStatus = async (id: string, status: BlogComment["status"]) => {
    setActionId(id);
    setMessage("");
    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      await loadComments();
      onUpdated?.();
      if (status === "approved" && filter === "pending") {
        setFilter("approved");
      }
      setMessage(`Comment ${status}.`);
    } catch {
      setMessage("Could not update comment.");
    } finally {
      setActionId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    setActionId(id);
    setMessage("");
    try {
      const res = await fetch(`/api/comments?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await loadComments();
      onUpdated?.();
      setMessage("Comment deleted.");
    } catch {
      setMessage("Could not delete comment.");
    } finally {
      setActionId(null);
    }
  };

  const scoped = useMemo(() => comments, [comments]);

  const pending = scoped.filter((c) => c.status === "pending");
  const approved = scoped.filter((c) => c.status === "approved");
  const rejected = scoped.filter((c) => c.status === "rejected");

  const visible =
    filter === "all" ? scoped : scoped.filter((c) => c.status === filter);

  if (postSlug && !normalizedSlug) {
    return (
      <p className="text-sm text-slate-500">Save a slug for this article to manage comments.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-amber-300">{pending.length} pending</span>
        <span className="text-emerald-300">{approved.length} approved</span>
        <span className="text-red-300">{rejected.length} rejected</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="ml-auto rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {message && (
        <p className={`text-sm ${message.includes("Could not") ? "text-red-300" : "text-emerald-300"}`}>
          {message}
        </p>
      )}
      {loading && <p className="text-slate-400">Loading comments…</p>}
      {!loading && visible.length === 0 && (
        <p className="text-slate-400">
          {postSlug ? "No comments on this article yet." : "No comments in this filter."}
        </p>
      )}

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {visible.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white">{comment.name}</p>
                <p className="text-xs text-slate-500">
                  {showPostSlug ? `${comment.postSlug} · ` : ""}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase ${
                  comment.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : comment.status === "rejected"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {comment.status}
              </span>
            </div>
            <p className="text-sm text-slate-300">&ldquo;{comment.message}&rdquo;</p>
            <p className="text-xs text-slate-500">{comment.email}</p>
            <div className="flex flex-wrap gap-2">
              {comment.status !== "approved" && (
                <button
                  type="button"
                  disabled={actionId === comment.id}
                  onClick={() => setStatus(comment.id, "approved")}
                  className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                >
                  Approve
                </button>
              )}
              {comment.status !== "rejected" && (
                <button
                  type="button"
                  disabled={actionId === comment.id}
                  onClick={() => setStatus(comment.id, "rejected")}
                  className="rounded-full border border-red-500 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                >
                  Reject
                </button>
              )}
              <button
                type="button"
                disabled={actionId === comment.id}
                onClick={() => remove(comment.id)}
                className="rounded-full border border-red-500/50 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/15 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
