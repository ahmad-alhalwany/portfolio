import {
  type AnalyticsDashboard,
  type AnalyticsEvent,
  type AnalyticsRange,
  isBotUserAgent,
  normalizeTrafficSource,
  shouldSkipAnalyticsPath,
} from "./analytics-shared";
import { readJsonFile, writeJsonFile } from "./server-storage";

export type {
  AnalyticsDashboard,
  AnalyticsEvent,
  AnalyticsRange,
} from "./analytics-shared";

export { isBotUserAgent, normalizeTrafficSource, shouldSkipAnalyticsPath } from "./analytics-shared";

const ANALYTICS_FILE = "analytics.json";
const MAX_EVENTS = 5000;
const DEDUP_MS = 30_000;

type AnalyticsStore = {
  events: AnalyticsEvent[];
};

function rangeStart(range: AnalyticsRange): Date | null {
  const now = new Date();
  if (range === "7d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (range === "30d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  return null;
}

async function readStore(): Promise<AnalyticsStore> {
  const parsed = await readJsonFile<AnalyticsStore>(ANALYTICS_FILE, { events: [] });
  return { events: Array.isArray(parsed.events) ? parsed.events : [] };
}

async function writeStore(store: AnalyticsStore): Promise<void> {
  await writeJsonFile(ANALYTICS_FILE, store);
}

function siteHostFromEnv(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export async function recordPageView(input: {
  path: string;
  referrer: string;
  sessionId: string;
  userAgent?: string;
}): Promise<{ recorded: boolean }> {
  if (input.userAgent && isBotUserAgent(input.userAgent)) {
    return { recorded: false };
  }

  const pathValue = input.path.split("?")[0].slice(0, 512) || "/";
  if (shouldSkipAnalyticsPath(pathValue)) {
    return { recorded: false };
  }

  const source = normalizeTrafficSource(input.referrer, siteHostFromEnv());
  if (source === "localhost" || source === "127.0.0.1" || source === "[::1]") {
    return { recorded: false };
  }

  const sessionId = input.sessionId.slice(0, 64) || "anonymous";
  const store = await readStore();
  const now = Date.now();
  const last = store.events[store.events.length - 1];

  if (
    last &&
    last.sessionId === sessionId &&
    last.path === pathValue &&
    now - new Date(last.createdAt).getTime() < DEDUP_MS
  ) {
    return { recorded: false };
  }

  const event: AnalyticsEvent = {
    id: `evt-${now}-${Math.random().toString(36).slice(2, 9)}`,
    path: pathValue,
    referrer: input.referrer.slice(0, 2048),
    source,
    sessionId,
    createdAt: new Date(now).toISOString(),
  };

  store.events.push(event);
  if (store.events.length > MAX_EVENTS) {
    store.events = store.events.slice(-MAX_EVENTS);
  }

  await writeStore(store);
  return { recorded: true };
}

function filterByRange(events: AnalyticsEvent[], range: AnalyticsRange): AnalyticsEvent[] {
  const start = rangeStart(range);
  if (!start) return events;
  const t = start.getTime();
  return events.filter((e) => new Date(e.createdAt).getTime() >= t);
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export async function getAnalyticsDashboard(
  range: AnalyticsRange = "30d"
): Promise<AnalyticsDashboard> {
  const store = await readStore();
  const all = store.events;
  const filtered = filterByRange(all, range);

  const now = new Date();
  const todayStart = startOfDay(now).getTime();
  const d7 = new Date(now);
  d7.setDate(d7.getDate() - 6);
  d7.setHours(0, 0, 0, 0);
  const d30 = new Date(now);
  d30.setDate(d30.getDate() - 29);
  d30.setHours(0, 0, 0, 0);

  const viewsToday = all.filter((e) => new Date(e.createdAt).getTime() >= todayStart).length;
  const views7d = all.filter((e) => new Date(e.createdAt).getTime() >= d7.getTime()).length;
  const views30d = all.filter((e) => new Date(e.createdAt).getTime() >= d30.getTime()).length;

  const sessions = new Set(filtered.map((e) => e.sessionId));
  const total = filtered.length;

  const pageMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();

  for (const e of filtered) {
    pageMap.set(e.path, (pageMap.get(e.path) ?? 0) + 1);
    sourceMap.set(e.source, (sourceMap.get(e.source) ?? 0) + 1);
  }

  const topPages = Array.from(pageMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([pathKey, views]) => ({
      path: pathKey,
      views,
      share: total ? Math.round((views / total) * 100) : 0,
    }));

  const topSources = Array.from(sourceMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, views]) => ({
      source,
      views,
      share: total ? Math.round((views / total) * 100) : 0,
    }));

  const days = range === "7d" ? 7 : 14;
  const dailyViews: AnalyticsDashboard["dailyViews"] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(day.getDate() - i);
    const start = startOfDay(day).getTime();
    const end = start + 86400000;
    const views = filtered.filter((e) => {
      const t = new Date(e.createdAt).getTime();
      return t >= start && t < end;
    }).length;
    dailyViews.push({
      date: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views,
    });
  }

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;

  return {
    range,
    totalPageViews: total,
    uniqueVisitors: sessions.size,
    viewsToday,
    views7d,
    views30d,
    topPages,
    topSources,
    dailyViews,
    recentEvents: [...filtered].reverse().slice(0, 12),
    gaConfigured: Boolean(gaId),
    gaMeasurementId: gaId,
  };
}

export async function clearAnalyticsData(): Promise<void> {
  await writeStore({ events: [] });
}
