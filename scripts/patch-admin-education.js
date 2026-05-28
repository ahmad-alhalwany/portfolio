const fs = require("fs");
const p = "app/admin/page.tsx";
let c = fs.readFileSync(p, "utf8");
if (c.includes("Year / period")) {
  console.log("already patched");
  process.exit(0);
}
const insert = `
                  <label className="space-y-2 text-sm">
                    Year / period
                    <input
                      value={item.year || ""}
                      onChange={(event) => updateEducationField(item.id, "year", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Institution
                    <input
                      value={item.institution || ""}
                      onChange={(event) => updateEducationField(item.id, "institution", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Type
                    <select
                      value={item.kind || "degree"}
                      onChange={(event) => updateEducationField(item.id, "kind", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    >
                      <option value="degree">Degree</option>
                      <option value="bootcamp">Bootcamp</option>
                      <option value="certificate">Certificate</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Highlights (one per line)
                    <textarea
                      value={(item.highlights || []).join("\\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "highlights",
                          event.target.value.split("\\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>`;
const marker = "updateEducationField(item.id, 'className', event.target.value)";
const idx = c.indexOf(marker);
if (idx < 0) {
  console.error("marker not found");
  process.exit(1);
}
const closeLabel = c.indexOf("                  </label>", idx);
const insertAt = closeLabel + "                  </label>".length;
c = c.slice(0, insertAt) + insert + c.slice(insertAt);
fs.writeFileSync(p, c);
console.log("patched");
