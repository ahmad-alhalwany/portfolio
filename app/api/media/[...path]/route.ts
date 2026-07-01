import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { resolveUploadFile } from "@/lib/server-storage";

export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const resolved = await resolveUploadFile(params.path ?? []);
  if (!resolved) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const buffer = await fs.readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const etag = `"${Buffer.from(resolved).toString("hex")}-${buffer.length}"`;

    if (request.headers.get("if-none-match") === etag) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag } });
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
        "Content-Length": String(buffer.length),
        ETag: etag,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
