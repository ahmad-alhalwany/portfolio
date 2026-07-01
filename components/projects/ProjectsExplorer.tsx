"use client";

import { useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Project } from "@/lib/types";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

type Props = {
  projects: Project[];
};

function extractTags(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    for (const t of p.iconLists ?? []) {
      const trimmed = t.trim();
      if (trimmed) set.add(trimmed);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function ProjectsExplorer({ projects }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => extractTags(projects), [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.des ?? "").toLowerCase().includes(q) ||
        (p.iconLists ?? []).some((t: string) => t.toLowerCase().includes(q));

      const matchesTag = !activeTag || (p.iconLists ?? []).includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [projects, query, activeTag]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="relative max-w-md flex-1">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, or tech…"
            className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-slate-500 focus:border-purple/50 focus:outline-none focus:ring-1 focus:ring-purple/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          ) : null}
        </div>

        {allTags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                !activeTag
                  ? "bg-purple text-white"
                  : "border border-white/10 bg-black/30 text-slate-300 hover:border-purple/40 hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  activeTag === tag
                    ? "bg-purple text-white"
                    : "border border-white/10 bg-black/30 text-slate-300 hover:border-purple/40 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <ProjectsGrid projects={filtered} />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-12 text-center">
          <p className="text-slate-400">No projects match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs text-slate-300 transition hover:border-purple/40 hover:text-white"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
