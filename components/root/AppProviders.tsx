"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/app/provider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SkipToContent } from "@/components/a11y/SkipToContent";
import type { Content } from "@/lib/types";

const MotionShell = dynamic(
  () => import("@/components/motion/MotionShell").then((m) => m.MotionShell),
  { ssr: false }
);

const AnalyticsProvider = dynamic(
  () =>
    import("@/components/analytics/AnalyticsProvider").then((m) => m.AnalyticsProvider),
  { ssr: false }
);

type Props = {
  children: React.ReactNode;
  initialContent: Content;
};

export function AppProviders({ children, initialContent }: Props) {
  return (
    <>
      <MotionShell />
      <AnalyticsProvider />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="ahmad-portfolio-theme"
      >
        <LocaleProvider initialContent={initialContent} initialLocale="en">
          <SkipToContent />
          {children}
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}
