import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Work Experience | ${siteConfig.shortName}`,
  description:
    "Career timeline of Ahmad Al-Halwany — frontend, full-stack, internship at LIT-Co, and freelance app delivery with responsibilities and tech stack.",
  path: "/experience",
});

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
