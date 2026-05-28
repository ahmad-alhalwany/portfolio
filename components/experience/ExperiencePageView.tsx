"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaBriefcase,
  FaFilePdf,
  FaLayerGroup,
  FaRocket,
  FaUserTie,
} from "react-icons/fa";
import { EmploymentType, WorkExperience } from "@/lib/types";
import { inferEmploymentType } from "@/lib/work-experience-utils";
import { SparklesCore } from "@/components/ui/sparkles";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ExperienceRoleCard } from "./ExperienceRoleCard";
import { resolveResumeUrl } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { defaultWorkExperience } from "@/lib/work-defaults";

type Filter = "all" | EmploymentType;

export function ExperiencePageView() {
  const { content, t } = useLocale();
  const items =
    content?.workExperience?.length ? content.workExperience : defaultWorkExperience;
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c = { all: items.length, "full-time": 0, internship: 0, freelance: 0, contract: 0 };
    items.forEach((item) => {
      c[inferEmploymentType(item)]++;
    });
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => inferEmploymentType(item) === filter);
  }, [items, filter]);

  const filters = useMemo(() => {
    const defs: Array<{
      id: Filter;
      label: string;
      icon: React.ReactNode;
      count: number;
    }> = [
      { id: "all", label: t("experience.page.filter.all"), icon: <FaLayerGroup />, count: counts.all },
      { id: "full-time", label: t("experience.page.filter.fulltime"), icon: <FaUserTie />, count: counts["full-time"] },
      { id: "internship", label: t("experience.page.filter.internship"), icon: <FaRocket />, count: counts.internship },
      { id: "freelance", label: t("experience.page.filter.freelance"), icon: <FaBriefcase />, count: counts.freelance },
    ];
    return defs.filter((f) => f.id === "all" || f.count > 0);
  }, [counts, t]);

  const years = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.period) set.add(i.period.split("—")[0]?.trim() || i.period);
    });
    return set.size || items.length;
  }, [items]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-page">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-15%,rgba(203,172,249,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(251,191,36,0.06),transparent)]" />
        <ShootingStars
          minSpeed={8}
          maxSpeed={16}
          starColor="#e9d5ff"
          trailColor="#a78bfa"
          className="opacity-25"
        />
      </div>

      <header className="relative z-10 overflow-hidden pb-8 pt-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 h-[380px] overflow-hidden">
          <SparklesCore
            id="exp-page-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.3}
            particleDensity={45}
            className="h-full w-full"
            particleColor="#F0E8FF"
          />
          <div className="absolute left-1/2 top-10 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple to-transparent md:w-96" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Link
            href="/#work"
            className="btn-press mb-10 inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm transition hover:border-purple/40 hover:text-white"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            {t("experience.page.back")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple/35 bg-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-purple">
              <FaBriefcase className="h-3.5 w-3.5" />
              {t("experience.page.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t("experience.page.titleLead")}
              <span className="bg-gradient-to-r from-purple via-white to-cyan-300 bg-clip-text text-transparent">
                {" "}
                {t("experience.page.titleAccent")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              {t("experience.page.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="grid w-full grid-cols-3 gap-3 sm:max-w-lg">
              {[
                { label: t("experience.page.stat.roles"), value: counts.all },
                {
                  label: t("experience.page.stat.companies"),
                  value: new Set(items.map((i) => i.company).filter(Boolean)).size || counts.all,
                },
                { label: t("experience.page.stat.years"), value: years },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/70 py-4 text-center backdrop-blur-md"
                >
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center">
            <a
              href={resolveResumeUrl(content?.hero.resumeUrl ?? content?.contact.resumeUrl)}
              download
              className="btn-press inline-flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple/20"
            >
              <FaFilePdf className="h-4 w-4 text-purple" />
              {t("experience.page.downloadCv")}
            </a>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <div className="sticky top-20 z-20 mb-12 flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-800/60 bg-slate-950/85 p-2 backdrop-blur-xl">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "btn-press flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                filter === f.id
                  ? "bg-purple/20 text-white ring-1 ring-purple/50"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              {f.icon}
              {f.label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  filter === f.id ? "bg-purple/30 text-purple" : "bg-slate-800 text-slate-500"
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative md:pl-10">
          <div
            className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-purple/60 via-purple/30 to-transparent md:block"
            aria-hidden
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 md:space-y-20"
            >
              {filtered.map((item, index) => (
                <div key={item.id} className="relative">
                  <div
                    className="absolute -left-1 top-12 hidden h-3.5 w-3.5 rounded-full border-2 border-purple/50 bg-slate-950 md:block md:-translate-x-[2.6rem]"
                    aria-hidden
                  >
                    <div className="absolute inset-1 rounded-full bg-purple shadow-[0_0_8px_#c4b5fd]" />
                  </div>
                  <ExperienceRoleCard item={item} index={index} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
