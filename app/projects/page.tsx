import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { getContent } from "@/lib/content";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import CompactProjectsSection from "@/components/projects/CompactProjectsSection";
import { getCompactProjects, getFullProjects } from "@/lib/project-utils";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Projects | Ahmad Alhalwany",
  description:
    "Full-stack projects by Ahmad Alhalwany — web apps, mobile, AI platforms, and 3D experiences with case studies and live demos.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const content = await getContent();
  const allProjects = content.projects ?? [];
  const fullProjects = getFullProjects(allProjects);
  const compactProjects = getCompactProjects(allProjects);

  return (
    <main id="main-content" className="relative min-h-screen bg-page px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-purple"
        >
          <FaHome className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Portfolio</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">All projects</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Featured builds with full case studies and screenshots. Additional GitHub repos below
            are documented as compact text-only studies.
          </p>
        </header>

        {fullProjects.length > 0 ? (
          <ProjectsGrid projects={fullProjects} />
        ) : (
          <p className="text-center text-slate-400">No projects available yet.</p>
        )}

        <CompactProjectsSection projects={compactProjects} />
      </div>
    </main>
  );
}
