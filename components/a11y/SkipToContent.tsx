"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export function SkipToContent() {
  const { locale } = useLocale();
  const label = locale === "de" ? "Zum Hauptinhalt springen" : "Skip to main content";

  return (
    <a
      href="#main-content"
      className="focus-ring fixed left-4 top-4 z-[10000] -translate-y-[220%] rounded-xl bg-purple px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
    >
      {label}
    </a>
  );
}
