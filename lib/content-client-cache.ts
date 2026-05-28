import type { Content } from "@/lib/types";
import type { Locale } from "@/lib/locale";

const CACHE_PREFIX = "portfolio_content_v1";
const MAX_AGE_MS = 5 * 60 * 1000;

type CacheEntry = { data: Content; at: number };

export function readContentCache(locale: Locale): Content | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${CACHE_PREFIX}_${locale}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (Date.now() - parsed.at > MAX_AGE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeContentCache(locale: Locale, data: Content): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { data, at: Date.now() };
    sessionStorage.setItem(`${CACHE_PREFIX}_${locale}`, JSON.stringify(entry));
  } catch {
    /* quota / private mode */
  }
}
