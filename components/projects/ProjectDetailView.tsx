"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { Project } from "@/lib/types";
import { getProjectTechStack } from "@/lib/project-tech";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

type Props = {
  project: Project;
  projects: Project[];
};

function projectNeighbors(projects: Project[], currentId: number) {
  const index = projects.findIndex((p) => p.id === currentId);
  if (index === -1 || projects.length === 0) {
    return { prev: null, next: null, index: 0, total: projects.length };
  }
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next, index: index + 1, total: projects.length };
}

export function ProjectDetailView({ project, projects }: Props) {
  const router = useRouter();
  const isCompact = Boolean(project.compact);
  const tech = getProjectTechStack(project.iconLists);
  const galleryImages = isCompact
    ? []
    : [project.img, ...(project.cards?.map((c) => c.src) ?? [])].filter(Boolean);
  const { prev, next, index, total } = projectNeighbors(projects, project.id);

  const hasGithub = Boolean(project.githubUrl?.trim());
  const hasLive = Boolean(project.liveDemoUrl?.trim());

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-page px-4 pb-20 pt-28 sm:px-8">
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-purple/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-40 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Top bar */}
        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={isCompact ? "/projects" : "/#projects"}
            className="link-underline inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-purple"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            {isCompact ? "Back to all projects" : "Back to projects"}
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>
              Project {index} of {total}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => prev && router.push(`/projects/${prev.id}`)}
                disabled={!prev}
                className="btn-press rounded-full border border-slate-700 bg-slate-900/80 p-2.5 text-slate-300 transition hover:border-purple/50 hover:text-white disabled:opacity-40"
                aria-label="Previous project"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => next && router.push(`/projects/${next.id}`)}
                disabled={!next}
                className="btn-press rounded-full border border-slate-700 bg-slate-900/80 p-2.5 text-slate-300 transition hover:border-purple/50 hover:text-white disabled:opacity-40"
                aria-label="Next project"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Hero */}
        <motion.div
          className={
            isCompact
              ? "max-w-3xl space-y-6"
              : "grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {!isCompact && project.img ? (
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple/25 via-transparent to-cyan-500/10 blur-2xl" />
              <div className="relative aspect-[4/3] min-h-[220px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl sm:min-h-[260px]">
                <OptimizedImage
                  src={project.img}
                  alt={project.title}
                  fill
                  priority
                  sizes={SIZES.service}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>
          ) : null}

          <div className="order-2 space-y-6 lg:order-1">
            <span className="inline-flex rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-purple">
              {isCompact ? "Compact case study" : "Case study"}
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {project.des}
            </p>

            <div className="flex flex-wrap gap-3">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple/50 hover:bg-slate-800"
                >
                  <FaGithub className="h-4 w-4 text-purple" />
                  View source code
                </a>
              )}
              {hasLive && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition hover:opacity-95"
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                  Live demo
                </a>
              )}
              {!hasGithub && !hasLive && (
                <p className="text-sm text-slate-500">
                  Source and live links are not published for this project.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <ProjectCaseStudy project={project} tech={tech} />

        {galleryImages.length > 0 ? (
          <div className="mt-16">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                Gallery
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">Screenshots & UI</h2>
              <p className="mt-2 text-sm text-slate-400">Click any image to view it full size.</p>
            </div>
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>
        ) : null}

        {/* Bottom nav */}
        <ScrollReveal className="mt-16" variant="fadeUp">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:flex-row">
            {prev ? (
              <Link
                href={`/projects/${prev.id}`}
                className="group flex items-center gap-3 text-slate-300 transition hover:text-white"
              >
                <FaChevronLeft className="h-4 w-4 text-purple transition group-hover:-translate-x-0.5" />
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider text-slate-500">Previous</span>
                  <span className="block font-semibold">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <span />
            )}
            <Link
              href={isCompact ? "/projects" : "/#projects"}
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-purple hover:text-white"
            >
              All projects
            </Link>
            {next ? (
              <Link
                href={`/projects/${next.id}`}
                className="group flex items-center gap-3 text-slate-300 transition hover:text-white sm:text-right"
              >
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-slate-500">Next</span>
                  <span className="block font-semibold">{next.title}</span>
                </div>
                <FaChevronRight className="h-4 w-4 text-purple transition group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}

