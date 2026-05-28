/** Sanitize upload filename segment to match files written by /api/upload */
export function sanitizeUploadFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

/** Fix legacy paths that contain spaces or special chars so they match on-disk names */
export function normalizeUploadUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.startsWith("/uploads/")) return trimmed;

  const lastSlash = trimmed.lastIndexOf("/");
  if (lastSlash === -1) return trimmed;

  const dir = trimmed.slice(0, lastSlash + 1);
  const fileName = trimmed.slice(lastSlash + 1);
  return dir + sanitizeUploadFileName(decodeURIComponent(fileName));
}

export function isUploadPath(src: string): boolean {
  return src.startsWith("/uploads/") || src.startsWith("/api/media/");
}

/** Serve uploaded files via API — works for files added after `next start` */
export function toMediaServeUrl(url: string, cacheBust?: string | number): string {
  const normalized = normalizeUploadUrl(url);
  if (normalized.startsWith("/uploads/")) {
    const rel = normalized.slice("/uploads/".length);
    const encoded = rel.split("/").map((segment) => encodeURIComponent(segment)).join("/");
    const base = `/api/media/${encoded}`;
    return cacheBust != null ? `${base}?v=${encodeURIComponent(String(cacheBust))}` : base;
  }
  return normalized;
}

export function normalizeProjectImages<T extends { img: string; spareImg?: string; cards?: { src: string }[] }>(
  project: T
): T {
  return {
    ...project,
    img: normalizeUploadUrl(project.img),
    spareImg: project.spareImg ? normalizeUploadUrl(project.spareImg) : project.spareImg,
    cards: project.cards?.map((c) => ({ src: normalizeUploadUrl(c.src) })),
  };
}
