"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaCertificate,
  FaGraduationCap,
  FaLayerGroup,
  FaUniversity,
} from "react-icons/fa";
import { EducationItem, EducationKind } from "@/lib/types";
import { SparklesCore } from "@/components/ui/sparkles";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { EducationCredentialCard } from "./EducationCredentialCard";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getFullEducationItems } from "@/lib/certificates-catalog";

type Filter = "all" | EducationKind;

function inferKind(item: EducationItem): EducationKind {
  if (item.kind) return item.kind;
  const t = item.title.toLowerCase();
  if (t.includes("bootcamp")) return "bootcamp";
  if (item.institution && !t.includes("engineer")) return "certificate";
  return "degree";
}

export function EducationPageView() {
  const { content, t } = useLocale();
  const items = getFullEducationItems(content?.education);
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c = { all: items.length, degree: 0, certificate: 0, bootcamp: 0 };
    items.forEach((item) => {
      const k = inferKind(item);
      c[k]++;
    });
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => inferKind(item) === filter);
  }, [items, filter]);

  const filters = useMemo(() => {
    const defs: Array<{
      id: Filter;
      label: string;
      icon: React.ReactNode;
      count: number;
    }> = [
      { id: "all", label: t("education.page.filter.all"), icon: <FaLayerGroup />, count: counts.all },
      { id: "degree", label: t("education.page.filter.degrees"), icon: <FaUniversity />, count: counts.degree },
      {
        id: "certificate",
        label: t("education.page.filter.certificates"),
        icon: <FaCertificate />,
        count: counts.certificate,
      },
      { id: "bootcamp", label: t("education.page.filter.bootcamps"), icon: <FaGraduationCap />, count: counts.bootcamp },
    ];
    return defs.filter((f) => f.id === "all" || f.count > 0);
  }, [counts, t]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-page">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(34,211,238,0.08),transparent)]" />
        <ShootingStars
          minSpeed={8}
          maxSpeed={18}
          starColor="#c4b5fd"
          trailColor="#8b5cf6"
          className="opacity-30"
        />
      </div>

      {/* Hero */}
      <header className="relative z-10 overflow-hidden pb-8 pt-24 sm:pt-28">
        <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden">
          <SparklesCore
            id="edu-page-sparkles"
            background="transparent"
            minSize={0.5}
            maxSize={1.4}
            particleDensity={55}
            className="h-full w-full"
            particleColor="#E8ECFF"
          />
          <motion.div
            initial={{ opacity: 0, width: "10rem" }}
            animate={{ opacity: 1, width: "32rem" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-1/2 top-8 -translate-x-1/2"
          >
            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ boxShadow: "0 0 48px 12px rgba(34,211,238,0.4)" }}
            />
            <div className="mx-auto mt-4 h-32 w-full max-w-lg bg-gradient-to-b from-cyan-500/30 via-purple/15 to-transparent blur-3xl" />
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Link
            href="/#education"
            className="btn-press mb-10 inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm transition hover:border-purple/40 hover:text-white"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            {t("education.page.back")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple/35 bg-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-purple">
              <FaGraduationCap className="h-3.5 w-3.5" />
              {t("education.page.badge")}
            </span>
            <h1 className="mt-6 bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("education.page.titleLead")}
              <br />
              <span className="from-purple via-cyan-300 to-purple bg-gradient-to-r bg-clip-text">
                {t("education.page.titleAccent")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              {t("education.page.subtitle")}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4"
          >
            {[
              { label: t("education.page.stat.credentials"), value: counts.all },
              { label: t("education.page.stat.degrees"), value: counts.degree },
              { label: t("education.page.stat.certificates"), value: counts.certificate + counts.bootcamp },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-5 text-center backdrop-blur-md"
              >
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Filters + timeline */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <div className="sticky top-20 z-20 mb-12 flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-800/60 bg-slate-950/80 p-2 backdrop-blur-xl sm:gap-3">
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
              <span className="opacity-80">{f.icon}</span>
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

        {/* Vertical timeline rail */}
        <div className="relative">
          <div
            className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-cyan-500/60 via-purple/50 to-transparent md:block"
            aria-hidden
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-16 md:space-y-20 md:pl-12"
            >
              {filtered.map((item, index) => {
                const prev = filtered[index - 1];
                const showCategory =
                  item.category &&
                  item.kind === "certificate" &&
                  item.category !== prev?.category;
                return (
                  <div key={item.id} className="relative">
                    {showCategory && (
                      <p className="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/90 md:pl-0">
                        {item.category}
                      </p>
                    )}
                    <div
                      className="absolute -left-0 top-10 hidden h-4 w-4 -translate-x-[2.35rem] items-center justify-center rounded-full border-2 border-purple/50 bg-slate-950 md:flex"
                      aria-hidden
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    </div>
                    <EducationCredentialCard item={item} index={index} />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-slate-500">No items in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
