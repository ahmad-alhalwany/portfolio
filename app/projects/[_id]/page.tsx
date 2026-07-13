import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getContent } from "@/lib/content";
import { readBundledJsonFile } from "@/lib/server-storage";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Content } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const [bundled, content] = await Promise.all([
    readBundledJsonFile<Content>("content.json", {} as Content),
    getContent(),
  ]);
  const ids = new Set<number>();
  for (const p of bundled.projects ?? []) ids.add(p.id);
  for (const p of content.projects ?? []) ids.add(p.id);
  return [...ids].map((id) => ({ _id: String(id) }));
}

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
