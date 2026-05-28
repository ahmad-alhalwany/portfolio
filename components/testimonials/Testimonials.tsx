"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ReviewPublic, TestimonialsSection } from "@/lib/types";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ReviewParticles } from "./ReviewParticles";
import { ReviewsGlobe } from "./ReviewsGlobe";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { AddReviewModal } from "./AddReviewModal";
import { useLocale } from "@/components/i18n/LocaleProvider";

const defaultSection: TestimonialsSection = {
  title: "Voices orbiting the globe",
  description:
    "Each glowing particle is a real testimonial from clients and colleagues worldwide. Move your cursor to attract them — click to read their story.",
  ctaLabel: "Add your review",
};

export default function Testimonials({
  section = defaultSection,
}: {
  section?: TestimonialsSection;
}) {
  const { t } = useLocale();
  const [reviews, setReviews] = useState<ReviewPublic[]>([]);
  const [selected, setSelected] = useState<ReviewPublic | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newReviewIds, setNewReviewIds] = useState<string[]>([]);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      const list: ReviewPublic[] = data.reviews ?? [];

      const freshIds: string[] = [];
      for (const r of list) {
        if (!knownIdsRef.current.has(r.id)) {
          freshIds.push(r.id);
        }
      }

      if (knownIdsRef.current.size > 0 && freshIds.length > 0) {
        setNewReviewIds(freshIds);
        setTimeout(() => setNewReviewIds([]), 4000);
      }

      list.forEach((r) => knownIdsRef.current.add(r.id));
      setReviews(list);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <section
      id="reviews"
      className="relative mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-purple/10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_65%)]" />
        
        <ShootingStars
          minSpeed={8}
          maxSpeed={18}
          starColor="#c4b5fd"
          trailColor="#8b5cf6"
          className="opacity-60"
        />
      </div>

      <div className="relative z-10 px-6 py-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-purple">
            {t("testimonials.badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{section.title}</h2>
          <p className="mt-4 text-slate-300">{section.description}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
            {t("testimonials.hint").replace("{n}", String(reviews.length))}
          </p>
        </motion.div>

        <div className="relative mx-auto mt-10 h-[min(640px,75vh)] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800/80 bg-black/40">
          <ReviewsGlobe reviews={reviews} />

          {!loading && reviews.length > 0 && (
            <ReviewParticles reviews={reviews} newReviewIds={newReviewIds} onSelect={setSelected} />
          )}

          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center text-slate-400">
              Loading voices from around the world...
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <EmptyOrbitState onAdd={() => setAddOpen(true)} ctaLabel={section.ctaLabel} />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="group relative overflow-hidden rounded-full bg-purple px-8 py-3 font-semibold text-black shadow-lg shadow-purple/30 transition hover:scale-105"
          >
            <span className="relative z-10">{section.ctaLabel}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-500 group-hover:translate-x-full" />
          </button>
        </div>
      </div>

      <ReviewDetailModal review={selected} onClose={() => setSelected(null)} />
      <AddReviewModal open={addOpen} onClose={() => setAddOpen(false)} onSubmitted={loadReviews} />
    </section>
  );
}

function motionGlobeBgLayer() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(6,182,212,0.12)_0%,_transparent_40%)]" />
  );
}

function EmptyOrbitState({ onAdd, ctaLabel }: { onAdd: () => void; ctaLabel: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="max-w-sm text-slate-400">Be the first voice in orbit — share your experience.</p>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full border border-purple/50 px-6 py-2 text-purple hover:bg-purple/10"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
