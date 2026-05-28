import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { updateContent } from "@/lib/content";
import { getLocalizedContent } from "@/lib/localized-content";
import { normalizeLocale } from "@/lib/locale";

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

export async function POST(request: Request) {
  const body = await request.json();

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updatedContent = await updateContent(body as Partial<import("@/lib/types").Content>);
  revalidateTag("site-content");
  return NextResponse.json(updatedContent);
}
