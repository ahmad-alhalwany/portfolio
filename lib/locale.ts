export type Locale = "en" | "de";

export const LOCALES: Locale[] = ["en", "de"];
export const LOCALE_STORAGE_KEY = "ahmad-portfolio-locale";
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "de";
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
