"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LearningItem, LearningPlatform } from "@/lib/types";
import { FaArrowRight, FaGraduationCap, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

const platformStyles: Record<
  LearningPlatform,
  { color: string; ring: string; bar: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  Coursera: {
    color: "text-blue-400",
    ring: "ring-blue-500/30",
    bar: "from-blue-500 to-indigo-500",
    Icon: SiCoursera,
  },
  YouTube: {
    color: "text-red-400",
    ring: "ring-red-500/30",
    bar: "from-red-500 to-rose-500",
    Icon: FaYoutube,
  },
  Udemy: {
    color: "text-violet-400",
    ring: "ring-violet-500/30",
    bar: "from-violet-500 to-purple",
    Icon: FaGraduationCap,
  },
  Other: {
    color: "text-teal-400",
    ring: "ring-teal-500/30",
    bar: "from-teal-500 to-cyan-500",
    Icon: FaGraduationCap,
  },
};

const CATEGORY_ORDER = [
  "Machine Learning & AI",
  "Software Development",
  "Data & Analytics",
  "IT & Infrastructure",
  "Project Management",
  "Security",
  "Languages",
  "Business & HR",
];

function groupByCategory(items: LearningItem[]): { category: string; items: LearningItem[] }[] {
  const map = new Map<string, LearningItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

function SectionHeader({
  title,
  badge,
  badgeClass,
  subtitle,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      <span
        className={cn(
          "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
          badgeClass
        )}
      >
        {badge}
      </span>
    </div>
  );
}

export function LearningPaths({
  title,
  description,
  items,
  completedTotal,
  inProgressCount,
  embedded = false,
}: {
  title: string;
  description: string;
  items: LearningItem[];
  completedTotal?: number;
  inProgressCount?: number;
  /** When true, skip outer panel (used beside chart). */
  embedded?: boolean;
}) {
  const { t } = useLocale();
  if (items.length === 0) return null;

  const inProgress = items.filter((i) => i.status === "in_progress");
  const completed = items.filter((i) => i.status === "completed");
  const completedGroups = groupByCategory(completed);
  const showViewAll =
    completedTotal != null && completedTotal > completed.length && completed.length > 0;

  const content = (
  <>
      <div className={cn("mb-8", embedded && "mb-6")}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">{title}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      <div className="space-y-12">
        {inProgress.length > 0 ? (
          <div>
            <SectionHeader
              title={t("learning.currentlyLearning")}
              badge={t("learning.activeBadge").replace("{n}", String(inProgressCount ?? inProgress.length))}
              badgeClass="border-amber-500/25 bg-amber-500/10 text-amber-300"
              subtitle={t("learning.currentlySubtitle")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {inProgress.map((item, index) => (
                <LearningCard key={item.id} item={item} index={index} variant="active" />
              ))}
            </div>
          </div>
        ) : null}

        {completedGroups.length > 0 ? (
          <div>
            <SectionHeader
              title={t("learning.recentCerts")}
              badge={
                completedTotal != null
                  ? `${completed.length} / ${completedTotal}`
                  : t("learning.shownBadge").replace("{n}", String(completed.length))
              }
              badgeClass="border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
              subtitle={t("learning.recentSubtitle")}
            />
            <div className="space-y-8">
              {completedGroups.map((group) => (
                <div key={group.category}>
                  <h4 className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
                    <span className="shrink-0 text-cyan-400/90">{group.category}</span>
                    <span className="h-px flex-1 bg-gradient-to-l from-cyan-500/40 to-transparent" />
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.items.map((item, index) => (
                      <LearningCard key={item.id} item={item} index={index} variant="cert" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {showViewAll ? (
              <div className="mt-8 flex justify-center">
                <Link
                  href="/education"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-purple/30 bg-gradient-to-r from-purple/15 to-violet-500/10 px-6 py-3 text-sm font-medium text-purple shadow-[0_0_30px_-8px_rgba(139,92,246,0.5)] transition hover:border-purple/50 hover:from-purple/25 hover:to-violet-500/15"
                >
                  {t("learning.viewAllCerts").replace("{n}", String(completedTotal))}
                  <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
  </>
  );

  if (embedded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/30 p-6 shadow-xl backdrop-blur-md lg:p-8"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-purple/10 blur-3xl" />
      <div className="relative">{content}</div>
    </motion.div>
  );
}

function LearningCard({
  item,
  index,
  variant,
}: {
  item: LearningItem;
  index: number;
  variant: "active" | "cert";
}) {
  const style = platformStyles[item.platform] ?? platformStyles.Other;
  const { Icon, color, ring, bar } = style;
  const isActive = variant === "active";
  const isCert = variant === "cert";

  const inner = (
    <div
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm transition duration-300",
        "hover:border-white/10 hover:bg-slate-900/80 hover:shadow-[0_16px_48px_-20px_rgba(139,92,246,0.45)]",
        isActive ? "p-5" : "p-4",
        isActive && "hover:-translate-y-0.5"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b opacity-80",
          isActive ? "from-amber-400 to-purple" : "from-emerald-400 to-cyan-400"
        )}
      />

      <div className="flex gap-3.5 pl-2">
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl border bg-white shadow-md transition group-hover/card:scale-[1.02]",
            ring,
            "ring-2",
            isActive ? "h-[4.5rem] w-[3.25rem]" : "h-16 w-12"
          )}
        >
          {item.icon ? (
            <Image
              src={item.icon}
              alt=""
              fill
              className="object-cover object-left-top"
              sizes="52px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
              <Icon className={cn("h-6 w-6", color)} />
            </div>
          )}
          {isActive ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover/card:opacity-100">
              <FaPlayCircle className="h-7 w-7 text-white/90" />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <p className={cn("font-semibold leading-snug text-white", isCert && "text-sm")}>
            {item.title}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
            {item.issuer ? <span className="text-slate-400">{item.issuer}</span> : null}
            {item.issuer ? <span className="text-slate-600">·</span> : null}
            <span className={cn("font-medium", color)}>{item.platform}</span>
            {item.completedAt ? (
              <>
                <span className="text-slate-600">·</span>
                <span>{item.completedAt}</span>
              </>
            ) : null}
          </p>
        </div>

        {isCert ? (
          <span className="shrink-0 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
            ✓
          </span>
        ) : (
          <span className="shrink-0 self-start rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold tabular-nums text-amber-200">
            {item.progress}%
          </span>
        )}
      </div>

      {item.summary && isActive ? (
        <p className="mt-4 pl-2 text-sm leading-relaxed text-slate-400 line-clamp-2">{item.summary}</p>
      ) : null}

      {item.skills && item.skills.length > 0 && isActive ? (
        <ul className="mt-3 flex flex-wrap gap-1.5 pl-2">
          {item.skills.slice(0, 3).map((skill) => (
            <li
              key={skill}
              className="rounded-lg border border-white/[0.06] bg-slate-950/60 px-2 py-0.5 text-[11px] text-slate-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      ) : null}

      {isActive ? (
        <div className="mt-4 pl-2">
          <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
            <span>Progress</span>
            <span className="tabular-nums text-slate-400">{item.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              className={cn("h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_-2px_rgba(251,191,36,0.8)]", bar)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: 14 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { delay: index * 0.05, type: "spring" as const, stiffness: 140, damping: 18 },
    className: "h-full",
  };

  if (item.url) {
    return (
      <motion.div {...motionProps}>
        <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return <motion.div {...motionProps}>{inner}</motion.div>;
}
