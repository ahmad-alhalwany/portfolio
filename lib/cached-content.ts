import { unstable_cache } from "next/cache";
import { getLocalizedContent } from "@/lib/localized-content";
import { Locale } from "@/lib/locale";

export function getCachedLocalizedContent(locale: Locale) {
  return unstable_cache(
    () => getLocalizedContent(locale),
    [`localized-content`, locale],
    { revalidate: 60, tags: ["site-content"] }
  )();
}
