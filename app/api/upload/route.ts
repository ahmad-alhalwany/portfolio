import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { enforceRateLimit } from "@/lib/security-server";
import { runtimeUploadsRoot } from "@/lib/server-storage";
import { normalizeUploadUrl, sanitizeUploadFileName } from "@/lib/upload-url";

export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_RESUME_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/x-pdf",
  "application/octet-stream",
  "",
]);

function isPdfFile(file: File): boolean {
  if (ALLOWED_RESUME_TYPES.has(file.type)) {
    return file.name.toLowerCase().endsWith(".pdf");
  }
  return file.name.toLowerCase().endsWith(".pdf");
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder")?.toString().replace(/[^a-zA-Z0-9_-]/g, "") || "uploads";
    const replaceFile = formData.get("replace")?.toString();

    if (folder !== "reviews") {
      const admin = await isAdminRequest(request);
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Review avatars are rate-limited on POST /api/reviews — avoid double limit with project uploads
    if (folder !== "reviews") {
      const rate = await enforceRateLimit(request, "upload");
      if (!rate.ok) {
        return NextResponse.json(
          { error: rate.message, retryAfterSec: rate.retryAfterSec },
          { status: 429 }
        );
      }
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isResumeUpload = folder === "resume";

    if (isResumeUpload) {
      if (file.size > MAX_RESUME_BYTES) {
        return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
      }
      if (!isPdfFile(file)) {
        return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
      }
    } else {
      if (file.size > MAX_IMAGE_BYTES) {
        return NextResponse.json({ error: "File too large (max 2MB)" }, { status: 400 });
      }
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
      }
    }

    let targetDir: string;
    let publicUrlPrefix: string;

    // Always write uploads to the runtime uploads root (served via /api/media/).
    // Writing to public/resume/ would 404 under `next start` because the static
    // manifest is generated at build time and doesn't pick up new files.
    targetDir = path.join(runtimeUploadsRoot(), folder);
    publicUrlPrefix = `/uploads/${folder}/`;

    await fs.mkdir(targetDir, { recursive: true });

    let fileName: string;
    if (replaceFile) {
      fileName = sanitizeUploadFileName(replaceFile);
    } else {
      const originalName = sanitizeUploadFileName(file.name);
      const timestamp = Date.now();
      fileName = `${timestamp}-${originalName}`;
    }

    const filePath = path.join(targetDir, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const url = normalizeUploadUrl(`${publicUrlPrefix}${fileName}`);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
