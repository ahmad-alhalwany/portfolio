import fs from "fs/promises";
import path from "path";

const storePath = path.join(process.cwd(), "data", "rate-limits.json");

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Record<string, RateLimitEntry>;

export type RateLimitConfig = {
  /** Unique action key, e.g. `login:192.168.1.1` */
  key: string;
  limit: number;
  windowMs: number;
};

async function readStore(): Promise<RateLimitStore> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as RateLimitStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeStore(store: RateLimitStore): Promise<void> {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

function prune(store: RateLimitStore): RateLimitStore {
  const now = Date.now();
  const next: RateLimitStore = {};
  for (const [key, entry] of Object.entries(store)) {
    if (entry.resetAt > now) next[key] = entry;
  }
  return next;
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export async function checkRateLimit(config: RateLimitConfig): Promise<RateLimitResult> {
  const now = Date.now();
  let store = prune(await readStore());
  const existing = store[config.key];

  if (!existing || existing.resetAt <= now) {
    store[config.key] = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    await writeStore(store);
    return {
      success: true,
      remaining: config.limit - 1,
      resetAt: store[config.key].resetAt,
    };
  }

  if (existing.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  store[config.key] = existing;
  await writeStore(store);

  return {
    success: true,
    remaining: config.limit - existing.count,
    resetAt: existing.resetAt,
  };
}
