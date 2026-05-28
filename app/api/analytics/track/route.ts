import { NextRequest, NextResponse } from "next/server";
import { isBotUserAgent, recordPageView, shouldSkipAnalyticsPath } from "@/lib/analytics";
import { enforceRateLimit } from "@/lib/security-server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const rate = await enforceRateLimit(request, "analytics");
    if (!rate.ok) {
      return NextResponse.json({ recorded: false, skipped: true }, { status: 429 });
    }

    const body = await request.json();
    const path = body?.path?.toString() ?? "/";
    const referrer =
      body?.referrer?.toString() ||
      request.headers.get("referer") ||
      "";
    const sessionId = body?.sessionId?.toString() || "anonymous";

    if (shouldSkipAnalyticsPath(path)) {
      return NextResponse.json({ recorded: false, skipped: true });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    if (isBotUserAgent(userAgent)) {
      return NextResponse.json({ recorded: false, skipped: true });
    }

    const result = await recordPageView({
      path,
      referrer,
      sessionId,
      userAgent,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to record visit" }, { status: 500 });
  }
}
