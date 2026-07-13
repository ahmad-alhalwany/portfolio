import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Education | ${siteConfig.shortName}`,
  description: "Education background and learning journey of Ahmad Al-Halwany, AI Application Developer.",
  path: "/education",
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
