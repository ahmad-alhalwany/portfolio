import fs from "fs/promises";
import path from "path";

export type Subscriber = {
  email: string;
  subscribedAt: string;
  source: "portfolio" | "blog";
};

const FILE = path.join(process.cwd(), "data", "subscribers.json");

async function readAll(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const data = JSON.parse(raw) as Subscriber[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function addSubscriber(
  email: string,
  source: Subscriber["source"] = "portfolio"
): Promise<"created" | "exists"> {
  const list = await readAll();
  if (list.some((s) => s.email === email)) return "exists";

  list.push({
    email,
    subscribedAt: new Date().toISOString(),
    source,
  });

  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
  return "created";
}
