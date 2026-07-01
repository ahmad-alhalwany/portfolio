import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { runtimeUploadsRoot } from "@/lib/server-storage";
import { normalizeUploadUrl } from "@/lib/upload-url";

export const dynamic = "force-dynamic";

function resolveResumeFilePath(url: string): string | null {
  const normalized = normalizeUploadUrl(url.trim());

  if (normalized.startsWith("/uploads/resume/")) {
    const rel = normalized.slice("/uploads/resume/".length);
    const segments = rel.split("/").filter(Boolean);
    if (segments.length === 0 || segments.some((s) => s === "." || s === "..")) {
      return null;
    }
    const filePath = path.join(runtimeUploadsRoot(), "resume", ...segments);
    const resolved = path.resolve(filePath);
    const root = path.resolve(path.join(runtimeUploadsRoot(), "resume"));
    if (!resolved.startsWith(root + path.sep)) return null;
    return resolved;
  }

  if (normalized.startsWith("/resume/")) {
    const rel = normalized.slice("/resume/".length);
    const segments = rel.split("/").filter(Boolean);
    if (segments.length === 0 || segments.some((s) => s === "." || s === "..")) {
      return null;
    }
    const filePath = path.join(process.cwd(), "public", "resume", ...segments);
    const resolved = path.resolve(filePath);
    const root = path.resolve(path.join(process.cwd(), "public", "resume"));
    if (!resolved.startsWith(root + path.sep)) return null;
    return resolved;
  }

  return null;
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const filePath = resolveResumeFilePath(url);
    if (!filePath) {
      return NextResponse.json({ error: "Invalid resume path" }, { status: 400 });
    }

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
