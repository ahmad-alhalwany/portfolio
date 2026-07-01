import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/seo";

export const alt = "Article — Ahmad Al-Halwany";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogPostOGImage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  const title = post?.title ?? "Article";
  const excerpt = post?.excerpt ?? siteConfig.description;
  const tags = (post?.tags ?? []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0a0612 0%, #1a0f2e 45%, #0f172a 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#22d3ee",
              boxShadow: "0 0 24px #22d3ee",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#67e8f9",
            }}
          >
            Article · {post?.readTimeMinutes ?? 4} min read
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: "#cbd5e1" }}>
            {excerpt.slice(0, 180)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(34,211,238,0.35)",
                    background: "rgba(34,211,238,0.10)",
                    fontSize: 18,
                    color: "#a5f3fc",
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span style={{ fontSize: 22, color: "#64748b" }}>ahmad.dev / blog</span>
            )}
          </div>
          <span style={{ fontSize: 22, color: "#64748b" }}>Ahmad Al-Halwany</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
