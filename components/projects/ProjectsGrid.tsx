"use client";

import { Project } from "@/lib/types";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Props = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <ScrollReveal key={project.id} variant="fadeUp" delay={0.04 * (index % 6)}>
          <ProjectShowcaseCard project={project} variant="standard" />
        </ScrollReveal>
      ))}
    </div>
  );
}
