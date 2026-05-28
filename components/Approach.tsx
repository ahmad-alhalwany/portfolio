"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChartLine,
  FaCode,
  FaHandshake,
  FaRocket,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { ApproachCard, ApproachSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

const PHASE_ICONS = [FaSearch, FaCode, FaRocket] as const;

const PHASE_THEMES = [
  {
    canvas: "bg-emerald-950/80",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "from-emerald-500/20",
    ring: "ring-emerald-500/20",
  },
  {
    canvas: "bg-purple/10",
    accent: "text-purple",
    border: "border-purple/35",
    glow: "from-purple/25",
    ring: "ring-purple/25",
    colors: [
      [236, 72, 153],
      [232, 121, 249],
    ],
    dotSize: 2,
  },
  {
    canvas: "bg-sky-950/80",
    accent: "text-sky-300",
    border: "border-sky-500/30",
    glow: "from-sky-500/20",
    ring: "ring-sky-500/20",
    colors: [[125, 211, 252]],
  },
] as const;

function CornerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-5 w-5 text-slate-500", className)}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

function PhaseCard({
  card,
  index,
}: {
  card: ApproachCard;
  index: number;
}) {
  const { t } = useLocale();
  const [hovered, setHovered] = React.useState(false);
  const theme = PHASE_THEMES[index] ?? PHASE_THEMES[0];
  const Icon = PHASE_ICONS[index] ?? FaHandshake;
  const phaseLabel = card.phaseLabel ?? `0${index + 1} · Phase ${index + 1}`;

  const title = card.title?.trim() || `Phase ${index + 1}`;
  const description =
    card.description?.trim() ||
    "Structured delivery with clear milestones and stakeholder alignment.";

  return (
    <div className="flex h-full w-full min-h-[28rem] md:min-h-[32rem]">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group relative flex h-full w-full min-h-[28rem] flex-col overflow-hidden rounded-3xl border bg-page-card p-6 transition duration-500 md:min-h-[32rem] md:p-8",
          theme.border,
          theme.ring,
          "ring-1 hover:border-slate-600"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 transition group-hover:opacity-70",
            theme.glow
          )}
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={3 + index * 1.1}
                containerClassName={cn("h-full w-full", theme.canvas)}
                colors={
                  "colors" in theme
                    ? theme.colors.map((c) => [...c] as number[])
                    : undefined
                }
                dotSize={"dotSize" in theme ? theme.dotSize : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CornerIcon className="absolute -left-2 -top-2" />
        <CornerIcon className="absolute -bottom-2 -left-2" />
        <CornerIcon className="absolute -right-2 -top-2" />
        <CornerIcon className="absolute -bottom-2 -right-2" />

        <div className="relative z-20 flex min-h-0 flex-1 flex-col">
          <div className="mb-6 flex shrink-0 items-start justify-between gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
                theme.border,
                theme.accent,
                "bg-black/40"
              )}
            >
              {phaseLabel}
            </span>
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border bg-black/50",
                theme.border,
                theme.accent
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
          </div>

          <h3 className="shrink-0 text-xl font-bold leading-snug text-page-fg md:text-2xl">
            {title}
          </h3>

          <p className="mt-4 shrink-0 text-sm leading-relaxed text-page-muted md:text-base">
            {description}
          </p>

          {(card.highlights?.length ?? 0) > 0 && (
            <ul className="mt-6 flex-1 space-y-3.5 border-t border-page pt-6">
              {card.highlights!.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-page-fg">
                  <FaShieldAlt className={cn("mt-1 h-3.5 w-3.5 shrink-0", theme.accent)} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-auto shrink-0 pt-6 text-[10px] font-medium uppercase tracking-widest text-page-muted transition group-hover:text-page-fg">
            {t("approach.hoverHint")}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Approach({ approach }: { approach: ApproachSection }) {
  const { t } = useLocale();
  const titleParts = approach.title.trim().split(/\s+/);
  const lead = titleParts[0] ?? "How";
  const accent = titleParts.slice(1).join(" ") || "I work";

  return (
    <section id="approach" className="relative w-full py-20">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px max-w-4xl mx-auto bg-gradient-to-r from-transparent via-purple/20 to-transparent" />

      <SectionHeading>
        {lead} <span className="text-purple">{accent ? ` ${accent}` : ""}</span>
      </SectionHeading>

      <ScrollReveal className="mx-auto mt-4 max-w-2xl text-center" variant="fadeUp">
        <p className="text-sm leading-relaxed text-page-muted md:text-base">
          {approach.subtitle ??
            "A structured way I partner with teams — clear communication, reliable delivery, and software that lasts."}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-4 text-xs text-page-muted">
        <span className="inline-flex items-center gap-2">
          <FaHandshake className="text-purple" />
          Built for long-term hires
        </span>
        <span className="inline-flex items-center gap-2">
          <FaChartLine className="text-emerald-400" />
          Metrics-driven phases
        </span>
      </div>

      <StaggerReveal className="relative mx-auto mt-12 grid max-w-6xl auto-rows-fr grid-cols-1 items-stretch gap-6 px-2 md:grid-cols-3 md:gap-6">
        {approach.cards.map((card, index) => (
          <StaggerItem key={card.id} className="h-full w-full">
            <PhaseCard card={card} index={index} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
