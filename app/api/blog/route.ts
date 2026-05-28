import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createPost, getAllPosts, getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "true";
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const posts = all && (await isAdminRequest(request))
      ? await getAllPosts()
      : await getPublishedPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  }

  if (all) {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  }

  const posts = await getPublishedPosts();
  return NextResponse.json(
    { posts },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } }
  );
}

export async function POST(request: NextRequest) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = body?.title?.toString().trim();
    if (!title || title.length < 3) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const post = await createPost({
      title,
      slug: body?.slug?.toString(),
      excerpt: body?.excerpt?.toString() || "",
      body: body?.body?.toString() || "",
      coverImage: body?.coverImage?.toString() || "",
      author: body?.author?.toString() || "Ahmad Alhalwany",
      tags: Array.isArray(body?.tags) ? body.tags.map(String) : [],
      status: body?.status === "published" ? "published" : "draft",
      publishedAt: body?.publishedAt?.toString() || null,
    });

    revalidatePath("/blog");
    if (post.slug) revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
