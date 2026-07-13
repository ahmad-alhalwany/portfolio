import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaBook, FaCode, FaLanguage, FaBriefcase } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Now / What I'm doing now",
  description:
    "What Ahmad Al-Halwany is doing right now — current focus, learning, building, reading, and job search status in Trier, Germany.",
  path: "/now",
});

const SECTIONS = [
  {
    icon: FaBriefcase,
    title: "Open to work",
    color: "text-emerald-400",
    items: [
      "Actively interviewing for AI Application Developer / ML engineer roles in Germany.",
      "Target stack: Python (FastAPI), ML/LLM/RAG, Next.js, PostgreSQL.",
      "Available for on-site (Trier / remote-friendly), hybrid, or fully remote roles.",
    ],
  },
  {
    icon: FaCode,
    title: "Building",
    color: "text-purple",
    items: [
      "Portfolio v3 — Next.js 14 App Router, ISR, Redis-backed CMS, AI chat assistant (/api/chat).",
      "Production hardening: GDPR compliance, multi-provider LLM fallback, dynamic OG, RSS feed.",
    ],
  },
  {
    icon: FaLanguage,
    title: "Learning",
    color: "text-cyan-400",
    items: [
      "A2 German course (Goethe-aligned) — preparing for B1.",
      "Refining production ML engineering: model serving, observability, drift detection.",
    ],
  },
  {
    icon: FaBook,
    title: "Reading",
    color: "text-amber-400",
    items: [
      "Designing Data-Intensive Applications — Martin Kleppmann",
      "Staff Engineer — Will Larson",
    ],
  },
];

export default function NowPage() {
  const lastUpdated = "July 2026";

  return (
    <main className="relative min-h-screen bg-page px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-page-muted transition hover:text-purple"
        >
          <FaHome className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">/now</p>
          <h1 className="mt-2 text-4xl font-bold text-page-fg md:text-5xl">What I&apos;m doing now</h1>
          <p className="mt-4 text-page-muted">
            Inspired by{" "}
            <a
              href="https://nownownow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple hover:underline"
            >
              nownownow.com
            </a>{" "}
            — a snapshot of what I&apos;m focused on right now. Last updated: {lastUpdated}.
          </p>
        </header>

        <div className="space-y-6">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.title}
                className="rounded-2xl border border-page bg-page-card p-6"
              >
                <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-page-fg">
                  <Icon className={`h-5 w-5 ${section.color}`} />
                  {section.title}
                </h2>
                <ul className="space-y-2.5 text-sm text-page-muted">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple/60" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-page-muted">
          This page is updated whenever something material changes — not on a fixed schedule.
        </p>
      </div>
    </main>
  );
}
