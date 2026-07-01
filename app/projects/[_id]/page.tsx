import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getContent } from "@/lib/content";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

type PageProps = {
  params: { _id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const project = (content.projects ?? []).find((p) => p.id === id);
  if (!project) return { title: "Project not found" };

  return buildPageMetadata({
    title: `${project.title} | Project case study`,
    description: project.des || project.challenge || `Project case study by Ahmad Al-Halwany.`,
    path: `/projects/${project.id}`,
    image: project.img,
    type: "article",
    tags: project.iconLists,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const projects = content.projects ?? [];
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.des,
            url: `/projects/${project.id}`,
            author: { "@type": "Person", name: "Ahmad Al-Halwany" },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        ]}
      />
      <ProjectDetailView project={project} projects={projects} />
    </>
  );
}
