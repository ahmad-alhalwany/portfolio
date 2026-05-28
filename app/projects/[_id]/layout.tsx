import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/lib/content";
import { buildPageMetadata, creativeWorkJsonLd, siteConfig } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: { _id: string };
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const project = content.projects?.find((p) => p.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return buildPageMetadata({
    title: `${project.title} | Ahmad Al-Halwany`,
    description: project.des,
    path: `/projects/${project.id}`,
    image: project.img || siteConfig.defaultOgImage,
  });
}

export default async function ProjectLayout({ children, params }: LayoutProps) {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const project = content.projects?.find((p) => p.id === id);

  return (
    <>
      {project ? <JsonLd data={creativeWorkJsonLd(project)} /> : null}
      {children}
    </>
  );
}
