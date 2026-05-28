import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  addReview,
  getAllReviews,
  getApprovedReviews,
  updateReviewStatus,
} from "@/lib/reviews";
import { guardPublicForm } from "@/lib/security-server";
import {
  normalizeReviewInput,
  validateReviewSubmit,
} from "@/lib/security-shared";
import { ReviewStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "true";

  if (all) {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reviews = await getAllReviews();
    return NextResponse.json({ reviews });
  }

  const reviews = await getApprovedReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const guard = await guardPublicForm(request, body, "review");
    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.message, retryAfterSec: guard.retryAfterSec },
        { status: guard.status }
      );
    }

    const input = normalizeReviewInput(body);
    const errors = validateReviewSubmit(input);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const review = await addReview({
      name: input.name,
      email: input.email,
      message: input.message,
      rating: input.rating,
      avatar: input.avatar,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review is pending approval.",
        reviewId: review.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review submit error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
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

    const updated = await updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}
