"use client";

import { useCallback, useEffect, useState } from "react";
import type { AnalyticsDashboard, AnalyticsRange } from "@/lib/analytics-shared";
import { getSiteUrl } from "@/lib/seo";

const RANGES: Array<{ id: AnalyticsRange; label: string }> = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "all", label: "All time" },
];

function formatPath(path: string): string {
  if (path === "/") return "Home";
  return path;
}

export function AnalyticsAdminSection() {
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [data, setData] = useState<AnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/analytics?range=${range}`);
      if (!res.ok) throw new Error("Failed to load analytics");
      const json = (await res.json()) as AnalyticsDashboard;
      setData(json);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  const clearData = async () => {
    if (!confirm("Delete all stored visit data? This cannot be undone.")) return;
    const res = await fetch("/api/analytics", { method: "DELETE" });
    if (res.ok) load();
  };

  const maxDaily = Math.max(...(data?.dailyViews.map((d) => d.views) ?? [1]), 1);
  const siteUrl = getSiteUrl();

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <div>
        <h2 className="text-2xl font-semibold text-white">Analytics Dashboard</h2>
        <p className="mt-2 text-slate-400">
          Page views, top pages, and traffic sources — plus optional Google Analytics 4.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex gap-2 rounded-full bg-slate-950 p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                range === r.id
                  ? "bg-purple text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-purple hover:text-white disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            type="button"
            onClick={clearData}
            className="rounded-full border border-red-500/50 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
          >
            Clear data
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {loading && !data ? (
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-3xl border border-slate-800 bg-slate-950"
            />
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Page views" value={data.totalPageViews} hint={`Range: ${range}`} accent />
            <KpiCard label="Unique visitors" value={data.uniqueVisitors} hint="By session" />
            <KpiCard label="Today" value={data.viewsToday} hint="All pages" />
            <KpiCard label="Last 7 days" value={data.views7d} hint="Rolling window" />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 lg:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                Visits over time
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Daily page views for the selected period
              </p>
              <div className="mt-6 flex h-48 items-end justify-between gap-1 md:gap-2">
                {data.dailyViews.map((day) => {
                  const barPx = Math.max(
                    Math.round((day.views / maxDaily) * 160),
                    day.views > 0 ? 8 : 4
                  );
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="relative w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple/30 via-purple to-cyan-400/80"
                        style={{ height: barPx }}
                        title={`${day.views} views`}
                      >
                        {day.views > 0 && (
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                            {day.views}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 md:text-[10px]">{day.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                Traffic sources
              </p>
              <p className="mt-1 text-sm text-slate-400">Where visitors come from</p>
              <ul className="mt-6 space-y-4">
                {data.topSources.length === 0 ? (
                  <li className="text-sm text-slate-500">
                    No data yet. Visit the site to collect stats.
                  </li>
                ) : (
                  data.topSources.map((row) => (
                    <li key={row.source}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-white">{row.source}</span>
                        <span className="text-slate-400">
                          {row.views} · {row.share}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple to-cyan-400"
                          style={{ width: `${row.share}%` }}
                        />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                Top pages
              </p>
              <p className="mt-1 text-sm text-slate-400">Most visited routes</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-3 pr-4 font-medium">Page</th>
                      <th className="pb-3 pr-4 font-medium">Views</th>
                      <th className="pb-3 font-medium">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-6 text-slate-500">
                          No page views recorded yet.
                        </td>
                      </tr>
                    ) : (
                      data.topPages.map((row) => (
                        <tr key={row.path} className="border-b border-slate-800/60">
                          <td className="py-3 pr-4 font-mono text-purple-200">
                            {formatPath(row.path)}
                            <span className="mt-0.5 block text-xs text-slate-500">{row.path}</span>
                          </td>
                          <td className="py-3 pr-4 text-white">{row.views}</td>
                          <td className="py-3 text-slate-400">{row.share}%</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                Recent visits
              </p>
              <ul className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
                {data.recentEvents.length === 0 ? (
                  <li className="text-sm text-slate-500">Waiting for first visit…</li>
                ) : (
                  data.recentEvents.map((evt) => (
                    <li
                      key={evt.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-purple-200">{evt.path}</span>
                        <span className="text-xs text-slate-500">
                          {new Date(evt.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-400">
                        Source: <span className="text-slate-200">{evt.source}</span>
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-6 ${
              data.gaConfigured
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-amber-500/30 bg-amber-500/5"
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">Google Analytics 4</p>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  {data.gaConfigured ? (
                    <>
                      Connected with measurement ID{" "}
                      <code className="rounded bg-slate-900 px-2 py-0.5 text-emerald-300">
                        {data.gaMeasurementId}
                      </code>
                      . Page views are sent to GA and stored locally in{" "}
                      <code className="text-slate-300">data/analytics.json</code>.
                    </>
                  ) : (
                    <>
                      Add{" "}
                      <code className="rounded bg-slate-900 px-2 py-0.5 text-amber-200">
                        NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
                      </code>{" "}
                      to <code className="text-slate-300">.env.local</code> and restart the dev
                      server.
                    </>
                  )}
                </p>
                <p className="mt-2 text-xs text-slate-500">Site URL for GA: {siteUrl}</p>
              </div>
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full bg-purple px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-purple/90"
              >
                Open GA Console
              </a>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        accent
          ? "border-purple/40 bg-gradient-to-br from-purple/10 to-slate-950"
          : "border-slate-800 bg-slate-950"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-white">{value.toLocaleString()}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
