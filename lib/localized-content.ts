import { getContent } from "@/lib/content";
import { CONTENT_DE_OVERRIDES } from "@/lib/content-de-overrides";
import { mergeContent } from "@/lib/merge-content";
import { Locale, normalizeLocale } from "@/lib/locale";
import { Content } from "@/lib/types";

function applyGermanLocale(base: Content): Content {
  const { localeDe, ...publicBase } = base;
  let merged = mergeContent(publicBase as Content, CONTENT_DE_OVERRIDES);
  if (localeDe && Object.keys(localeDe).length > 0) {
    merged = mergeContent(merged, localeDe);
  }
  return merged;
}

export async function getLocalizedContent(localeInput?: string | null): Promise<Content> {
  const locale = normalizeLocale(localeInput);
  const base = await getContent();
  if (locale === "de") {
    return applyGermanLocale(base);
  }
  const { localeDe: _omit, ...publicBase } = base;
  return publicBase as Content;
}

export function localizeContent(base: Content, locale: Locale): Content {
  if (locale === "de") {
    return applyGermanLocale(base);
  }
  const { localeDe: _omit, ...publicBase } = base;
  return publicBase as Content;
}
