"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBlog,
  FaChartBar,
  FaCog,
  FaGraduationCap,
  FaHome,
  FaImages,
  FaLanguage,
  FaLayerGroup,
  FaProjectDiagram,
  FaStar,
  FaThLarge,
  FaTools,
  FaUser,
  FaBriefcase,
  FaRoute,
  FaEnvelope,
  FaComment,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AdminButton, AdminBadge } from "./admin-ui";

export type AdminNavItem = {
  id: string;
  label: string;
  group: "main" | "content" | "media" | "system";
};

const ICONS: Record<string, React.ReactNode> = {
  overview: <FaThLarge className="text-sm" />,
  hero: <FaHome className="text-sm" />,
  about: <FaUser className="text-sm" />,
  grid: <FaLayerGroup className="text-sm" />,
  work: <FaBriefcase className="text-sm" />,
  projects: <FaProjectDiagram className="text-sm" />,
  skills: <FaTools className="text-sm" />,
  services: <FaCog className="text-sm" />,
  education: <FaGraduationCap className="text-sm" />,
  approach: <FaRoute className="text-sm" />,
  reviews: <FaStar className="text-sm" />,
  blog: <FaBlog className="text-sm" />,
  comments: <FaComment className="text-sm" />,
  stats: <FaChartBar className="text-sm" />,
  contact: <FaEnvelope className="text-sm" />,
  images: <FaImages className="text-sm" />,
  analytics: <FaChartBar className="text-sm" />,
  locale: <FaLanguage className="text-sm" />,
};

const GROUP_LABELS: Record<AdminNavItem["group"], string> = {
  main: "Dashboard",
  content: "Site content",
  media: "Media",
  system: "System",
};

type Props = {
  activeSection: string;
  onSectionChange: (id: string) => void;
  navItems: AdminNavItem[];
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
  savedMessage: string;
  errorMessage: string;
  onLogout: () => void;
};

export function AdminShell({
  activeSection,
  onSectionChange,
  navItems,
  children,
  onSave,
  saving,
  savedMessage,
  errorMessage,
  onLogout,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const groups = (["main", "content", "media", "system"] as const).map((group) => ({
    group,
    items: navItems.filter((item) => item.group === group),
  }));

  const activeLabel = navItems.find((n) => n.id === activeSection)?.label ?? "Admin";

  const navButton = (item: AdminNavItem) => (
    <button
      key={item.id}
      type="button"
      onClick={() => {
        onSectionChange(item.id);
        setSidebarOpen(false);
      }}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
        activeSection === item.id
          ? "bg-purple/15 text-purple shadow-inner shadow-purple/5"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          activeSection === item.id ? "bg-purple/20 text-purple" : "bg-white/5 text-slate-400"
        }`}
      >
        {ICONS[item.id] ?? <FaCog className="text-sm" />}
      </span>
      {item.label}
    </button>
  );

  return (
    <div className="admin-root min-h-screen bg-[#06060b] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.06] bg-black/40 backdrop-blur-xl lg:flex">
          <div className="border-b border-white/[0.06] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">Portfolio CMS</p>
            <h1 className="mt-1 text-lg font-bold text-white">Admin</h1>
            <p className="mt-1 text-xs text-slate-500">Control the full site from one panel</p>
          </div>
          <nav className="flex-1 space-y-6 overflow-y-auto p-4">
            {groups.map(
              ({ group, items }) =>
                items.length > 0 && (
                  <div key={group}>
                    <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                      {GROUP_LABELS[group]}
                    </p>
                    <div className="space-y-0.5">{items.map(navButton)}</div>
                  </div>
                )
            )}
          </nav>
          <div className="space-y-2 border-t border-white/[0.06] p-4">
            <Link
              href="/"
              target="_blank"
              className="flex w-full items-center justify-center rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              View live site ↗
            </Link>
            <AdminButton variant="danger" className="w-full" onClick={onLogout}>
              Log out
            </AdminButton>
          </div>
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/[0.06] bg-[#0a0a12]">
              <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
                <span className="font-semibold">Menu</span>
                <button type="button" onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400">
                  <FaTimes />
                </button>
              </div>
              <nav className="flex-1 space-y-6 overflow-y-auto p-4">
                {groups.map(
                  ({ group, items }) =>
                    items.length > 0 && (
                      <div key={group}>
                        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                          {GROUP_LABELS[group]}
                        </p>
                        <div className="space-y-0.5">{items.map(navButton)}</div>
                      </div>
                    )
                )}
              </nav>
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#06060b]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  <FaBars />
                </button>
                <div>
                  <p className="text-xs text-slate-500 lg:hidden">Portfolio CMS</p>
                  <h2 className="text-lg font-semibold text-white">{activeLabel}</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {savedMessage && <AdminBadge tone="success">Saved</AdminBadge>}
                {errorMessage && <AdminBadge tone="warning">Error</AdminBadge>}
                <AdminButton variant="primary" onClick={onSave} disabled={saving} className="hidden sm:inline-flex">
                  {saving ? "Saving…" : "Save all"}
                </AdminButton>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>

          <footer className="sticky bottom-0 z-40 border-t border-white/[0.06] bg-[#06060b]/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">
                <p>
                  Changes are stored in <code className="text-slate-400">data/content.json</code> and related APIs.
                </p>
                {savedMessage && <p className="mt-1 text-emerald-400">{savedMessage}</p>}
                {errorMessage && <p className="mt-1 text-red-400">{errorMessage}</p>}
              </div>
              <AdminButton variant="primary" onClick={onSave} disabled={saving} className="w-full sm:w-auto">
                {saving ? "Saving…" : "Save all changes"}
              </AdminButton>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
