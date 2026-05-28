const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..", "components", "stats");
const D = "motionGlobeLearningCard"; // placeholder replaced below

function fix(s) {
  return s.split(D).join("div");
}

const statsChart = fix(`
"use client";

import { motion } from "framer-motion";
import { StatsChartPoint } from "@/lib/types";

export function StatsChart({ title, points }: { title: string; points: StatsChartPoint[] }) {
  if (points.length === 0) return null;
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl"
    >
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-purple">{title}</p>
      <${D} className="flex h-52 items-end justify-between gap-2 md:gap-4">
        {points.map((point, index) => {
          const heightPercent = (point.value / max) * 100;
          return <ChartBar key={point.id} point={point} index={index} heightPercent={heightPercent} />;
        })}
      </${D}>
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
    <${D} className="flex flex-1 flex-col items-center gap-2">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.8 }}
        style={{
          height: \`\${heightPercent}%\`,
          minHeight: point.value > 0 ? 8 : 4,
          transformOrigin: "bottom",
        }}
        className="relative flex w-full max-w-[48px] items-end rounded-t-lg bg-gradient-to-t from-purple/30 via-purple to-cyan-400/80"
      >
        <span className="absolute -top-6 left-1/2 w-max -translate-x-1/2 text-xs font-medium text-slate-300">
          {point.value}
        </span>
      </motion.div>
      <span className="text-center text-[10px] uppercase tracking-wider text-slate-500 md:text-xs">
        {point.label}
      </span>
    </${D}>
  );
}
`);

const learningPaths = fix(`
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LearningItem, LearningPlatform } from "@/lib/types";
import { FaGraduationCap, FaYoutube } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { cn } from "@/lib/utils";

const platformStyles: Record<
  LearningPlatform,
  { color: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  Coursera: { color: "text-blue-400", Icon: SiCoursera },
  YouTube: { color: "text-red-400", Icon: FaYoutube },
  Udemy: { color: "text-violet-400", Icon: FaGraduationCap },
  Other: { color: "text-slate-400", Icon: FaGraduationCap },
};

export function LearningPaths({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: LearningItem[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl"
    >
      <${D} className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">{title}</p>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </${D}>
      <${D} className="space-y-4">
        {items.map((item, index) => (
          <LearningCard key={item.id} item={item} index={index} />
        ))}
      </${D}>
    </motion.div>
  );
}

function LearningCard({ item, index }: { item: LearningItem; index: number }) {
  const { Icon, color } = platformStyles[item.platform] ?? platformStyles.Other;
  const inner = (
    <${D}
      className={cn(
        "group block rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-purple/40",
        item.url && "hover:bg-slate-900"
      )}
    >
      <${D} className="flex gap-4">
        <${D} className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
          {item.icon ? (
            <Image src={item.icon} alt="" width={32} height={32} className="object-contain" />
          ) : (
            <Icon className={cn("h-6 w-6", color)} />
          )}
        </${D}>
        <${D} className="min-w-0 flex-1">
          <${D} className="flex flex-wrap items-start justify-between gap-2">
            <${D}>
              <p className="font-medium text-white transition group-hover:text-purple">{item.title}</p>
              <p className="text-xs text-slate-500">
                <span className={color}>{item.platform}</span> · {item.category}
              </p>
            </${D}>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider",
                item.status === "completed"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400"
              )}
            >
              {item.status === "completed" ? "Done" : "In progress"}
            </span>
          </${D}>
          <${D} className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: \`\${item.progress}%\` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={cn(
                "h-full rounded-full bg-gradient-to-r from-purple to-cyan-400",
                item.status === "completed" && "from-emerald-500 to-emerald-300"
              )}
            />
          </${D}>
          <p className="mt-1 text-right text-xs text-slate-500">{item.progress}% complete</p>
        </${D}>
      </${D}>
    </${D}>
  );

  if (item.url) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 }}
      >
        <Link href={item.url} target="_blank" rel="noopener noreferrer">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      {inner}
    </motion.div>
  );
}
`);

const statsAchievements = fix(`
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StatsSection } from "@/lib/types";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { CountUp } from "./CountUp";
import { StatsChart } from "./StatsChart";
import { LearningPaths } from "./LearningPaths";
import { cn } from "@/lib/utils";

export default function StatsAchievements({ section }: { section: StatsSection }) {
  return (
    <section id="stats" className="relative mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-purple/10 lg:p-10">
      <${D} className="pointer-events-none absolute inset-0">
        <${D} className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.12)_0%,_transparent_55%)]" />
        <ShootingStars minSpeed={6} maxSpeed={14} starColor="#c4b5fd" trailColor="#8b5cf6" className="opacity-40" />
      </${D}>

      <${D} className="relative z-10 mb-10 text-center">
        <span className="inline-flex rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-purple">
          Impact & Growth
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{section.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">{section.description}</p>
      </${D}>

      <${D} className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {section.metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-purple/40"
          >
            <${D} className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple/10 blur-2xl transition group-hover:bg-purple/20" />
            {metric.icon ? (
              <${D} className="relative mb-3 h-10 w-10">
                <Image src={metric.icon} alt="" fill className="object-contain" />
              </${D}>
            ) : null}
            <p className="text-3xl font-bold text-white md:text-4xl">
              <CountUp end={metric.value} suffix={metric.suffix ?? ""} />
            </p>
            <p className="mt-2 text-sm font-semibold text-purple">{metric.label}</p>
            <p className="mt-1 text-xs text-slate-500">{metric.description}</p>
          </motion.div>
        ))}
      </${D}>

      <${D} className="relative z-10 mt-10 grid gap-6 lg:grid-cols-2">
        <StatsChart title={section.chartTitle} points={section.chartPoints} />
        <LearningPaths
          title={section.learningTitle}
          description={section.learningDescription}
          items={section.learningItems}
        />
      </${D}>
    </section>
  );
}
`);

fs.mkdirSync(base, { recursive: true });
fs.writeFileSync(path.join(base, "StatsChart.tsx"), statsChart);
fs.writeFileSync(path.join(base, "LearningPaths.tsx"), learningPaths);
fs.writeFileSync(path.join(base, "StatsAchievements.tsx"), statsAchievements);
console.log("done");
