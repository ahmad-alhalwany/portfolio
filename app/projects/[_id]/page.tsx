import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { _id: string };
};

export default async function ProjectPage({ params }: PageProps) {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const projects = content.projects ?? [];
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} projects={projects} />;
}
