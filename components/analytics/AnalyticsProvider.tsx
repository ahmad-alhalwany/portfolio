"use client";

import { Suspense } from "react";
import { SiteAnalytics } from "./SiteAnalytics";

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <SiteAnalytics />
    </Suspense>
  );
}
