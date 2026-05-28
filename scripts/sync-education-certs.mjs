import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function main() {
  const mod = await import(
    new URL("../lib/certificates-catalog.ts", import.meta.url).href
  );
  const contentPath = path.join(root, "data", "content.json");
  const content = JSON.parse(readFileSync(contentPath, "utf8"));
  content.education = mod.getFullEducationItems(content.education);
  content.statsSection = mod.getCertificatesStatsSection();
  writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  const certs = content.education.filter((e) => e.kind === "certificate").length;
  const learning = content.statsSection.learningItems?.length ?? 0;
  console.log(
    `Education: 1 degree + ${certs} certificates. Stats: ${learning} learning items (in progress + preview).`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
