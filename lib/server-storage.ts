import fs from "fs/promises";
import path from "path";

/** Vercel serverless uses a read-only project filesystem — persist runtime writes under /tmp. */
export const IS_VERCEL = process.env.VERCEL === "1";

export function bundledDataPath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

export function runtimeDataPath(filename: string): string {
  if (!IS_VERCEL) return bundledDataPath(filename);
  return path.join("/tmp", "protfolio-data", filename);
}

export function publicUploadsRoot(): string {
  return path.join(process.cwd(), "public", "uploads");
}

export function runtimeUploadsRoot(): string {
  if (!IS_VERCEL) return publicUploadsRoot();
  return path.join("/tmp", "protfolio-uploads");
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  const bundled = bundledDataPath(filename);
  const runtime = runtimeDataPath(filename);

  let base = fallback;
  try {
    const raw = await fs.readFile(bundled, "utf8");
    base = JSON.parse(raw) as T;
  } catch {
    /* bundled missing — use fallback */
  }

  if (runtime === bundled) {
    return base;
  }

  try {
    const raw = await fs.readFile(runtime, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return base;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const target = runtimeDataPath(filename);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, JSON.stringify(data, null, 2), "utf8");
}

export async function resolveUploadFile(segments: string[]): Promise<string | null> {
  if (segments.length === 0 || segments.some((s) => !s || s === "." || s === "..")) {
    return null;
  }

  const roots = IS_VERCEL
    ? [runtimeUploadsRoot(), publicUploadsRoot()]
    : [publicUploadsRoot()];

  for (const root of roots) {
    const filePath = path.join(root, ...segments);
    const resolved = path.resolve(filePath);
    const rootResolved = path.resolve(root);

    if (
      !resolved.startsWith(rootResolved + path.sep) &&
      resolved !== rootResolved
    ) {
      continue;
    }

    try {
      const stat = await fs.stat(resolved);
      if (stat.isFile()) return resolved;
    } catch {
      /* try next root */
    }
  }

  return null;
}
