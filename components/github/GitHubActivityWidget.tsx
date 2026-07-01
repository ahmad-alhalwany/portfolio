"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch, FaStar, FaCircle } from "react-icons/fa";

type Repo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
};

type RecentEvent = {
  type: string;
  repo: string;
  url: string;
  createdAt: string;
  payload?: string;
};

const GITHUB_USER = "ahmad-alhalwany";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.floor(months / 12)}y`;
}

function eventLabel(type: string): string {
  switch (type) {
    case "PushEvent":
      return "pushed commits";
    case "PullRequestEvent":
      return "opened a PR";
    case "CreateEvent":
      return "created branch";
    case "IssueCommentEvent":
      return "commented";
    case "IssuesEvent":
      return "opened an issue";
    case "WatchEvent":
      return "starred";
    case "ForkEvent":
      return "forked";
    default:
      return type.replace("Event", "").toLowerCase();
  }
}

export function GitHubActivityWidget() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [events, setEvents] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=8`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=4`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);

        if (cancelled) return;

        if (eventsRes.ok) {
          const rawEvents = (await eventsRes.json()) as Array<{
            type: string;
            repo: { name: string };
            created_at: string;
            payload?: { commits?: Array<{ message: string }> };
          }>;
          const mapped: RecentEvent[] = rawEvents.slice(0, 6).map((e) => ({
            type: e.type,
            repo: e.repo.name,
            url: `https://github.com/${e.repo.name}`,
            createdAt: e.created_at,
            payload: e.payload?.commits?.[0]?.message?.split("\n")[0],
          }));
          if (!cancelled) setEvents(mapped);
        }

        if (reposRes.ok) {
          const rawRepos = (await reposRes.json()) as Array<{
            name: string;
            description: string | null;
            html_url: string;
            stargazers_count: number;
            language: string | null;
            pushed_at: string;
            fork: boolean;
          }>;
          const mapped: Repo[] = rawRepos
            .filter((r) => !r.fork)
            .slice(0, 3)
            .map((r) => ({
              name: r.name,
              description: r.description,
              url: r.html_url,
              stars: r.stargazers_count,
              language: r.language,
              pushedAt: r.pushed_at,
            }));
          if (!cancelled) setRepos(mapped);
        }
      } catch {
        // Silent — widget is decorative.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
        <div className="flex items-center gap-2 text-purple">
          <FaGithub className="h-4 w-4" />
          <span className="text-sm font-semibold">GitHub activity</span>
        </div>
        <div className="mt-4 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0 && repos.length === 0) return null;

  return (
    <section
      id="github-activity"
      className="mt-16 scroll-mt-24 rounded-3xl border border-white/10 bg-slate-950/40 p-6 md:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-purple">
          <FaGithub className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-white">Live GitHub activity</h2>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 transition hover:text-purple hover:underline"
        >
          @{GITHUB_USER} →
        </a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Recent activity
          </p>
          <ul className="space-y-2.5">
            {events.length === 0 ? (
              <li className="text-sm text-slate-500">No public events in the last 90 days.</li>
            ) : (
              events.map((e, i) => (
                <li
                  key={`${e.repo}-${e.createdAt}-${i}`}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
                  <FaCircle className="mt-1.5 h-1.5 w-1.5 shrink-0 text-emerald-400/70" />
                  <span className="min-w-0 flex-1">
                    <span className="text-slate-400">{eventLabel(e.type)}</span>{" "}
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple hover:underline"
                    >
                      {e.repo.replace(`${GITHUB_USER}/`, "")}
                    </a>
                    {e.payload ? (
                      <span className="block truncate text-xs text-slate-500">↳ {e.payload}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-xs text-slate-600">
                    {timeAgo(e.createdAt)} ago
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Active repos
          </p>
          <ul className="space-y-2.5">
            {repos.map((r) => (
              <li
                key={r.name}
                className="rounded-xl border border-white/5 bg-black/30 p-3 transition hover:border-purple/30"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <FaCodeBranch className="h-3 w-3 text-slate-400" />
                      {r.name}
                    </div>
                    {r.description ? (
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{r.description}</p>
                    ) : null}
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                      {r.language ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-purple/60" />
                          {r.language}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1">
                        <FaStar className="h-2.5 w-2.5" />
                        {r.stars}
                      </span>
                      <span>· pushed {timeAgo(r.pushedAt)} ago</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
