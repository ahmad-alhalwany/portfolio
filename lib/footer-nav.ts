import { RESUME_PATH } from "@/lib/resume";
import { Locale } from "@/lib/locale";
import { t, UiKey } from "@/lib/ui-translations";

export type FooterNavLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

const FOOTER_KEYS: { key: UiKey; href: string; download?: boolean }[] = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.experience", href: "#work" },
  { key: "nav.education", href: "#education" },
  { key: "nav.blog", href: "#blog" },
  { key: "nav.contact", href: "#contact" },
  { key: "nav.cv", href: RESUME_PATH, download: true },
];

export function getFooterNavLinks(locale: Locale): FooterNavLink[] {
  return FOOTER_KEYS.map(({ key, href, download }) => ({
    label: t(locale, key),
    href,
    download,
  }));
}
