import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  AnalyticsRange,
  clearAnalyticsData,
  getAnalyticsDashboard,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";

function parseRange(value: string | null): AnalyticsRange {
  if (value === "7d" || value === "30d" || value === "all") return value;
  return "30d";
}

export async function GET(request: NextRequest) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const range = parseRange(request.nextUrl.searchParams.get("range"));
  const dashboard = await getAnalyticsDashboard(range);
  return NextResponse.json(dashboard);
}

export async function DELETE(request: NextRequest) {
  const admin = await isAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clearAnalyticsData();
  return NextResponse.json({ success: true });
}
