import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  addComment,
  deleteComment,
  getAllComments,
  getApprovedCommentsForPost,
  getCommentsForPostAdmin,
  updateCommentStatus,
} from "@/lib/comments";
import { guardPublicForm } from "@/lib/security-server";
import {
  normalizeCommentInput,
  validateCommentSubmit,
} from "@/lib/security-shared";
import { ReviewStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim().toLowerCase();
  const all = request.nextUrl.searchParams.get("all") === "true";
  const adminScope = request.nextUrl.searchParams.get("admin") === "true";

  if (all || (slug && adminScope)) {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (slug && adminScope) {
      const comments = await getCommentsForPostAdmin(slug);
      return NextResponse.json({ comments });
    }
    const comments = await getAllComments();
    return NextResponse.json({ comments });
  }

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const comments = await getApprovedCommentsForPost(slug);
  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const guard = await guardPublicForm(request, body, "comment");
    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.message, retryAfterSec: guard.retryAfterSec },
        { status: guard.status }
      );
    }

    const input = normalizeCommentInput(body);
    const errors = validateCommentSubmit(input);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const comment = await addComment(input);

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your comment will appear after approval.",
        commentId: comment.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment submit error:", error);
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = body?.id?.toString();
    const status = body?.status as ReviewStatus;

    if (!id || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
    }

    const updated = await updateCommentStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ comment: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const ok = await deleteComment(id);
  if (!ok) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
