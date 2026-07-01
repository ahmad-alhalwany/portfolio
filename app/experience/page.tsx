import { Metadata } from "next";
import { ExperiencePageView } from "@/components/experience/ExperiencePageView";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Work Experience | Ahmad Al-Halwany",
  description:
    "Full-stack and backend engineering roles — Al Ankabot, freelance, internships — with technologies, responsibilities, and outcomes per role.",
  path: "/experience",
});

export default function ExperiencePage() {
  return <ExperiencePageView />;
}
