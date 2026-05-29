import type { Metadata } from "next";
import { BlogPostPublic, Project } from "./types";

export const siteConfig = {
  name: "Ahmad Al-Halwany",
  shortName: "Ahmad Al-Halwany",
  title: "Ahmad Al-Halwany | Full-Stack Developer",
  description:
    "Full-stack developer specializing in Python, Next.js, and scalable web applications. Open to full-time roles. Portfolio, projects, blog, and contact.",
  locale: "en_US",
  language: "en",
  email: "ahmad.s.alhalwany@gmail.com",
  twitterHandle: "@ahmad_alhalwany",
  githubUrl: "https://github.com/ahmad-alhalwany",
  linkedinUrl: "https://www.linkedin.com/in/ahmad-alhalwany/",
  defaultOgImage: "/opengraph-image",
  keywords: [
    "Ahmad Al-Halwany",
    "full-stack developer",
    "Python developer",
    "Next.js developer",
    "portfolio",
    "web developer",
    "software engineer",
    "hire developer",
  ],
} as const;

/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. https://yourdomain.com) */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string = ""): string {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path = "",
    image = siteConfig.defaultOgImage,
    type = "website",
    publishedTime,
    modifiedTime,
    tags,
    noIndex = false,
  } = input;

  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  const ogImages = [{ url: imageUrl, width: 1200, height: 630, alt: title }];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          locale: siteConfig.locale,
          url,
          siteName: siteConfig.shortName,
          title,
          description,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
          authors: [siteConfig.name],
          tags,
          images: ogImages,
        }
      : {
          type: "website",
          locale: siteConfig.locale,
          url,
          siteName: siteConfig.shortName,
          title,
          description,
          images: ogImages,
        };

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...(tags ?? [])],
    authors: [{ name: siteConfig.name, url: siteConfig.linkedinUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
  };
}

export const rootMetadata: Metadata = {
  ...buildPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  category: "technology",
  applicationName: siteConfig.shortName,
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: getSiteUrl(),
    email: siteConfig.email,
    jobTitle: "Full-Stack Developer",
    sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
    knowsAbout: [
      "Python",
      "Next.js",
      "TypeScript",
      "React",
      "Django",
      "Web Development",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: getSiteUrl(),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    author: { "@type": "Person", name: siteConfig.name },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    url: getSiteUrl(),
    description: siteConfig.description,
    mainEntity: { "@type": "Person", name: siteConfig.name },
  };
}

export function creativeWorkJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.des,
    url: absoluteUrl(`/projects/${project.id}`),
    image: project.img ? absoluteUrl(project.img) : undefined,
    author: { "@type": "Person", name: siteConfig.name },
  };
}

export function blogPostingJsonLd(post: BlogPostPublic) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: post.tags?.join(", "),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
