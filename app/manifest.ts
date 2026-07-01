import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0612",
    theme_color: "#0a0612",
    orientation: "portrait-primary",
    categories: ["portfolio", "developer", "technology", "business"],
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/code-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      { name: "Projects", url: "/projects", description: "Case studies" },
      { name: "Blog", url: "/blog", description: "Articles" },
      { name: "Contact", url: "/#contact", description: "Get in touch" },
    ],
  };
}
