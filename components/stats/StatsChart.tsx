"use client";

import { motion } from "framer-motion";
import { StatsChartPoint } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatsChart({ title, points }: { title: string; points: StatsChartPoint[] }) {
  if (points.length === 0) return null;
  const max = Math.max(...points.map((p) => p.value), 1);
  const total = points.reduce((s, p) => s + p.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/40 p-6 shadow-xl backdrop-blur-md"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple/15 blur-3xl" />
      <div className="relative mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{total}</p>
          <p className="text-xs text-slate-500">total completed</p>
        </div>
      </div>

      <div className="relative flex h-48 items-end justify-between gap-2 rounded-xl border border-white/[0.04] bg-slate-950/50 px-3 pb-2 pt-8 md:gap-3 md:px-4">
        <div
          className="pointer-events-none absolute inset-x-3 top-8 bottom-10 flex flex-col justify-between"
          aria-hidden
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-px w-full bg-slate-800/60" />
          ))}
        </div>
        {points.map((point, index) => {
          const heightPercent = (point.value / max) * 100;
          return (
            <ChartBar key={point.id} point={point} index={index} heightPercent={heightPercent} />
          );
        })}
      </div>
    </motion.div>
  );
}

function ChartBar({
  point,
  index,
  heightPercent,
}: {
  point: StatsChartPoint;
  index: number;
  heightPercent: number;
}) {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center gap-2">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: `${heightPercent}%`,
          minHeight: point.value > 0 ? 10 : 4,
          transformOrigin: "bottom",
        }}
        className={cn(
          "relative w-full max-w-[44px] rounded-t-md shadow-[0_0_20px_-4px_rgba(139,92,246,0.6)]",
          "bg-gradient-to-t from-purple/40 via-purple to-cyan-400/90",
          "ring-1 ring-inset ring-white/10"
        )}
      >
        <span className="absolute -top-7 left-1/2 w-max -translate-x-1/2 text-xs font-semibold tabular-nums text-white">
          {point.value}
        </span>
      </motion.div>
      <span className="text-center text-[10px] font-medium uppercase tracking-wider text-slate-500 md:text-xs">
        {point.label}
      </span>
    </div>
  );
}
