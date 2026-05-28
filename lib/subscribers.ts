import { readJsonFile, writeJsonFile } from "./server-storage";

export type Subscriber = {
  email: string;
  subscribedAt: string;
  source: "portfolio" | "blog";
};

const FILE = "subscribers.json";

async function readAll(): Promise<Subscriber[]> {
  const data = await readJsonFile<Subscriber[] | { subscribers?: Subscriber[] }>(
    FILE,
    []
  );
  if (Array.isArray(data)) return data;
  return Array.isArray(data.subscribers) ? data.subscribers : [];
}

async function writeAll(list: Subscriber[]): Promise<void> {
  await writeJsonFile(FILE, list);
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

  await writeAll(list);
  return "created";
}
