"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectShowcaseCard } from "@/components/projects/ProjectShowcaseCard";
import { Project } from "@/lib/types";
import { getFeaturedProjects } from "@/lib/project-utils";
import { projects as defaultProjects } from "@/data/indxe";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Props = {
  projects?: Project[];
};

const FEATURED_COUNT = 5;

const RecentProject = ({ projects = defaultProjects }: Props) => {
  const { t } = useLocale();
  const featured = getFeaturedProjects(projects, FEATURED_COUNT);
  const [hero, ...rest] = featured;
  const sidebar = rest.slice(0, 2);
  const bottomRow = rest.slice(2);
  const totalCount = projects.length;

  if (!hero) return null;

  return (
    <section className="py-20" id="projects">
      <SectionHeading>
        {t("projects.featuredLead")} <span className="text-purple">{t("projects.featuredAccent")}</span>
      </SectionHeading>

      <ScrollReveal className="mx-auto mt-4 max-w-2xl text-center" variant="fadeUp">
        <p className="text-sm leading-relaxed text-slate-400 md:text-base">
          {t("projects.featuredDesc")}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-10 max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-7" variant="fadeUp">
            <ProjectShowcaseCard project={hero} variant="hero" />
          </ScrollReveal>

          {sidebar.length > 0 && (
            <div className="flex flex-col gap-6 lg:col-span-5">
              {sidebar.map((project, index) => (
                <ScrollReveal key={project.id} variant="fadeUp" delay={0.05 * (index + 1)}>
                  <ProjectShowcaseCard project={project} variant="standard" />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        {bottomRow.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {bottomRow.map((project, index) => (
              <ScrollReveal
                key={project.id}
                variant="fadeUp"
                delay={0.05 * (sidebar.length + index + 1)}
              >
                <ProjectShowcaseCard project={project} variant="standard" />
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal className="mt-10 flex justify-center" variant="fadeUp" delay={0.15}>
          <Link
            href="/projects"
            className="btn-press group inline-flex items-center gap-3 rounded-full border border-purple/40 bg-purple/10 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-purple/60 hover:bg-purple/20"
          >
            {t("projects.viewAllCount").replace("{n}", String(totalCount))}
            <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RecentProject;
