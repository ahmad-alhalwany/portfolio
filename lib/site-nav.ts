import { getResumeDeUrl, getResumeEnUrl, resolveResumeUrl, type ResumeUrls } from "@/lib/resume";
import { Locale } from "@/lib/locale";
import { t, UiKey } from "@/lib/ui-translations";

export type SiteNavItem = {
  name: string;
  link: string;
  /** Stable id for icons (from hash / path) */
  id: string;
  /** Shown in the compact top bar on large screens */
  primary?: boolean;
  download?: boolean;
};

function navIdFromLink(link: string, key: string): string {
  if (key.startsWith("nav.cv")) return key === "nav.cvDe" ? "cv-de" : "cv-en";
  if (link.startsWith("#")) return link.slice(1);
  if (link === "/") return "home";
  return "blog";
}

const NAV_KEYS: {
  key: UiKey;
  link: string | ((resume: ResumeUrls) => string);
  primary?: boolean;
  download?: boolean;
}[] = [
  { key: "nav.home", link: "#home", primary: true },
  { key: "nav.about", link: "#about" },
  { key: "nav.skills", link: "#skills" },
  { key: "nav.languages", link: "#languages" },
  { key: "nav.stats", link: "#stats" },
  { key: "nav.services", link: "#services" },
  { key: "nav.projects", link: "#projects", primary: true },
  { key: "nav.reviews", link: "#reviews" },
  { key: "nav.blog", link: "#blog", primary: true },
  { key: "nav.education", link: "#education" },
  { key: "nav.experience", link: "#work", primary: true },
  { key: "nav.approach", link: "#approach" },
  { key: "nav.contact", link: "#contact", primary: true },
  {
    key: "nav.cvEn",
    link: (resume) => resolveResumeUrl(getResumeEnUrl(resume)),
    download: true,
    primary: true,
  },
  {
    key: "nav.cvDe",
    link: (resume) => resolveResumeUrl(getResumeDeUrl(resume)),
    download: true,
  },
];

export function getSiteNavItems(locale: Locale, resumeUrls: ResumeUrls = {}): SiteNavItem[] {
  return NAV_KEYS.map(({ key, link, primary, download }) => {
    const resolvedLink = typeof link === "function" ? link(resumeUrls) : link;
    return {
      name: t(locale, key),
      link: resolvedLink,
      id: navIdFromLink(resolvedLink, key),
      primary,
      download,
    };
  });
}

export function getBlogNavItems(locale: Locale): SiteNavItem[] {
  return [
    {
      name: t(locale, "nav.portfolio"),
      link: "/",
      id: "home",
      primary: true,
    },
    {
      name: t(locale, "nav.blog"),
      link: "/blog",
      id: "blog",
      primary: true,
    },
  ];
}
