"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Project } from "@/lib/types";
import { getProjectHighlight } from "@/lib/project-utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type Variant = "hero" | "standard";

type Props = {
  project: Project;
  variant?: Variant;
  className?: string;
};

export function ProjectShowcaseCard({ project, variant = "standard", className }: Props) {
  const isHero = variant === "hero";
  const highlight = getProjectHighlight(project);
  const hasLive = Boolean(project.liveDemoUrl?.trim());
  const hasGithub = Boolean(project.githubUrl?.trim());

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "interactive-card group flex h-full flex-col overflow-hidden bg-slate-950/80",
        isHero ? "lg:min-h-[420px]" : "min-h-[280px]",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden border-b border-slate-800/80 bg-[#13162D]",
          isHero ? "h-52 sm:h-60 md:h-64" : "h-40 sm:h-44"
        )}
      >
        <OptimizedImage
          src="/bg.png"
          alt=""
          fill
          sizes={isHero ? SIZES.projectCard : SIZES.projectThumb}
          className="object-cover opacity-90"
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex items-end justify-center px-3 sm:px-4",
            isHero ? "h-[11rem] sm:h-[13rem]" : "h-[8.5rem] sm:h-[9.5rem]"
          )}
        >
          <div className="relative h-full w-full max-w-md min-h-[7rem]">
            <OptimizedImage
              src={project.img}
              alt={project.title}
              fill
              sizes={SIZES.projectThumb}
              className="object-contain object-bottom transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2 sm:left-4 sm:top-4">
          {isHero && (
            <span className="rounded-full border border-purple/40 bg-purple/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple sm:text-xs">
              Featured
            </span>
          )}
          {hasLive && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
              Live
            </span>
          )}
          {hasGithub && (
            <span className="rounded-full border border-slate-600 bg-slate-900/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
              GitHub
            </span>
          )}
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col", isHero ? "p-6 md:p-8" : "p-5")}>
        <h3
          className={cn(
            "font-bold leading-snug text-white transition group-hover:text-purple",
            isHero ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm font-medium text-purple/90">{highlight}</p>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">{project.des}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          <div className="flex items-center">
            {project.iconLists.slice(0, isHero ? 6 : 4).map((icon, index) => (
              <div
                key={`${icon}-${index}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/80 lg:h-9 lg:w-9"
                style={{ transform: `translateX(-${4 * index}px)` }}
              >
                <OptimizedImage
                  src={icon}
                  alt=""
                  width={22}
                  height={22}
                  sizes={SIZES.icon}
                  className="p-1.5"
                />
              </div>
            ))}
          </div>

          <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-purple">
            Case study
            <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
