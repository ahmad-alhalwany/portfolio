import { Project } from "@/lib/types";
import CompactProjectCard from "./CompactProjectCard";

type Props = { projects: Project[] };

export default function CompactProjectsSection({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section id="more-github" className="mt-20 w-full" aria-labelledby="more-github-heading">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-purple">More on GitHub</p>
        <h2 id="more-github-heading" className="heading mt-2">
          Additional <span className="text-purple">Projects</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white-100 md:text-base">
          Smaller builds and experiments — concise case studies without screenshots. Full repos
          linked on GitHub.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <CompactProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
