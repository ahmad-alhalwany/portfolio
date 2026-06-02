import { getLocalizedContent } from "./localized-content";
import { readJsonFile, writeJsonFile } from "./server-storage";
import { Content } from "./types";

const CONTENT_FILE = "content.json";

export async function getContent(): Promise<Content> {
  return readJsonFile<Content>(CONTENT_FILE, {} as Content);
}

export { getLocalizedContent };

export async function updateContent(newContent: Partial<Content>): Promise<Content> {
  const currentContent = await getContent();
  const mergedContent = {
    ...currentContent,
    ...newContent,
  };
  await writeJsonFile(CONTENT_FILE, mergedContent);
  return mergedContent;
}
