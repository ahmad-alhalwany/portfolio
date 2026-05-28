"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReviewPublic } from "@/lib/types";
import { toMediaServeUrl } from "@/lib/upload-url";
import { StarRating } from "./StarRating";

type ReviewDetailModalProps = {
  review: ReviewPublic | null;
  onClose: () => void;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewDetailModal({ review, onClose }: ReviewDetailModalProps) {
  return (
    <AnimatePresence>
      {review && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close review"
          />
          <motion.article
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-purple/30 bg-slate-950 p-8 shadow-2xl shadow-purple/20"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-400 hover:text-white"
            >
              Close
            </button>

            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-purple/50 bg-slate-900">
                {review.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={toMediaServeUrl(review.avatar)}
                    alt={review.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xl font-bold text-purple">
                    {initials(review.name)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{review.name}</h3>
                <StarRating value={review.rating} readOnly size="md" />
                <p className="mt-1 text-sm text-slate-400">
                  Voice from {review.lat.toFixed(1)}°, {review.lng.toFixed(1)}°
                </p>
              </div>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-slate-200">&ldquo;{review.message}&rdquo;</p>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">
              {new Date(review.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
