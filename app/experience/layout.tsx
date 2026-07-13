import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Work Experience | ${siteConfig.shortName}`,
  description:
    "Career timeline of Ahmad Al-Halwany — AI application development, full-stack engineering, and production ML/LLM work.",
  path: "/experience",
});

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
