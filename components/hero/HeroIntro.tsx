"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaLocationArrow } from "react-icons/fa";
import { HeroSection } from "@/lib/types";
import { FlipWords } from "@/components/ui/flip-words";
import MagicButtons from "@/components/ui/Magic-buttons";
import { cn } from "@/lib/utils";
import { getHeroChipClass } from "@/lib/hero-chip-styles";
import { useLocale } from "@/components/i18n/LocaleProvider";

const DEFAULT_FLIP = [
  "production web apps",
  "full-stack systems",
  "hire-ready products",
];

const DEFAULT_CHIPS = ["Python", "Next.js", "TypeScript", "Django"];

type Props = {
  hero: HeroSection;
  className?: string;
};

export function HeroIntro({ hero, className }: Props) {
  const reduceMotion = useReducedMotion();
  const flipWords =
    hero.flipWords && hero.flipWords.length > 0 ? hero.flipWords : DEFAULT_FLIP;
  const chips = hero.skillChips && hero.skillChips.length > 0 ? hero.skillChips : DEFAULT_CHIPS;
  const useFlip = Boolean(hero.headlineLead && hero.headlineEnd);
  const { t } = useLocale();

  const enter = reduceMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : undefined;

  return (
    <motion.div
      className={cn(
        "flex max-w-[89vw] flex-col items-center lg:max-w-[52vw] lg:items-start",
        className
      )}
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      animate={enter ?? { opacity: 1, x: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7 }}
    >
      {hero.availabilityBadge ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300 sm:text-xs">
            {hero.availabilityBadge}
          </span>
        </motion.div>
      ) : null}

      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-violet-600/80 dark:text-cyan-400/70 sm:text-xs">
        {hero.subtitle}
      </p>

      <h1 className="text-center text-4xl font-bold leading-[1.08] tracking-tight text-page-fg sm:text-5xl md:text-6xl lg:text-left lg:text-[3.25rem] lg:leading-[1.05] xl:text-7xl dark:text-white">
        {useFlip ? (
          <>
            <span className="block">{hero.headlineLead}</span>
            <span className="mt-1 block w-full">
              <FlipWords
                words={flipWords}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl"
              />
            </span>
            <span className="mt-1 block text-page-muted dark:text-slate-200">{hero.headlineEnd}</span>
          </>
        ) : (
          <LegacyTitle title={hero.title} />
        )}
      </h1>

      <motion.p
        className="mt-5 max-w-xl text-center text-sm leading-relaxed text-page-muted md:text-lg lg:text-left lg:text-xl dark:text-slate-300"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.6 }}
      >
        {hero.description}
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.45 }}
      >
        {chips.map((chip, i) => (
          <motion.span
            key={chip}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.45 + i * 0.06 }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-wide shadow-sm backdrop-blur-sm sm:text-xs",
              getHeroChipClass(chip)
            )}
          >
            {chip}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.55 }}
      >
        <Link href={hero.ctaLink}>
          <MagicButtons
            title={hero.ctaLabel}
            postion="right"
            icon={<FaLocationArrow />}
          />
        </Link>
        {hero.secondaryCtaLabel && hero.secondaryCtaLink ? (
          <Link
            href={hero.secondaryCtaLink}
            className="group inline-flex items-center gap-2 rounded-xl border border-page bg-page-card-solid px-5 py-3 text-sm font-medium text-page-fg shadow-sm transition hover:border-purple/50 hover:bg-purple/5 dark:border-slate-600 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:text-white"
          >
            {hero.secondaryCtaLabel}
            <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </motion.div>

      {reduceMotion ? (
        <p className="mt-6 hidden font-mono text-[10px] text-page-muted lg:block">{t("hero.dossierHint")}</p>
      ) : (
        <motion.p
          className="mt-6 hidden font-mono text-[10px] text-page-muted lg:block"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {t("hero.dossierHint")}
        </motion.p>
      )}
    </motion.div>
  );
}

function LegacyTitle({ title }: { title: string }) {
  const words = title.split(" ");
  return (
    <>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className={idx > 3 ? "text-purple" : "text-page-fg dark:text-white"}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
}
