import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/lib/types";
import { hasProjectLinks } from "@/lib/project-utils";

type Props = { project: Project };

export default function CompactProjectCard({ project }: Props) {
  const features = project.keyFeatures?.slice(0, 4) ?? [];

  return (
    <article className="group rounded-2xl border border-white/10 bg-black-100/40 p-5 transition-colors hover:border-purple/30 hover:bg-black-100/70 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
            {project.iconLists?.length ? (
              <div className="flex items-center gap-1.5">
                {project.iconLists.slice(0, 5).map((icon, i) => (
                  <img key={i} src={icon} alt="" className="h-5 w-5 opacity-80" />
                ))}
              </div>
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-white-100 md:text-base">{project.des}</p>
        </div>
        {hasProjectLinks(project) ? (
          <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-purple/40 bg-purple/10 px-4 py-2 text-sm font-medium text-purple hover:bg-purple/20"
            >
              Case study
            </Link>
            {project.githubUrl?.trim() ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-white-100 hover:border-white/30 hover:text-white"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white-200">Problem</p>
          <p className="text-sm text-white-100">{project.challenge}</p>
        </div>
        <div className="rounded-xl border border-purple/10 bg-purple/[0.04] px-4 py-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-purple">Approach</p>
          <p className="text-sm text-white-100">{project.solution}</p>
        </div>
      </div>

      {features.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {features.map((f, i) => (
            <li
              key={i}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white-100"
            >
              {f.length > 56 ? `${f.slice(0, 54)}…` : f}
            </li>
          ))}
          {(project.keyFeatures?.length ?? 0) > 4 ? (
            <li className="rounded-full px-2 py-1 text-xs text-white-200">
              +{(project.keyFeatures?.length ?? 0) - 4} more
            </li>
          ) : null}
        </ul>
      ) : null}
    </article>
  );
}
