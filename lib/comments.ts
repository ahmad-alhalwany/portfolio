import fs from "fs/promises";
import path from "path";
import { BlogComment, BlogCommentPublic, ReviewStatus } from "./types";

const commentsPath = path.join(process.cwd(), "data", "comments.json");

type CommentsStore = { comments: BlogComment[] };

async function readStore(): Promise<CommentsStore> {
  try {
    const file = await fs.readFile(commentsPath, "utf8");
    return JSON.parse(file) as CommentsStore;
  } catch {
    return { comments: [] };
  }
}

async function writeStore(store: CommentsStore): Promise<void> {
  await fs.mkdir(path.dirname(commentsPath), { recursive: true });
  await fs.writeFile(commentsPath, JSON.stringify(store, null, 2), "utf8");
}

function toPublic(comment: BlogComment): BlogCommentPublic {
  return {
    id: comment.id,
    postSlug: comment.postSlug,
    name: comment.name,
    message: comment.message,
    createdAt: comment.createdAt,
  };
}

export async function getAllComments(): Promise<BlogComment[]> {
  const store = await readStore();
  return store.comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getApprovedCommentsForPost(
  postSlug: string
): Promise<BlogCommentPublic[]> {
  const comments = await getAllComments();
  return comments
    .filter((c) => c.postSlug === postSlug && c.status === "approved")
    .map(toPublic);
}

export async function getCommentsForPostAdmin(postSlug: string): Promise<BlogComment[]> {
  const slug = postSlug.trim().toLowerCase();
  const comments = await getAllComments();
  return comments.filter((c) => c.postSlug === slug);
}

export async function addComment(input: {
  postSlug: string;
  name: string;
  email: string;
  message: string;
}): Promise<BlogComment> {
  const store = await readStore();
  const slug = input.postSlug.trim().toLowerCase();

  const comment: BlogComment = {
    id: `cmt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    postSlug: slug,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  store.comments.unshift(comment);
  await writeStore(store);
  return comment;
}

export async function updateCommentStatus(
  id: string,
  status: ReviewStatus
): Promise<BlogComment | null> {
  const store = await readStore();
  const index = store.comments.findIndex((c) => c.id === id);
  if (index === -1) return null;

  store.comments[index] = { ...store.comments[index], status };
  await writeStore(store);
  return store.comments[index];
}

export async function deleteComment(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.comments.filter((c) => c.id !== id);
  if (next.length === store.comments.length) return false;
  await writeStore({ comments: next });
  return true;
}
