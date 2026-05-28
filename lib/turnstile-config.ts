/** Cloudflare dummy keys — work on localhost without dashboard hostname setup */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function isLocalHost(hostname: string): boolean {
  return LOCAL_HOSTS.has(hostname.toLowerCase());
}

/** Use production keys on localhost only when explicitly enabled */
export function shouldUseTurnstileTestKeys(hostname: string): boolean {
  if (process.env.NEXT_PUBLIC_TURNSTILE_USE_PROD_KEYS === "true") return false;
  return isLocalHost(hostname);
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}

export function getTurnstileSiteKey(hostname: string): string | undefined {
  const configured = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!configured) return undefined;
  if (shouldUseTurnstileTestKeys(hostname)) return TURNSTILE_TEST_SITE_KEY;
  return configured;
}

export function getTurnstileSecretKey(hostname: string): string | undefined {
  const configured = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!configured) return undefined;
  if (shouldUseTurnstileTestKeys(hostname)) return TURNSTILE_TEST_SECRET_KEY;
  return configured;
}

export function getHostnameFromRequest(request: Request): string {
  try {
    return new URL(request.url).hostname;
  } catch {
    return "unknown";
  }
}
