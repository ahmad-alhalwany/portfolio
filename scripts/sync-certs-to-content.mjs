import { readFileSync, writeFileSync } from "fs";
import { pathToFileURL } from "url";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function main() {
  const mod = await import(
    pathToFileURL(path.join(root, "lib", "certificates-catalog.ts")).href
  );
  const contentPath = path.join(root, "data", "content.json");
  const content = JSON.parse(readFileSync(contentPath, "utf8"));
  content.statsSection = mod.getCertificatesStatsSection();
  writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  console.log(`Synced ${content.statsSection.learningItems.length} certificates to data/content.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
