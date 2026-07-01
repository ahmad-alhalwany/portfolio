import { getPublishedPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const base = getSiteUrl();
  const posts = await getPublishedPosts();
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt || post.createdAt).toUTCString();
      const categories = (post.tags || [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author || "Ahmad Al-Halwany")}</dc:creator>${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Ahmad Al-Halwany — Blog</title>
    <link>${base}/blog</link>
    <description>Production engineering notes — FastAPI, Next.js, and full-stack systems.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}
