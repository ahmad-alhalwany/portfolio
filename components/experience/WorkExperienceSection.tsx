"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import { WorkExperience } from "@/lib/types";
import {
  getCompany,
  getFeaturedWork,
  getRole,
  inferEmploymentType,
} from "@/lib/work-experience-utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { UiKey } from "@/lib/ui-translations";

type Props = {
  items: WorkExperience[];
};

function workTypeLabel(type: ReturnType<typeof inferEmploymentType>, t: (key: UiKey) => string) {
  const key: UiKey =
    type === "full-time"
      ? "work.type.fulltime"
      : type === "internship"
        ? "work.type.internship"
        : type === "freelance"
          ? "work.type.freelance"
          : "work.type.contract";
  return t(key);
}

export function WorkExperienceSection({ items }: Props) {
  const { t } = useLocale();
  const featured = getFeaturedWork(items, 2);
  const total = items.length;

  if (total === 0) return null;

  return (
    <section className="py-20" id="work">
      <SectionHeading>
        {t("work.titleLead")} <span className="text-purple">{t("work.titleAccent")}</span>
      </SectionHeading>

      <ScrollReveal className="mx-auto mt-4 max-w-2xl text-center" variant="fadeUp">
        <p className="text-sm leading-relaxed text-slate-400 md:text-base">
          {t("work.subtitle")}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        {featured.map((item, index) => {
          const type = inferEmploymentType(item);
          return (
            <ScrollReveal key={item.id} variant="fadeUp" delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="interactive-card group h-full overflow-hidden bg-slate-950/80 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-2">
                    <OptimizedImage
                      src={item.thumbnail}
                      alt=""
                      width={56}
                      height={56}
                      sizes={SIZES.thumbnail}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-purple">
                      {getCompany(item)}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white group-hover:text-purple">
                      {getRole(item)}
                    </h3>
                    {item.period && (
                      <p className="mt-1 text-xs text-slate-500">{item.period}</p>
                    )}
                  </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {item.overview || item.desc}
                </p>
                <span
                  className={cn(
                    "mt-4 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    type === "internship"
                      ? "border-cyan-500/30 text-cyan-400"
                      : type === "freelance"
                        ? "border-amber-500/30 text-amber-400"
                        : "border-purple/30 text-purple"
                  )}
                >
                  {workTypeLabel(type, t)}
                </span>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>

      {total > featured.length && (
        <ScrollReveal className="mt-10 flex flex-col items-center gap-3" variant="fadeUp">
          <p className="text-sm text-slate-500">
            {t("work.moreRoles").replace("{n}", String(total - featured.length))}
          </p>
          <Link
            href="/experience"
            className="btn-press group inline-flex items-center gap-3 rounded-full border border-purple/40 bg-purple/10 px-7 py-3 text-sm font-semibold text-white transition hover:border-purple/60 hover:bg-purple/20"
          >
            <FaBriefcase className="h-4 w-4" />
            {t("work.viewTimeline")}
            <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </ScrollReveal>
      )}
    </section>
  );
}
