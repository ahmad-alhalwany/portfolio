"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaAward, FaBookOpen, FaBrain, FaGlobeAmericas } from "react-icons/fa";
import { StatsSection } from "@/lib/types";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";
import { StatsChart } from "./StatsChart";
import { LearningPaths } from "./LearningPaths";
import { useLocale } from "@/components/i18n/LocaleProvider";

const METRIC_ACCENT: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; glow: string; value: string }
> = {
  certs: {
    icon: FaAward,
    glow: "from-emerald-500/20 via-emerald-500/5",
    value: "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-white md:to-emerald-200",
  },
  active: {
    icon: FaBookOpen,
    glow: "from-amber-500/25 via-amber-500/5",
    value: "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-white md:to-amber-200",
  },
  ml: {
    icon: FaBrain,
    glow: "from-violet-500/25 via-violet-500/5",
    value: "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-white md:to-violet-200",
  },
  platforms: {
    icon: FaGlobeAmericas,
    glow: "from-cyan-500/20 via-cyan-500/5",
    value: "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-white md:to-cyan-200",
  },
};

const DEFAULT_ACCENT = {
  icon: FaAward,
  glow: "from-purple/25 via-purple/5",
  value: "text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-br md:from-white md:to-purple-200",
};

export default function StatsAchievements({ section }: { section: StatsSection }) {
  const { t } = useLocale();
  const completedTotal =
    section.metrics.find((m) => m.id === "certs")?.value ??
    section.learningItems.filter((i) => i.status === "completed").length;

  const inProgressCount = section.learningItems.filter((i) => i.status === "in_progress").length;

  return (
    <section
      id="stats"
      className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-slate-950/80 p-6 shadow-[0_0_80px_-20px_rgba(139,92,246,0.35)] backdrop-blur-sm lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(34,211,238,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <ShootingStars
          minSpeed={6}
          maxSpeed={14}
          starColor="#c4b5fd"
          trailColor="#8b5cf6"
          className="opacity-35"
        />
      </div>

      <div className="relative z-10 mb-10 text-center">
        <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-purple shadow-[0_0_24px_-4px_rgba(139,92,246,0.5)] sm:px-4 sm:text-sm sm:tracking-[0.22em]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple" aria-hidden />
          {t("stats.badge")}
        </span>
        <h2 className="mt-5 text-3xl font-bold text-white md:bg-gradient-to-b md:from-white md:via-white md:to-slate-400 md:bg-clip-text md:text-transparent md:text-4xl lg:text-[2.75rem]">
          {section.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {section.description}
        </p>
      </div>

      {section.metrics.length === 0 ? (
        <p className="relative z-10 py-10 text-center text-slate-500">
          {t("stats.noMetrics")}
        </p>
      ) : (
        <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {section.metrics.map((metric, i) => {
            const accent = METRIC_ACCENT[metric.id] ?? DEFAULT_ACCENT;
            const Icon = accent.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 120 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/50 p-6 backdrop-blur-md transition duration-300 hover:border-purple/25 hover:shadow-[0_12px_40px_-12px_rgba(139,92,246,0.35)]"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    accent.glow
                  )}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 text-purple shadow-inner">
                      {metric.icon ? (
                        <div className="relative h-6 w-6">
                          <Image src={metric.icon} alt="" fill className="object-contain" />
                        </div>
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <p className={cn("text-4xl font-bold tabular-nums md:text-[2.75rem]", accent.value)}>
                    <CountUp end={metric.value} suffix={metric.suffix ?? ""} />
                  </p>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-slate-200">{metric.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{metric.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {(section.chartPoints.length > 0 || section.learningItems.length > 0) && (
        <div className="relative z-10 mt-12 space-y-10">
          {section.chartPoints.length > 0 && section.learningItems.length > 0 ? (
            <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
              <div className="xl:col-span-4 xl:sticky xl:top-24">
                <StatsChart title={section.chartTitle} points={section.chartPoints} />
              </div>
              <div className="xl:col-span-8">
                <LearningPaths
                  title={section.learningTitle}
                  description={section.learningDescription}
                  items={section.learningItems}
                  completedTotal={completedTotal}
                  inProgressCount={inProgressCount}
                  embedded
                />
              </div>
            </div>
          ) : (
            <>
              {section.chartPoints.length > 0 ? (
                <div className="mx-auto max-w-lg">
                  <StatsChart title={section.chartTitle} points={section.chartPoints} />
                </div>
              ) : null}
              {section.learningItems.length > 0 ? (
                <LearningPaths
                  title={section.learningTitle}
                  description={section.learningDescription}
                  items={section.learningItems}
                  completedTotal={completedTotal}
                  inProgressCount={inProgressCount}
                />
              ) : null}
            </>
          )}
        </div>
      )}
    </section>
  );
}
