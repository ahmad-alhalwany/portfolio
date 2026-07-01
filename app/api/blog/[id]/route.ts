import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deletePost, getPostById, updatePost } from "@/lib/blog";

export const dynamic = "force-dynamic";

type RouteContext = { params: { id: string } };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const post = await getPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  // Drafts are sensitive — only expose to authenticated admin.
  if (post.status !== "published") {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updatePost(params.id, {
      title: body?.title?.toString(),
      slug: body?.slug?.toString(),
      excerpt: body?.excerpt?.toString(),
      body: body?.body?.toString(),
      coverImage: body?.coverImage?.toString(),
      author: body?.author?.toString(),
      tags: Array.isArray(body?.tags) ? body.tags.map(String) : undefined,
      status: body?.status === "published" ? "published" : body?.status === "draft" ? "draft" : undefined,
      publishedAt: body?.publishedAt?.toString(),
    });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    revalidatePath("/blog");
    if (updated.slug) revalidatePath(`/blog/${updated.slug}`);

    return NextResponse.json({ post: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getPostById(params.id);
  const ok = await deletePost(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ success: true });
}
