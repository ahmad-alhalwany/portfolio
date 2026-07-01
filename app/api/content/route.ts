import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getContent } from "@/lib/content";
import { updateContent } from "@/lib/content";
import { getLocalizedContent } from "@/lib/localized-content";
import { normalizeLocale } from "@/lib/locale";
import type { Content } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = normalizeLocale(searchParams.get("locale"));

  // Admin dashboard needs the raw content (including localeDe overrides)
  // so the German (DE) section can load and edit saved values without data loss.
  const raw = searchParams.get("raw") === "true";
  if (raw) {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const content = await getContent();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const content = await getLocalizedContent(locale);
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updatedContent = await updateContent(body as Partial<Content>);
    revalidateTag("site-content");
    return NextResponse.json(updatedContent, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
