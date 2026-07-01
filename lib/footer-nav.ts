import { getResumeDeUrl, getResumeEnUrl, resolveResumeUrl, type ResumeUrls } from "@/lib/resume";
import { Locale } from "@/lib/locale";
import { t, UiKey } from "@/lib/ui-translations";

export type FooterNavLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

const FOOTER_KEYS: {
  key: UiKey;
  href: string | ((resume: ResumeUrls) => string);
  download?: boolean;
}[] = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.experience", href: "#work" },
  { key: "nav.education", href: "#education" },
  { key: "nav.blog", href: "#blog" },
  { key: "nav.contact", href: "#contact" },
  {
    key: "nav.cvEn",
    href: (resume) => resolveResumeUrl(getResumeEnUrl(resume)),
    download: true,
  },
  {
    key: "nav.cvDe",
    href: (resume) => resolveResumeUrl(getResumeDeUrl(resume)),
    download: true,
  },
];

const LEGAL_LINKS: { labelEn: string; labelDe: string; href: string }[] = [
  { labelEn: "Impressum", labelDe: "Impressum", href: "/imprint" },
  { labelEn: "Privacy", labelDe: "Datenschutz", href: "/privacy" },
];

export function getFooterNavLinks(locale: Locale, resumeUrls: ResumeUrls = {}): FooterNavLink[] {
  return FOOTER_KEYS.map(({ key, href, download }) => ({
    label: t(locale, key),
    href: typeof href === "function" ? href(resumeUrls) : href,
    download,
  }));
}

export function getFooterLegalLinks(locale: Locale): FooterNavLink[] {
  return LEGAL_LINKS.map((l) => ({
    label: locale === "de" ? l.labelDe : l.labelEn,
    href: l.href,
  }));
}
