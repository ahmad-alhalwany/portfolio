import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { runtimeUploadsRoot } from "@/lib/server-storage";

const PROJECTS_FOLDER = "projects";
const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

export async function GET() {
  try {
    const uploadsPath = path.join(runtimeUploadsRoot(), PROJECTS_FOLDER);

    try {
      await fs.access(uploadsPath);
    } catch {
      return NextResponse.json([]);
    }

    const files = await fs.readdir(uploadsPath);
    const imageFiles = files.filter((file) => IMAGE_EXT_REGEX.test(file));

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(uploadsPath, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          url: `/uploads/${PROJECTS_FOLDER}/${file}`,
          size: stats.size,
          modified: stats.mtime.toISOString(),
        };
      })
    );

    return NextResponse.json(images, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Error fetching uploaded images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
