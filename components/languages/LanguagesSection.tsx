"use client";

import { motion } from "framer-motion";
import { FaBookReader, FaGlobeAmericas } from "react-icons/fa";
import { LanguagesSection as LanguagesSectionType, SpokenLanguage } from "@/lib/types";
import { CEFR_STEPS, LEVEL_INDEX } from "@/lib/languages-utils";
import { cn } from "@/lib/utils";

const CARD_THEMES = [
  {
    ring: "ring-emerald-500/30",
    glow: "from-emerald-500/20 via-emerald-500/5",
    bar: "from-emerald-400 to-teal-500",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  {
    ring: "ring-sky-500/30",
    glow: "from-sky-500/20 via-sky-500/5",
    bar: "from-sky-400 to-indigo-500",
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  },
  {
    ring: "ring-amber-500/30",
    glow: "from-amber-500/20 via-amber-500/5",
    bar: "from-amber-400 to-orange-500",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  {
    ring: "ring-violet-500/30",
    glow: "from-violet-500/20 via-violet-500/5",
    bar: "from-violet-400 to-purple",
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  },
] as const;

const ID_THEME: Record<string, number> = { ar: 0, en: 1, de: 2 };

function getTheme(lang: SpokenLanguage, index: number) {
  return CARD_THEMES[ID_THEME[lang.id] ?? index % CARD_THEMES.length];
}

function CefrScale({ lang }: { lang: SpokenLanguage }) {
  const activeIndex = LEVEL_INDEX[lang.level] ?? 0;
  const isNative = lang.level === "native";

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-[10px] font-medium uppercase tracking-wider text-slate-500">
        <span>CEFR</span>
        {isNative ? <span className="text-emerald-400/90">Native</span> : null}
      </div>
      <div className="flex gap-1">
        {CEFR_STEPS.map((step, i) => {
          const filled = isNative || i <= activeIndex;
          const current = !isNative && i === activeIndex;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "h-2 w-full rounded-sm transition-colors",
                  filled ? "bg-gradient-to-r from-purple/80 to-cyan-400/80" : "bg-slate-800",
                  current && "ring-1 ring-amber-400/60"
                )}
              />
              <span
                className={cn(
                  "text-[9px] tabular-nums",
                  filled ? "text-slate-300" : "text-slate-600",
                  current && "font-bold text-amber-300"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LanguageCard({ lang, index }: { lang: SpokenLanguage; index: number }) {
  const theme = getTheme(lang, index);
  const showProgress = lang.level !== "native" && (lang.progress ?? 0) > 0;
  const isRtl = lang.id === "ar" || /[\u0600-\u06FF]/.test(lang.nativeLabel ?? "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 120 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/50 p-6 backdrop-blur-md transition duration-300 hover:border-white/10 hover:shadow-[0_16px_48px_-20px_rgba(139,92,246,0.35)]",
        theme.ring,
        "ring-1"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition group-hover:opacity-100",
          theme.glow
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 text-2xl shadow-inner">
              {lang.flag ?? "🌐"}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">{lang.name}</h3>
              {lang.nativeLabel && lang.nativeLabel !== lang.name ? (
                <p className="text-sm text-slate-400" dir={isRtl ? "rtl" : "ltr"}>
                  {lang.nativeLabel}
                </p>
              ) : null}
            </div>
          </div>
          {lang.learning ? (
            <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
              <FaBookReader className="h-3 w-3" aria-hidden />
              Learning
            </span>
          ) : null}
        </div>

        <p className={cn("mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold", theme.badge)}>
          {lang.levelLabel}
        </p>

        <CefrScale lang={lang} />

        {showProgress ? (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
              <span>{lang.progressLabel ?? "Proficiency"}</span>
              <span className="tabular-nums text-slate-400">{lang.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={cn("h-full rounded-full bg-gradient-to-r", theme.bar)}
              />
            </div>
          </div>
        ) : null}

        {lang.note ? (
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{lang.note}</p>
        ) : null}
      </div>
    </motion.article>
  );
}

export function LanguagesSection({ section }: { section: LanguagesSectionType }) {
  if (!section.languages?.length) return null;

  return (
    <section
      id="languages"
      className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-slate-950/80 p-6 shadow-[0_0_60px_-20px_rgba(34,211,238,0.2)] backdrop-blur-sm lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(34,211,238,0.1),transparent)]" />
      </div>

      <div className="relative z-10 mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
          <FaGlobeAmericas className="h-3.5 w-3.5" aria-hidden />
          Languages
        </span>
        <h2 className="mt-5 bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {section.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {section.description}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 grid gap-5",
          section.languages.length === 1 && "md:max-w-md md:mx-auto",
          section.languages.length === 2 && "md:grid-cols-2",
          section.languages.length >= 3 && "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {section.languages.map((lang, index) => (
          <LanguageCard key={lang.id} lang={lang} index={index} />
        ))}
      </div>
    </section>
  );
}
