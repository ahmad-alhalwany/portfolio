import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { updateContent } from "@/lib/content";
import { getLocalizedContent } from "@/lib/localized-content";
import { normalizeLocale } from "@/lib/locale";
import type { Content } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = normalizeLocale(searchParams.get("locale"));
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
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
