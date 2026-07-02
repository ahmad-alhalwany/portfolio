"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Content } from "@/lib/types";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  Locale,
  normalizeLocale,
} from "@/lib/locale";
import { t as translateUi, UiKey } from "@/lib/ui-translations";
import { readContentCache, writeContentCache } from "@/lib/content-client-cache";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: Content | null;
  loading: boolean;
  t: (key: UiKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type Props = {
  children: React.ReactNode;
  initialContent?: Content | null;
  initialLocale?: Locale;
};

export function LocaleProvider({
  children,
  initialContent = null,
  initialLocale = DEFAULT_LOCALE,
}: Props) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [content, setContent] = useState<Content | null>(initialContent);
  const [loading, setLoading] = useState(!initialContent);

  const loadContent = useCallback(async (next: Locale, opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    try {
      const res = await fetch(`/api/content?locale=${next}`, { cache: "no-store" });
      const data = (await res.json()) as Content;
      setContent(data);
      writeContentCache(next, data);
    } catch {
      if (!initialContent) setContent(null);
    } finally {
      setLoading(false);
    }
  }, [initialContent]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      const preferred = normalizeLocale(stored);
      setLocaleState(preferred);

      if (preferred === initialLocale && initialContent) {
        writeContentCache(preferred, initialContent);
        setLoading(false);
        return;
      }

      const cached = readContentCache(preferred);
      if (cached) {
        setContent(cached);
        setLoading(false);
        void loadContent(preferred, { silent: true });
        return;
      }

      void loadContent(preferred);
    } catch {
      if (!initialContent) void loadContent(DEFAULT_LOCALE);
      else setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "de" ? "de" : "en";
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      void loadContent(next);
    },
    [loadContent]
  );

  const t = useCallback((key: UiKey) => translateUi(locale, key), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, content, loading, t }),
    [locale, setLocale, content, loading, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
