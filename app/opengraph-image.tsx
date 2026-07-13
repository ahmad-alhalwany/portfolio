import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
              background: "#34d399",
              boxShadow: "0 0 24px #34d399",
            }}
          />
          <span style={{ fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a78bfa" }}>
            Open to full-time roles
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Ahmad Alhalwany
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.25, color: "#cbd5e1" }}>
            AI Application Developer · ML · LLM/RAG · Full-Stack
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.5, color: "#94a3b8", maxWidth: 860 }}>
            {siteConfig.description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["RAG", "LLM", "Python", "FastAPI"].map((tag) => (
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
          <span style={{ fontSize: 22, color: "#64748b" }}>ahmad.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
