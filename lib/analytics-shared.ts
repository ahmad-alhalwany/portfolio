/** Client-safe analytics helpers (no Node.js fs). */

export type AnalyticsEvent = {
  id: string;
  path: string;
  referrer: string;
  source: string;
  sessionId: string;
  createdAt: string;
};

export type AnalyticsRange = "7d" | "30d" | "all";

export type AnalyticsDashboard = {
  range: AnalyticsRange;
  totalPageViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  views7d: number;
  views30d: number;
  topPages: Array<{ path: string; views: number; share: number }>;
  topSources: Array<{ source: string; views: number; share: number }>;
  dailyViews: Array<{ date: string; label: string; views: number }>;
  recentEvents: AnalyticsEvent[];
  gaConfigured: boolean;
  gaMeasurementId: string | null;
};

export function shouldSkipAnalyticsPath(pathname: string): boolean {
  if (!pathname || !pathname.startsWith("/")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

export function normalizeTrafficSource(referrer: string, siteHost?: string): string {
  const trimmed = referrer.trim();
  if (!trimmed) return "Direct";

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (siteHost && host === siteHost.replace(/^www\./, "").toLowerCase()) {
      return "Direct";
    }

    if (host.includes("google.")) return "Google";
    if (host.includes("bing.")) return "Bing";
    if (host.includes("duckduckgo")) return "DuckDuckGo";
    if (host.includes("linkedin.")) return "LinkedIn";
    if (host.includes("github.")) return "GitHub";
    if (host.includes("facebook.") || host.includes("fb.")) return "Facebook";
    if (host === "t.co" || host.includes("twitter.") || host === "x.com") return "X (Twitter)";
    if (host.includes("instagram.")) return "Instagram";
    if (host.includes("vercel.app")) return "Vercel";

    return host;
  } catch {
    return "Direct";
  }
}

export function isBotUserAgent(userAgent: string): boolean {
  return /bot|crawler|spider|lighthouse|headless|preview|slurp|facebookexternalhit/i.test(
    userAgent
  );
}
