"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { UiKey } from "@/lib/ui-translations";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

export function LocalizedSkeleton({ uiKey }: { uiKey: UiKey }) {
  const { t } = useLocale();
  return <SectionSkeleton label={t(uiKey)} />;
}
