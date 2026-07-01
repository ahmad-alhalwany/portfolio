import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

export const alt = "Project case study — Ahmad Al-Halwany";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOGImage({ params }: { params: { _id: string } }) {
  const content = await getContent();
  const id = parseInt(params._id, 10);
  const project = (content.projects ?? []).find((p) => p.id === id);

  const title = project?.title ?? "Project Case Study";
  const tags = (project?.iconLists ?? ["Python", "Next.js"]).slice(0, 4);

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
              background: "#a78bfa",
              boxShadow: "0 0 24px #a78bfa",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a78bfa",
            }}
          >
            Project case study
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {project?.des ? (
            <div style={{ fontSize: 26, lineHeight: 1.4, color: "#cbd5e1" }}>
              {project.des.slice(0, 140)}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(167,139,250,0.35)",
                  background: "rgba(139,92,246,0.12)",
                  fontSize: 20,
                  color: "#e9d5ff",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 22, color: "#64748b" }}>Ahmad Al-Halwany</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
