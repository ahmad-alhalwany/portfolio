"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { shouldSkipAnalyticsPath } from "@/lib/analytics-shared";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

function getSessionId(): string {
  if (typeof window === "undefined") return "anonymous";
  const key = "portfolio_analytics_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = `s-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function sendGtagPageView(path: string) {
  if (!GA_ID || typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag("config", GA_ID, { page_path: path });
  }
}

function isAnalyticsConsentGiven(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("ahmad-portfolio-cookie-consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.choice === "all";
  } catch {
    return false;
  }
}

function trackPageView(path: string) {
  if (shouldSkipAnalyticsPath(path)) return;

  const sessionId = getSessionId();
  const referrer = document.referrer || "";

  if (isAnalyticsConsentGiven()) {
    sendGtagPageView(path);
  }

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, referrer, sessionId }),
    keepalive: true,
  }).catch(() => {});
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);
  const [consent, setConsent] = useState(false);

  // Listen for consent changes (cookie banner dispatches a custom event).
  useEffect(() => {
    setConsent(isAnalyticsConsentGiven());
    const handler = () => setConsent(isAnalyticsConsentGiven());
    window.addEventListener("cookie-consent-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cookie-consent-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  useEffect(() => {
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname || "/";
    const normalized = path.split("?")[0] || "/";

    if (lastPath.current === normalized) return;
    lastPath.current = normalized;

    trackPageView(normalized);
  }, [pathname, searchParams]);

  if (!GA_ID || !consent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
