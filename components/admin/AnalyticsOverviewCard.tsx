"use client";

import { useEffect, useState } from "react";

type Props = {
  onOpen: () => void;
};

export function AnalyticsOverviewCard({ onOpen }: Props) {
  const [viewsToday, setViewsToday] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/analytics?range=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.viewsToday != null) setViewsToday(data.viewsToday);
      })
      .catch(() => {});
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="rounded-3xl border border-purple/30 bg-gradient-to-br from-purple/10 to-slate-950 p-5 text-left transition hover:border-purple/60"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Visits today</p>
      <p className="mt-4 text-3xl font-semibold text-white">
        {viewsToday === null ? "—" : viewsToday.toLocaleString()}
      </p>
      <p className="mt-2 text-xs text-purple">Open analytics dashboard →</p>
    </button>
  );
}
