"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaGraduationCap } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import { EducationItem, EducationKind } from "@/lib/types";
import { SparklesCore } from "@/components/ui/sparkles";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";
import { resolveInstitutionBrand } from "@/lib/institution-brand";
import { InstitutionBrandMark } from "./InstitutionBrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { UiKey } from "@/lib/ui-translations";

const KIND_PILL: Record<EducationKind, string> = {
  degree: "border-cyan-500/35 bg-cyan-500/10 text-cyan-300",
  bootcamp: "border-amber-500/35 bg-amber-500/10 text-amber-300",
  certificate: "border-purple/35 bg-purple/10 text-purple",
};

function kindLabel(kind: EducationKind, t: (key: UiKey) => string) {
  const key: UiKey =
    kind === "degree"
      ? "education.kind.degree"
      : kind === "bootcamp"
        ? "education.kind.bootcamp"
        : "education.kind.certificate";
  return t(key);
}

function inferKind(item: EducationItem): EducationKind {
  if (item.kind) return item.kind;
  const t = item.title.toLowerCase();
  if (t.includes("bootcamp")) return "bootcamp";
  if (item.institution && !t.includes("engineer")) return "certificate";
  return "degree";
}

type Props = {
  items: EducationItem[];
  variant?: "home" | "page";
};

function ProviderChip({ item }: { item: EducationItem }) {
  const brand = resolveInstitutionBrand(item.institution);
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <InstitutionBrandMark brand={brand} size="sm" className="rounded-full" />
      <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-white md:text-sm">
        {brand.displayName}
      </span>
    </div>
  );
}

function EducationEntry({
  item,
  index,
  fullPage,
  t,
}: {
  item: EducationItem;
  index: number;
  fullPage: boolean;
  t: (key: UiKey) => string;
}) {
  const kind = inferKind(item);
  const cover = item.coverImage || item.thumbnail;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.35) }}
      className={cn("relative", fullPage ? "mb-14 md:mb-20" : "")}
    >
      <ProviderChip item={item} />

      <p className="mb-5 text-lg font-semibold leading-snug text-white md:text-xl lg:text-2xl">
        {item.title}
      </p>

      {!fullPage && (
        <span
          className={cn(
            "mb-4 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest",
            KIND_PILL[kind]
          )}
        >
          {kindLabel(kind, t)}
        </span>
      )}

      {cover && fullPage && (
        <div className="relative mb-8 w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950">
          <div className="relative aspect-[2/1] w-full max-h-[60vh] md:aspect-[21/9]">
            <OptimizedImage
              src={cover}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-300 md:text-base">
        {(item.timeline?.length ?? 0) > 0 &&
          item.timeline!.map((line) => (
            <p key={line}>{line}</p>
          ))}

        {item.desc ? <p>{item.desc}</p> : null}

        {(item.projects?.length ?? 0) > 0 && (
          <div>
            <p className="mb-3 font-semibold text-white">Projects:</p>
            <ul className="space-y-3 pl-1">
              {item.projects!.map((project) => (
                <li key={project} className="flex gap-3 text-slate-400">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(item.highlights?.length ?? 0) > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1">
            {item.highlights!.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}

export function EducationSection({ items, variant = "home" }: Props) {
  const { t } = useLocale();
  const isPage = variant === "page";
  const displayItems = isPage
    ? items
    : items.filter((item) => item.featured).length > 0
      ? items.filter((item) => item.featured)
      : items.slice(0, 1);

  if (displayItems.length === 0) return null;

  return (
    <section
      id="education"
      className={cn("relative overflow-hidden py-20", isPage && "pb-12 pt-4")}
    >
      {!isPage && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent md:w-72" />
          <SparklesCore
            id="education-sparkles-home"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={30}
            className="h-full w-full"
            particleColor="#E4ECFF"
          />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 mx-auto px-2 sm:px-4",
          isPage ? "max-w-4xl" : "max-w-5xl"
        )}
      >
        <ScrollReveal className={cn("text-center", !isPage && "mb-10")} variant="fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-purple">
            <FaGraduationCap className="h-3.5 w-3.5" />
            {isPage ? t("education.badgePage") : t("education.badgeHome")}
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("education.titleLead")}
            <span className="text-purple"> {t("education.titleAccent")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            {isPage ? t("education.subtitlePage") : t("education.subtitleHome")}
          </p>
        </ScrollReveal>

        <div className={cn("relative", isPage ? "mt-12 md:mt-16" : "mt-8")}>
          {isPage && (
            <>
              <div
                className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple/40 to-transparent md:left-[27px]"
                aria-hidden
              />
              <svg
                viewBox="0 0 20 800"
                preserveAspectRatio="none"
                className="pointer-events-none absolute bottom-0 left-3 hidden h-full w-5 opacity-30 md:block"
                aria-hidden
              >
                <path
                  d="M 1 0 V 800"
                  fill="none"
                  stroke="url(#edu-gradient)"
                  strokeWidth="1.25"
                />
                <defs>
                  <linearGradient id="edu-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#18CCFC" stopOpacity="0" />
                    <stop stopColor="#18CCFC" />
                    <stop offset="0.4" stopColor="#6344F5" />
                    <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </>
          )}

          <div className={cn(isPage && "pl-10 md:pl-16")}>
            {displayItems.map((item, index) => (
              <div key={item.id} className={cn(isPage && "relative")}>
                {isPage && (
                  <div className="absolute -left-[1.6rem] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 bg-slate-950 md:-left-[2.35rem]">
                    <div className="h-2 w-2 rounded-full border border-neutral-400 bg-white" />
                  </div>
                )}
                <EducationEntry item={item} index={index} fullPage={isPage} t={t} />
              </div>
            ))}
          </div>
        </div>

        {!isPage && items.length > displayItems.length && (
          <ScrollReveal className="mt-10 flex flex-col items-center gap-3" variant="fadeUp" delay={0.1}>
            <p className="text-sm text-slate-500">
              {t("education.moreCerts").replace("{n}", String(items.length - displayItems.length))}
            </p>
            <Link
              href="/education"
              className="btn-press group inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:bg-cyan-500/15"
            >
              <BiBookAlt className="h-4 w-4 text-cyan-300" />
              {t("education.viewAll")}
              <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
