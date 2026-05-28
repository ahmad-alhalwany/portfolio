const CALENDLY_HOST = "calendly.com";

/** CMS value wins; env is fallback for deploy-time config. */
export function resolveCalendlyUrl(
  cmsUrl?: string,
  envUrl = process.env.NEXT_PUBLIC_CALENDLY_URL
): string {
  const raw = cmsUrl?.trim() || envUrl?.trim() || "";
  return normalizeCalendlyUrl(raw);
}

export function normalizeCalendlyUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    if (!url.hostname.endsWith(CALENDLY_HOST)) return "";
    url.protocol = "https:";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function isCalendlyUrl(url: string): boolean {
  return normalizeCalendlyUrl(url).length > 0;
}

export function buildIntroCallMailto(email: string): string {
  const subject = encodeURIComponent("Intro call — hiring inquiry");
  const body = encodeURIComponent(
    "Hi Ahmad,\n\nI'd like to schedule a brief intro call.\n\nCompany:\nRole:\nPreferred times (timezone):\n\nThanks,"
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
