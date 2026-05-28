/** Shared image sizing hints for next/image */

export const IMAGE_QUALITY = 82;

export const SIZES = {
  hero: "(max-width: 768px) 100vw, 50vw",
  projectCard: "(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 570px",
  projectThumb: "(max-width: 768px) 100vw, 570px",
  service: "(max-width: 1280px) 50vw, 600px",
  thumbnail: "128px",
  icon: "40px",
  blogCard: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px",
} as const;

export function isOptimizableImage(src: string): boolean {
  if (!src) return false;
  if (src.endsWith(".svg")) return false;
  // User uploads are served as-is; next/image optimizer returns 404 HTML for missing cache entries
  if (src.startsWith("/uploads/")) return false;
  return src.startsWith("/") || src.startsWith("https://");
}
