import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/security-server";
import { runtimeUploadsRoot } from "@/lib/server-storage";
import { normalizeUploadUrl, sanitizeUploadFileName } from "@/lib/upload-url";

export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const ALLOWED_RESUME_TYPES = new Set(["application/pdf"]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder")?.toString().replace(/[^a-zA-Z0-9_-]/g, "") || "uploads";
    const replaceFile = formData.get("replace")?.toString();

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
        return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
      }
      if (!ALLOWED_RESUME_TYPES.has(file.type)) {
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

    const uploadsPath = path.join(runtimeUploadsRoot(), folder);
    await fs.mkdir(uploadsPath, { recursive: true });

    let fileName: string;
    if (replaceFile) {
      fileName = sanitizeUploadFileName(replaceFile);
    } else {
      const originalName = sanitizeUploadFileName(file.name);
      const timestamp = Date.now();
      fileName = `${timestamp}-${originalName}`;
    }

    const filePath = path.join(uploadsPath, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const url = normalizeUploadUrl(`/uploads/${folder}/${fileName}`);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
