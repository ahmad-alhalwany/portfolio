"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function LanguageToggle({ className }: Props) {
  const { locale, setLocale, t } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn("h-11 w-[4.5rem] shrink-0 rounded-full border border-page bg-page-card/60", className)}
        aria-hidden
      />
    );
  }

  const select = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div
      className={cn(
        "relative flex h-11 shrink-0 items-center rounded-full border border-page bg-page-card p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
        className={cn(
          "absolute top-1 h-9 w-[calc(50%-4px)] rounded-full bg-gradient-to-br shadow-sm",
          locale === "de"
            ? "left-[calc(50%+2px)] from-violet-600/90 to-purple/80"
            : "left-1 from-slate-200 to-slate-100 dark:from-slate-600 dark:to-slate-500"
        )}
      />
      {(["en", "de"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          aria-label={code === "en" ? t("lang.switchToEn") : t("lang.switchToDe")}
          title={code === "en" ? t("lang.switchToEn") : t("lang.switchToDe")}
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors btn-press focus-ring",
            locale === code ? "text-page-fg dark:text-white" : "text-page-muted"
          )}
        >
          {t(code === "en" ? "lang.en" : "lang.de")}
        </button>
      ))}
    </div>
  );
}
