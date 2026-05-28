import { Project } from "@/lib/types";

/** Default featured order when `featured` flag is not set in CMS */
export const DEFAULT_FEATURED_IDS = [7, 6, 1, 8, 9];

export function getFullProjects(projects: Project[]): Project[] {
  return projects.filter((p) => !p.compact);
}

export function getCompactProjects(projects: Project[]): Project[] {
  return projects.filter((p) => p.compact);
}

export function getFeaturedProjects(projects: Project[], limit = 5): Project[] {
  const flagged = projects.filter((p) => p.featured && !p.compact);
  if (flagged.length >= 1) {
    const ordered = DEFAULT_FEATURED_IDS.map((id) => flagged.find((p) => p.id === id)).filter(
      (p): p is Project => Boolean(p)
    );
    const rest = flagged.filter((p) => !DEFAULT_FEATURED_IDS.includes(p.id));
    return [...ordered, ...rest].slice(0, limit);
  }
  const picked = DEFAULT_FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );
  return (picked.length ? picked : projects).slice(0, limit);
}

/** One-line impact for cards (homepage / listing) */
export function getProjectHighlight(project: Project): string {
  if (project.outcomes?.[0]) return project.outcomes[0];
  if (project.challenge) return project.challenge;
  return project.des;
}

export function hasProjectLinks(project: Project): boolean {
  return Boolean(project.liveDemoUrl?.trim() || project.githubUrl?.trim());
}
