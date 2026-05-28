"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  FaBars,
  FaBlog,
  FaBriefcase,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaFilePdf,
  FaGraduationCap,
  FaHome,
  FaProjectDiagram,
  FaQuoteLeft,
  FaTimes,
  FaTools,
  FaUser,
  FaRocket,
  FaRoute,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { SiteNavItem } from "@/lib/site-nav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<string, IconType> = {
  home: FaHome,
  about: FaUser,
  skills: FaTools,
  stats: FaChartLine,
  services: FaRocket,
  approach: FaRoute,
  projects: FaProjectDiagram,
  reviews: FaQuoteLeft,
  blog: FaBlog,
  education: FaGraduationCap,
  work: FaBriefcase,
  contact: FaEnvelope,
  cv: FaFilePdf,
};

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "stats",
  "services",
  "projects",
  "reviews",
  "blog",
  "education",
  "work",
  "approach",
  "contact",
] as const;

function hashToSectionId(link: string): string | null {
  if (!link.startsWith("#")) return null;
  const id = link.slice(1);
  return SECTION_IDS.includes(id as (typeof SECTION_IDS)[number]) ? id : null;
}

function NavLink({
  item,
  className,
  onNavigate,
  active,
}: {
  item: SiteNavItem;
  className?: string;
  onNavigate?: () => void;
  active?: boolean;
}) {
  const Icon = NAV_ICONS[item.id] ?? FaCode;
  const base = cn(
    "group relative inline-flex items-center justify-center transition-colors duration-300",
    active ? "text-purple" : "text-page-muted hover:text-page-fg",
    className
  );

  const content = (
    <>
      <span className="max-w-[5.5rem] truncate sm:max-w-none">{item.name}</span>
      {active && (
        <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-purple via-fuchsia-400 to-transparent" />
      )}
    </>
  );

  if (item.download) {
    return (
      <a href={item.link} download onClick={onNavigate} className={base}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.link} onClick={onNavigate} className={base}>
      {content}
    </Link>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute h-3 w-3 border-purple/50 text-[10px] leading-none text-purple/80",
        className
      )}
      aria-hidden
    >
      +
    </span>
  );
}

export function SiteNavbar({
  items,
  variant = "full",
}: {
  items: SiteNavItem[];
  variant?: "full" | "minimal";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (variant !== "full") return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.08, 0.2, 0.4] }
    );

    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, [variant]);

  const primaryItems = items.filter((i) => i.primary);
  const isFull = variant === "full";
  const { t } = useLocale();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[5000] transition-all duration-500",
          scrolled
            ? "border-b border-page bg-page-nav py-2.5 shadow-[0_8px_32px_-12px_var(--glow-purple)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href={isFull ? "#home" : items[0]?.link ?? "/"}
            aria-label={isFull ? "Ahmad.dev home" : "Back to home"}
            className="group flex shrink-0 items-center gap-2.5 focus-ring rounded-lg"
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-purple/30 bg-page-card-solid transition duration-300 group-hover:border-purple/60 group-hover:shadow-[0_0_24px_-6px_var(--glow-purple)]">
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(203,172,249,0.15),transparent_55%)]" />
              <FaCode className="relative h-4 w-4 text-purple" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xs font-bold tracking-tight text-page-fg sm:text-sm">
                Ahmad<span className="text-purple">.</span>dev
              </span>
              <span className="max-w-[5.5rem] truncate text-[8px] font-semibold uppercase tracking-[0.14em] text-page-muted sm:max-w-[7rem] sm:text-[9px] sm:tracking-[0.18em] xl:max-w-[9rem]">
                {isFull ? t("nav.hireReady") : t("nav.insights")}
              </span>
            </span>
          </Link>

          {isFull && (
            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-1 px-2 lg:flex xl:gap-2"
              aria-label="Primary navigation"
            >
              {primaryItems
                .filter((i) => !i.download && i.id !== "home")
                .map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    active={hashToSectionId(item.link) === activeId}
                    className="min-w-[4.25rem] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide xl:min-w-[5rem] xl:text-xs"
                  />
                ))}
            </nav>
          )}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {isFull && (
              <span className="hidden items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-2 py-1 xl:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="max-w-[5.5rem] truncate text-[10px] font-bold uppercase tracking-wide text-emerald-400/90 xl:max-w-none">
                  {t("nav.openToHire")}
                </span>
              </span>
            )}

            <LanguageToggle className="hidden shrink-0 md:flex" />

            {items.find((i) => i.download) && (
              <a
                href={items.find((i) => i.download)!.link}
                download
                className="hidden rounded-full border border-purple/40 bg-purple/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-purple transition hover:bg-purple/20 sm:inline-block btn-press"
              >
                {t("nav.cv")}
              </a>
            )}

            <ThemeToggle className="hidden shrink-0 lg:flex" />
            <ThemeToggle compact className="shrink-0 lg:hidden" />

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="site-nav-portal"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-page bg-page-card text-page-fg transition hover:border-purple/50 focus-ring btn-press sm:h-12 sm:w-auto sm:gap-2 sm:px-4"
            >
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-xl border border-dashed border-purple/30"
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {menuOpen ? (
                <FaTimes className="relative h-4 w-4 text-purple sm:mr-1" />
              ) : (
                <FaBars className="relative h-4 w-4 sm:mr-1" />
              )}
              <span className="relative hidden text-xs font-bold uppercase tracking-[0.2em] sm:inline">
                {menuOpen ? t("nav.close") : t("nav.navigate")}
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-nav-portal"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[4999] flex items-stretch justify-end"
          >
            <button
              type="button"
              className="absolute inset-0 bg-page-fg/40 backdrop-blur-md dark:bg-black/75"
              aria-label="Close menu"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ x: "100%", rotate: 2, opacity: 0.6 }}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              exit={{ x: "100%", rotate: -1, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative ml-auto mt-[4.5rem] flex h-[calc(100%-4.5rem)] w-full max-w-lg flex-col border-l border-purple/20 bg-page-nav shadow-[-24px_0_80px_-20px_var(--glow-purple)] backdrop-blur-xl sm:mt-[5rem] sm:h-[calc(100%-5rem)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                }}
              />

              <CornerMark className="left-4 top-4 border-l border-t pl-0.5 pt-0.5" />
              <CornerMark className="right-4 top-4 border-r border-t pr-0.5 pt-0.5" />
              <CornerMark className="bottom-4 left-4 border-b border-l pb-0.5 pl-0.5" />
              <CornerMark className="bottom-4 right-4 border-b border-r pb-0.5 pr-0.5" />

              <div className="relative flex flex-col gap-1 border-b border-page px-6 py-6 pt-6">
                <h2 className="text-2xl font-bold text-page-fg md:text-3xl">
                  {t("nav.portalTitle")}
                </h2>
                <p className="text-sm text-page-muted">
                  {isFull ? t("nav.portalSubtitle") : t("nav.portalSubtitleBlog")}
                </p>
              </div>

              <nav className="relative flex-1 overflow-y-auto px-4 py-6">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {items.map((item, index) => {
                    const Icon = NAV_ICONS[item.id] ?? FaCode;
                    const sectionId = hashToSectionId(item.link);
                    const isActive = sectionId !== null && sectionId === activeId;

                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 24, skewX: -4 }}
                        animate={{ opacity: 1, x: 0, skewX: 0 }}
                        transition={{ delay: 0.04 + index * 0.035 }}
                      >
                        {item.download ? (
                          <a
                            href={item.link}
                            download
                            onClick={closeMenu}
                            className={cn(
                              "nav-portal-card flex h-full min-h-[4.5rem] flex-col justify-between rounded-2xl border p-4 transition duration-300",
                              "border-purple/40 bg-purple/10 hover:border-purple hover:shadow-[0_0_28px_-8px_rgba(203,172,249,0.45)]"
                            )}
                          >
                            <Icon className="h-5 w-5 text-purple" />
                            <div>
                              <span className="text-lg font-bold text-page-fg">{item.name}</span>
                              <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-purple/80">
                                {t("nav.downloadPdf")}
                              </span>
                            </div>
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            onClick={closeMenu}
                            className={cn(
                              "nav-portal-card flex h-full min-h-[4.5rem] flex-col justify-between rounded-2xl border p-4 transition duration-300",
                              isActive
                                ? "border-purple/50 bg-purple/10 shadow-[0_0_24px_-10px_rgba(203,172,249,0.4)]"
                                : "border-page bg-page-card hover:border-purple/35 hover:bg-page-elevated"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-5 w-5 transition",
                                isActive ? "text-purple" : "text-slate-500 group-hover:text-purple"
                              )}
                            />
                            <div>
                              <span className="text-lg font-bold text-page-fg">{item.name}</span>
                              {isActive && (
                                <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-purple">
                                  {t("nav.youAreHere")}
                                </span>
                              )}
                            </div>
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="relative flex flex-col items-center gap-4 border-t border-page px-6 py-5">
                <div className="flex items-center gap-3">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-page-muted">
                  Ahmad Al-Halwany · Full-stack
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[4.5rem] shrink-0 sm:h-[5rem]" aria-hidden />
    </>
  );
}
