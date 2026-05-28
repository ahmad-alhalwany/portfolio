import { NextResponse } from "next/server";
import { isNewsletterAvailable, usesButtondown } from "@/lib/newsletter-server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    enabled: isNewsletterAvailable(),
    provider: usesButtondown() ? "buttondown" : "local",
  });
}
