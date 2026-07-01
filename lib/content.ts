import { getLocalizedContent } from "./localized-content";
import { readJsonFile, writeJsonFile } from "./server-storage";
import { Content } from "./types";

const CONTENT_FILE = "content.json";

export async function getContent(): Promise<Content> {
  return readJsonFile<Content>(CONTENT_FILE, {} as Content);
}

export { getLocalizedContent };

/**
 * Save admin edits. Preserves `localeDe` overrides when the payload omits them
 * (prevents accidental data loss when the admin form hasn't loaded DE overrides).
 */
export async function updateContent(newContent: Partial<Content>): Promise<Content> {
  const currentContent = await getContent();
  const mergedContent: Content = {
    ...currentContent,
    ...newContent,
    localeDe:
      newContent.localeDe && Object.keys(newContent.localeDe).length > 0
        ? { ...currentContent.localeDe, ...newContent.localeDe }
        : currentContent.localeDe,
  };
  await writeJsonFile(CONTENT_FILE, mergedContent);
  return mergedContent;
}
