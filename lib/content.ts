import { getLocalizedContent } from "./localized-content";
import { readBundledJsonFile, readJsonFile, writeJsonFile } from "./server-storage";
import { Content, Project } from "./types";

const CONTENT_FILE = "content.json";

/** Union-merge projects: git-bundled entries ship on deploy; Redis/admin edits overlay by id. */
function unionMergeProjects(bundled: Project[] = [], stored: Project[] = []): Project[] {
  const bundledById = new Map(bundled.map((p) => [p.id, p]));
  const storedById = new Map(stored.map((p) => [p.id, p]));

  const order: number[] = bundled.map((p) => p.id);
  for (const p of stored) {
    if (!order.includes(p.id)) order.push(p.id);
  }

  return order
    .map((id) => {
      const base = bundledById.get(id);
      const over = storedById.get(id);
      if (base && over) return { ...base, ...over };
      return over ?? base;
    })
    .filter((p): p is Project => Boolean(p));
}

async function readBundledContent(): Promise<Content> {
  return readBundledJsonFile<Content>(CONTENT_FILE, {} as Content);
}

/**
 * CMS content: Redis/runtime edits win on conflicts, but git-bundled projects
 * are always merged in so new deploys (e.g. project #9) appear even when Redis is stale.
 */
export async function getContent(): Promise<Content> {
  const [bundled, stored] = await Promise.all([
    readBundledContent(),
    readJsonFile<Content>(CONTENT_FILE, {} as Content),
  ]);

  if (!stored || Object.keys(stored).length === 0) {
    return bundled;
  }
  if (!bundled || Object.keys(bundled).length === 0) {
    return stored;
  }

  return {
    ...bundled,
    ...stored,
    projects: unionMergeProjects(bundled.projects, stored.projects),
    localeDe: { ...(bundled.localeDe ?? {}), ...(stored.localeDe ?? {}) },
  };
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
