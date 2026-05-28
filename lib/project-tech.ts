export type TechItem = {
  icon: string;
  name: string;
};

const ICON_LABELS: Record<string, string> = {
  "/next.svg": "Next.js",
  "/re.svg": "React",
  "/tail.svg": "Tailwind CSS",
  "/ts.svg": "TypeScript",
  "/three.svg": "Three.js",
  "/mongodb.svg": "MongoDB",
  "/s.svg": "SQL",
  "/c.svg": "C++",
  "/fm.svg": "Framer Motion",
  "/framer-motion.svg": "Framer Motion",
  "/git.svg": "Git",
  "/host.svg": "Hosting",
  "/cloud.svg": "Cloud",
  "/dockerName.svg": "Docker",
  "/WD.png": "Web Development",
  "/GQ.png": "GraphQL",
  "/js.png": "JavaScript",
  "/js.svg": "JavaScript",
  "/Axios.png": "Axios",
  "/expo.png": "Expo",
  "/django.png": "Django",
  "/python.png": "Python",
  "/python.svg": "Python",
};

function labelFromPath(icon: string): string {
  const known = ICON_LABELS[icon];
  if (known) return known;

  const file = icon.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Tech";
  return file
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function getProjectTechStack(iconLists: string[] = []): TechItem[] {
  const seen = new Set<string>();
  const items: TechItem[] = [];

  for (const icon of iconLists) {
    if (!icon || seen.has(icon)) continue;
    seen.add(icon);
    items.push({ icon, name: labelFromPath(icon) });
  }

  return items;
}
