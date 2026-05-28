"use client";

import { useCallback, useEffect, useState } from "react";
import { Content, Review, TestimonialsSection } from "@/lib/types";

const defaultTestimonials: TestimonialsSection = {
  title: "Voices orbiting the globe",
  description:
    "Each glowing particle is a real testimonial from clients and colleagues worldwide.",
  ctaLabel: "Add your review",
};

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function ReviewsAdminSection({ content, setContent }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const section = content.testimonialsSection ?? defaultTestimonials;

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews?all=true");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setReviews(data.reviews ?? []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const updateSection = (key: keyof TestimonialsSection, value: string) => {
    setContent({
      ...content,
      testimonialsSection: {
        ...section,
        [key]: value,
      },
    });
  };

  const setStatus = async (id: string, status: Review["status"]) => {
    setActionId(id);
    setMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      await loadReviews();
      setMessage(`Review ${status}.`);
    } catch {
      setMessage("Could not update review.");
    } finally {
      setActionId(null);
    }
  };

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const rejected = reviews.filter((r) => r.status === "rejected");

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20 space-y-8">
      <SectionHeader />

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
            className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          CTA button label
          <input
            value={section.ctaLabel}
            onChange={(e) => updateSection("ctaLabel", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <p className="text-xs text-slate-500">
        Save changes with the button at the bottom to update section text on the site.
      </p>

      <div className="border-t border-slate-800 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-xl font-semibold">Moderate reviews</h3>
          <div className="flex gap-3 text-sm text-slate-400">
            <span className="text-amber-300">{pending.length} pending</span>
            <span className="text-emerald-300">{approved.length} approved</span>
            <span className="text-red-300">{rejected.length} rejected</span>
          </div>
        </div>

        {message && <p className="mb-4 text-sm text-emerald-300">{message}</p>}
        {loading && <p className="text-slate-400">Loading reviews...</p>}

        {!loading && reviews.length === 0 && (
          <p className="text-slate-400">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3"
            >
              <ReviewMeta review={review} />
              <p className="text-slate-300 text-sm">&ldquo;{review.message}&rdquo;</p>
              <p className="text-xs text-slate-500">{review.email}</p>
              <div className="flex flex-wrap gap-2">
                {review.status !== "approved" && (
                  <button
                    type="button"
                    disabled={actionId === review.id}
                    onClick={() => setStatus(review.id, "approved")}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                  >
                    Approve
                  </button>
                )}
                {review.status !== "rejected" && (
                  <button
                    type="button"
                    disabled={actionId === review.id}
                    onClick={() => setStatus(review.id, "rejected")}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    Reject
                  </button>
                )}
                {review.status !== "pending" && (
                  <button
                    type="button"
                    disabled={actionId === review.id}
                    onClick={() => setStatus(review.id, "pending")}
                    className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50"
                  >
                    Mark pending
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Testimonials & Reviews</h2>
      <p className="text-slate-400 mt-1">
        Edit the testimonials section copy and approve or reject visitor submissions.
      </p>
    </div>
  );
}

function ReviewMeta({ review }: { review: Review }) {
  const statusColor =
    review.status === "approved"
      ? "text-emerald-400 bg-emerald-500/10"
      : review.status === "rejected"
        ? "text-red-400 bg-red-500/10"
        : "text-amber-400 bg-amber-500/10";

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <ReviewTitle review={review} />
      <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-wider ${statusColor}`}>
        {review.status}
      </span>
    </div>
  );
}

function ReviewTitle({ review }: { review: Review }) {
  return (
    <div>
      <p className="font-semibold text-white">
        {review.name} · {"★".repeat(review.rating)}
      </p>
      <p className="text-xs text-slate-500">
        {new Date(review.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
