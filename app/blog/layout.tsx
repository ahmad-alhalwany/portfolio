import type { Metadata } from "next";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Blog | ${siteConfig.shortName}`,
  description:
    "Technical articles on ML, LLM/RAG, and production AI development with Python and Next.js.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
