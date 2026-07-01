import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAdminRequest } from "@/lib/admin-auth";
import { runtimeUploadsRoot } from "@/lib/server-storage";

const PROJECTS_FOLDER = "projects";

function resolveProjectFilePath(imageName: string): string | null {
  if (!imageName || imageName.includes("/") || imageName.includes("\\")) return null;
  if (imageName === "." || imageName === "..") return null;
  const root = path.join(runtimeUploadsRoot(), PROJECTS_FOLDER);
  const filePath = path.join(root, imageName);
  const resolved = path.resolve(filePath);
  const rootResolved = path.resolve(root);
  if (!resolved.startsWith(rootResolved + path.sep)) return null;
  return resolved;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const admin = await isAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = resolveProjectFilePath(params.name);
    if (!filePath) {
      return NextResponse.json({ error: "Invalid image name" }, { status: 400 });
    }

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
