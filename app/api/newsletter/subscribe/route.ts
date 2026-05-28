import { NextRequest, NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/security-server";
import { subscribeEmail } from "@/lib/newsletter-server";
import {
  normalizeNewsletterInput,
  validateNewsletterEmail,
} from "@/lib/security-shared";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const guard = await guardPublicForm(request, body, "newsletter");
    if (!guard.ok) {
      return NextResponse.json({ error: guard.message }, { status: guard.status });
    }

    const { email } = normalizeNewsletterInput(body);
    const errors = validateNewsletterEmail(email);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const source =
      body.source === "blog" ? ("blog" as const) : ("portfolio" as const);
    const result = await subscribeEmail(email, source);

    if (result.outcome === "exists") {
      return NextResponse.json({
        success: true,
        message: "You are already on the list.",
      });
    }

    const message =
      result.channel === "buttondown"
        ? "Thanks — you're subscribed. New articles will land in your inbox when they publish."
        : "Thanks — you're on the list. I'll email you when new articles go live.";

    return NextResponse.json({ success: true, message });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not subscribe right now. Please try again later.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
