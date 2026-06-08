import fs from "fs/promises";
import path from "path";
import { BlogPost, BlogPostPublic, BlogPostStatus } from "./types";
import { estimateReadTime, slugify } from "./blog-shared";

export { estimateReadTime, slugify } from "./blog-shared";

const blogPath = path.join(process.cwd(), "data", "blog.json");

type BlogStore = { posts: BlogPost[] };

async function readStore(): Promise<BlogStore> {
  try {
    const file = await fs.readFile(blogPath, "utf8");
    return JSON.parse(file) as BlogStore;
  } catch {
    return { posts: [] };
  }
}

async function writeStore(store: BlogStore): Promise<void> {
  await fs.mkdir(path.dirname(blogPath), { recursive: true });
  await fs.writeFile(blogPath, JSON.stringify(store, null, 2), "utf8");
}

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt).getTime();
    const dateB = new Date(b.publishedAt || b.createdAt).getTime();
    return dateB - dateA;
  });
}

export function toPublicPost(post: BlogPost): BlogPostPublic {
  const { status: _status, ...publicPost } = post;
  return publicPost;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const store = await readStore();
  return sortPosts(store.posts);
}

export async function getPublishedPosts(): Promise<BlogPostPublic[]> {
  const posts = await getAllPosts();
  const seen = new Set<string>();
  return posts
    .filter((p) => p.status === "published")
    .filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    })
    .map(toPublicPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPostPublic | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const store = await readStore();
  return store.posts.find((p) => p.id === id) ?? null;
}

async function ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
  const store = await readStore();
  let candidate = slug;
  let counter = 1;
  while (store.posts.some((p) => p.slug === candidate && p.id !== excludeId)) {
    candidate = `${slug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

export async function createPost(
  input: Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt" | "readTimeMinutes"> & {
    slug?: string;
  }
): Promise<BlogPost> {
  const store = await readStore();
  const id = `post_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  const baseSlug = slugify(input.slug || input.title) || id;
  const slug = await ensureUniqueSlug(baseSlug);

  const post: BlogPost = {
    id,
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body,
    coverImage: input.coverImage || "/blog/default-cover.jpg",
    author: input.author.trim() || "Ahmad Alhalwany",
    tags: input.tags.filter(Boolean),
    status: input.status,
    readTimeMinutes: estimateReadTime(input.body),
    publishedAt: input.status === "published" ? input.publishedAt || now : null,
    createdAt: now,
    updatedAt: now,
  };

  store.posts.unshift(post);
  await writeStore(store);
  return post;
}

export async function updatePost(
  id: string,
  input: Partial<
    Omit<BlogPost, "id" | "createdAt" | "readTimeMinutes"> & { slug?: string }
  >
): Promise<BlogPost | null> {
  const store = await readStore();
  const index = store.posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = store.posts[index];
  const now = new Date().toISOString();
  const nextStatus = input.status ?? current.status;
  const nextBody = input.body ?? current.body;

  let nextSlug = current.slug;
  if (input.slug !== undefined || input.title !== undefined) {
    const base = slugify(input.slug || input.title || current.title);
    nextSlug = await ensureUniqueSlug(base, id);
  }

  const updated: BlogPost = {
    ...current,
    ...input,
    slug: nextSlug,
    title: input.title?.trim() ?? current.title,
    excerpt: input.excerpt?.trim() ?? current.excerpt,
    body: nextBody,
    author: input.author?.trim() ?? current.author,
    tags: input.tags ?? current.tags,
    status: nextStatus,
    readTimeMinutes: estimateReadTime(nextBody),
    publishedAt:
      nextStatus === "published"
        ? input.publishedAt ?? current.publishedAt ?? now
        : null,
    updatedAt: now,
  };

  store.posts[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.posts.filter((p) => p.id !== id);
  if (next.length === store.posts.length) return false;
  await writeStore({ posts: next });
  return true;
}

export async function getAdminPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
