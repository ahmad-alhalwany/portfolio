const fs = require("fs");
const p = "app/admin/page.tsx";
let c = fs.readFileSync(p, "utf8");
if (c.includes("Cover image")) {
  console.log("already has cover fields");
  process.exit(0);
}
const insert = `
                  <label className="space-y-2 text-sm">
                    Cover image
                    <input
                      value={item.coverImage || ""}
                      onChange={(event) => updateEducationField(item.id, "coverImage", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      placeholder="/education/example.jpeg"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Timeline lines (one per line)
                    <textarea
                      value={(item.timeline || []).join("\\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "timeline",
                          event.target.value.split("\\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Projects (one per line)
                    <textarea
                      value={(item.projects || []).join("\\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "projects",
                          event.target.value.split("\\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 lg:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(item.featured)}
                      onChange={(event) =>
                        updateEducationField(item.id, "featured", event.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-purple focus:ring-purple"
                    />
                    Show on homepage preview
                  </label>`;
const marker = "Highlights (one per line)";
const idx = c.indexOf(marker);
if (idx < 0) {
  console.error("marker not found");
  process.exit(1);
}
const insertAt = c.indexOf("                  </label>", idx);
const at2 = c.indexOf("                  </label>", insertAt + 10) + "                  </label>".length;
c = c.slice(0, at2) + insert + c.slice(at2);
fs.writeFileSync(p, c);
console.log("patched admin");
