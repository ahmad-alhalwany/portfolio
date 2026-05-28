import fs from "fs/promises";
import path from "path";
import { getLocalizedContent } from "./localized-content";
import { Content } from "./types";

const contentPath = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<Content> {
  const file = await fs.readFile(contentPath, "utf8");
  return JSON.parse(file) as Content;
}

export { getLocalizedContent };

export async function updateContent(newContent: Partial<Content>): Promise<Content> {
  const currentContent = await getContent();
  const mergedContent = {
    ...currentContent,
    ...newContent,
  };
  await fs.writeFile(contentPath, JSON.stringify(mergedContent, null, 2), "utf8");
  return mergedContent;
}
