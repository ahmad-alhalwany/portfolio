import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadsPath = path.join(process.cwd(), "public", "uploads", "projects");

    // Check if directory exists
    try {
      await fs.access(uploadsPath);
    } catch {
      // Directory doesn't exist, return empty array
      return NextResponse.json([]);
    }

    const files = await fs.readdir(uploadsPath);

    // Filter for image files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // Get file stats for each image
    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(uploadsPath, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          url: `/uploads/projects/${file}`,
          size: stats.size,
          modified: stats.mtime.toISOString(),
        };
      })
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching uploaded images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}