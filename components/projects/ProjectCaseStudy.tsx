"use client";

import { Project } from "@/lib/types";
import { TechItem } from "@/lib/project-tech";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  tech: TechItem[];
};

const STEPS = [
  { key: "problem", num: "01", label: "Problem", accent: "text-amber-400", border: "border-amber-500/30", bg: "from-amber-500/10" },
  { key: "solution", num: "02", label: "Solution", accent: "text-emerald-400", border: "border-emerald-500/30", bg: "from-emerald-500/10" },
  { key: "stack", num: "03", label: "Stack", accent: "text-cyan-400", border: "border-cyan-500/30", bg: "from-cyan-500/10" },
  { key: "outcome", num: "04", label: "Outcome", accent: "text-purple", border: "border-purple/30", bg: "from-purple/10" },
] as const;

function BulletList({ items, dotClass }: { items: string[]; dotClass: string }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-300 md:text-base">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepHeader({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-sm font-bold",
          accent
        )}
      >
        {num}
      </span>
      <h2 className="text-xl font-bold text-white md:text-2xl">{label}</h2>
    </div>
  );
}

export function ProjectCaseStudy({ project, tech }: Props) {
  const hasProblem = Boolean(project.challenge || project.challengeDetail || project.overview);
  const hasSolution = Boolean(
    project.solution || project.solutionDetail || (project.keyFeatures?.length ?? 0) > 0
  );
  const hasStack = tech.length > 0;
  const hasOutcome = Boolean((project.metrics?.length ?? 0) > 0 || (project.outcomes?.length ?? 0) > 0);

  if (!hasProblem && !hasSolution && !hasStack && !hasOutcome) return null;

  return (
    <ScrollReveal className="mt-16" variant="fadeUp" delay={0.05}>
      <section className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Case study</p>
        <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">Problem → Solution → Stack → Outcome</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
          How the product was scoped, built, and measured — the way engineering teams evaluate real work.
        </p>
      </section>

      <div className="relative space-y-8">
        <div
          className="pointer-events-none absolute left-[21px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-amber-500/40 via-cyan-500/30 to-purple/40 md:block"
          aria-hidden
        />

        {hasProblem && (
          <article
            className={cn(
              "relative rounded-3xl border bg-gradient-to-br to-slate-950 p-6 md:ml-2 md:p-8",
              STEPS[0].border,
              STEPS[0].bg
            )}
          >
            <StepHeader num={STEPS[0].num} label={STEPS[0].label} accent={STEPS[0].accent} />
            {project.overview && (
              <p className="text-base leading-relaxed text-slate-300 md:text-lg">{project.overview}</p>
            )}
            {project.challenge && (
              <p className={cn("font-semibold leading-snug text-white", project.overview ? "mt-4 text-lg" : "text-lg")}>
                {project.challenge}
              </p>
            )}
            {project.challengeDetail && (
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">{project.challengeDetail}</p>
            )}
          </article>
        )}

        {hasSolution && (
          <article
            className={cn(
              "relative rounded-3xl border bg-gradient-to-br to-slate-950 p-6 md:ml-2 md:p-8",
              STEPS[1].border,
              STEPS[1].bg
            )}
          >
            <StepHeader num={STEPS[1].num} label={STEPS[1].label} accent={STEPS[1].accent} />
            {project.solution && (
              <p className="text-lg font-semibold leading-snug text-white">{project.solution}</p>
            )}
            {project.solutionDetail && (
              <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">{project.solutionDetail}</p>
            )}
            {(project.keyFeatures?.length ?? 0) > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/90">How I built it</p>
                <BulletList items={project.keyFeatures!} dotClass="bg-emerald-400" />
              </div>
            )}
          </article>
        )}

        {hasStack && (
          <article
            className={cn(
              "relative rounded-3xl border bg-gradient-to-br to-slate-950 p-6 md:ml-2 md:p-8",
              STEPS[2].border,
              STEPS[2].bg
            )}
          >
            <StepHeader num={STEPS[2].num} label={STEPS[2].label} accent={STEPS[2].accent} />
            <p className="mb-5 text-sm text-slate-400">
              Tools chosen for speed, maintainability, and fit with the product constraints above.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {tech.map((item) => (
                <div
                  key={item.icon}
                  className="interactive-card flex items-center gap-3 bg-slate-950/90 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
                    <OptimizedImage
                      src={item.icon}
                      alt={item.name}
                      width={28}
                      height={28}
                      sizes={SIZES.icon}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{item.name}</span>
                </div>
              ))}
            </div>
          </article>
        )}

        {hasOutcome && (
          <article
            className={cn(
              "relative rounded-3xl border bg-gradient-to-br to-slate-950 p-6 md:ml-2 md:p-8",
              STEPS[3].border,
              STEPS[3].bg
            )}
          >
            <StepHeader num={STEPS[3].num} label={STEPS[3].label} accent={STEPS[3].accent} />

            {(project.metrics?.length ?? 0) > 0 && (
              <StaggerReveal className="grid gap-4 sm:grid-cols-3">
                {project.metrics!.map((metric) => (
                  <StaggerItem key={metric.id}>
                    <div className="interactive-card h-full bg-slate-950/90 p-5 text-center">
                      <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">{metric.value}</p>
                      <p className="mt-2 text-xs leading-snug text-slate-400 md:text-sm">{metric.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            )}

            {(project.outcomes?.length ?? 0) > 0 && (
              <div className={cn((project.metrics?.length ?? 0) > 0 && "mt-6")}>
                <p className="text-xs font-bold uppercase tracking-widest text-purple">Impact & results</p>
                <BulletList items={project.outcomes!} dotClass="bg-purple" />
              </div>
            )}
          </article>
        )}
      </div>
    </ScrollReveal>
  );
}
