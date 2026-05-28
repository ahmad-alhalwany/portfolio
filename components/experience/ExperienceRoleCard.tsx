"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaCheckCircle, FaCode } from "react-icons/fa";
import { EmploymentType, WorkExperience } from "@/lib/types";
import {
  getCompany,
  getRole,
  inferEmploymentType,
} from "@/lib/work-experience-utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const TYPE_THEME: Record<
  EmploymentType,
  { label: string; accent: string; dot: string; ring: string; gradient: string }
> = {
  "full-time": {
    label: "Full-time",
    accent: "text-purple",
    dot: "bg-purple",
    ring: "ring-purple/30",
    gradient: "from-purple/25 to-transparent",
  },
  internship: {
    label: "Internship",
    accent: "text-cyan-300",
    dot: "bg-cyan-400",
    ring: "ring-cyan-500/30",
    gradient: "from-cyan-500/20 to-transparent",
  },
  freelance: {
    label: "Freelance",
    accent: "text-amber-300",
    dot: "bg-amber-400",
    ring: "ring-amber-500/30",
    gradient: "from-amber-500/20 to-transparent",
  },
  contract: {
    label: "Contract",
    accent: "text-emerald-300",
    dot: "bg-emerald-400",
    ring: "ring-emerald-500/30",
    gradient: "from-emerald-500/20 to-transparent",
  },
};

type Props = {
  item: WorkExperience;
  index: number;
};

export function ExperienceRoleCard({ item, index }: Props) {
  const type = inferEmploymentType(item);
  const theme = TYPE_THEME[type];
  const company = getCompany(item);
  const role = getRole(item);
  const body = item.overview || item.desc;
  const paragraphs =
    body.includes("\n")
      ? body.split("\n").filter(Boolean)
      : body.match(/[^.!?]+[.!?]+/g)?.length && body.length > 120
        ? body.match(/[^.!?]+[.!?]+/g)!.map((s) => s.trim())
        : [body];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative"
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 blur-sm transition duration-500 group-hover:opacity-100",
          `bg-gradient-to-br ${theme.gradient}`
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-[1.65rem] border border-slate-800/90 bg-slate-950/90 shadow-2xl shadow-black/40 ring-1 backdrop-blur-xl transition duration-500 group-hover:border-slate-700",
          theme.ring
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", theme.gradient)} />

        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/80 p-4 md:h-24 md:w-24">
              <OptimizedImage
                src={item.thumbnail}
                alt=""
                width={96}
                height={96}
                sizes={SIZES.thumbnail}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white md:text-sm">
                  {company}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    theme.accent,
                    "border-current/25 bg-black/40"
                  )}
                >
                  <FaBriefcase className="h-3 w-3" />
                  {theme.label}
                </span>
                {item.period && (
                  <span className="text-xs font-medium text-slate-500">{item.period}</span>
                )}
                {item.location && (
                  <span className="text-xs text-slate-600">· {item.location}</span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
                {role}
              </h2>

              <div className="mt-6 space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-sm leading-[1.75] text-slate-300 md:text-base">
                    {para}
                  </p>
                ))}
              </div>

              {(item.responsibilities?.length ?? 0) > 0 && (
                <div className="mt-8 rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 md:p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
                    <FaCheckCircle className={cn("h-4 w-4", theme.accent)} />
                    What I did
                  </h3>
                  <ul className="space-y-3">
                    {item.responsibilities!.map((line) => (
                      <li key={line} className="flex gap-3 text-sm text-slate-400 md:text-[0.95rem]">
                        <span
                          className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", theme.dot)}
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(item.technologies?.length ?? 0) > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    <FaCode className="h-3.5 w-3.5" />
                    Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies!.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(item.outcomes?.length ?? 0) > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.outcomes!.map((outcome) => (
                    <div
                      key={outcome}
                      className="interactive-card border-purple/20 bg-purple/5 p-4 text-sm leading-relaxed text-slate-300"
                    >
                      {outcome}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
