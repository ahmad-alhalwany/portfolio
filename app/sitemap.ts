import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { getContent } from "@/lib/content";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/education"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/experience"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    blogRoutes = posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    blogRoutes = [];
  }

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const content = await getContent();
    projectRoutes = (content.projects ?? []).map((project) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    projectRoutes = [];
  }

  if (!base || base.includes("localhost")) {
    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
