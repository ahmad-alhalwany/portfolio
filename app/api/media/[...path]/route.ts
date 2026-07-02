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
    // ETag includes byte length so replacing a file (even at the same path/name)
    // produces a new tag and busts stale browser copies.
    const etag = `"${Buffer.from(resolved).toString("hex")}-${buffer.length}"`;

    if (request.headers.get("if-none-match") === etag) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag } });
    }

    // PDFs (CV) must always revalidate so a re-upload shows immediately.
    // Images are content-addressed (timestamped names) so they can cache long.
    const cacheControl =
      ext === ".pdf"
        ? "public, max-age=0, must-revalidate"
        : "public, max-age=604800, stale-while-revalidate=86400";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": cacheControl,
        "Content-Length": String(buffer.length),
        ETag: etag,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
