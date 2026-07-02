import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaLaptopCode, FaTerminal, FaKeyboard, FaCloud, FaCubes } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Uses / Tools I use",
  description:
    "The development tools, hardware, and frameworks Ahmad Al-Halwany uses day-to-day for full-stack engineering.",
  path: "/uses",
});

const SECTIONS = [
  {
    icon: FaLaptopCode,
    title: "Editor & terminal",
    items: [
      { name: "Cursor", note: "Primary editor — AI-first VS Code fork" },
      { name: "VS Code", note: "Fallback / pair-programming sessions" },
      { name: "Windows Terminal + PowerShell", note: "Daily driver on Windows 11" },
      { name: "Git + GitHub CLI", note: "Version control and PR workflow" },
    ],
  },
  {
    icon: FaCubes,
    title: "Stack",
    items: [
      { name: "Next.js 14 (App Router)", note: "Frontend / SSR / ISR" },
      { name: "TypeScript", note: "Strict mode everywhere" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Python · FastAPI · Django", note: "Backend APIs and services" },
      { name: "PostgreSQL + Redis", note: "Primary datastores" },
      { name: "Prisma + SQLAlchemy", note: "ORMs depending on the project" },
    ],
  },
  {
    icon: FaCloud,
    title: "Deployment & infra",
    items: [
      { name: "Vercel", note: "Frontend / edge / ISR" },
      { name: "Upstash Redis", note: "Serverless caching and CMS" },
      { name: "Render / Railway", note: "Backend services when needed" },
      { name: "Sentry", note: "Error monitoring" },
      { name: "GitHub Actions", note: "CI for typecheck, lint, tests" },
    ],
  },
  {
    icon: FaKeyboard,
    title: "Hardware",
    items: [
      { name: "Windows 11 workstation", note: "16 GB RAM · SSD" },
      { name: "Mechanical keyboard", note: "Tactile switches" },
      { name: "Dual monitor setup", note: "Code + preview side-by-side" },
    ],
  },
];

export default function UsesPage() {
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">/uses</p>
          <h1 className="mt-2 text-4xl font-bold text-page-fg md:text-5xl">What I use</h1>
          <p className="mt-4 text-page-muted">
            Inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple hover:underline"
            >
              uses.tech
            </a>{" "}
            — the tools, hardware, and frameworks I rely on day-to-day to ship
            full-stack products.
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
                  <Icon className="h-5 w-5 text-purple" />
                  {section.title}
                </h2>
                <ul className="divide-y divide-[var(--page-border)]">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-medium text-page-fg">{item.name}</span>
                      <span className="text-xs text-page-muted">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
