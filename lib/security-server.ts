import { NextRequest } from "next/server";
import { checkRateLimit } from "./rate-limit";
import {
  getHostnameFromRequest,
  getTurnstileSecretKey,
  isLocalHost,
  isTurnstileConfigured,
} from "./turnstile-config";
import {
  HONEYPOT_FIELD,
  validateFormTiming,
  validateHoneypot,
} from "./security-shared";

export type GuardAction =
  | "hire"
  | "review"
  | "comment"
  | "login"
  | "upload"
  | "analytics"
  | "newsletter";

const RATE_LIMITS: Record<GuardAction, { limit: number; windowMs: number }> = {
  hire: { limit: 5, windowMs: 60 * 60 * 1000 },
  review: { limit: 6, windowMs: 60 * 60 * 1000 },
  comment: { limit: 8, windowMs: 60 * 60 * 1000 },
  login: { limit: 8, windowMs: 15 * 60 * 1000 },
  upload: { limit: 12, windowMs: 60 * 60 * 1000 },
  analytics: { limit: 120, windowMs: 60 * 1000 },
  newsletter: { limit: 6, windowMs: 60 * 60 * 1000 },
};

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function verifyTurnstileToken(
  token: string | undefined,
  request?: NextRequest
): Promise<boolean> {
  const hostname = request ? getHostnameFromRequest(request) : "unknown";
  const secret = getTurnstileSecretKey(hostname);
  if (!secret) return true;

  if (!token?.trim()) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export function isTurnstileEnabled(): boolean {
  return isTurnstileConfigured();
}

export function shouldSkipRateLimit(request: NextRequest): boolean {
  if (process.env.DISABLE_RATE_LIMIT === "true") return true;
  const hostname = getHostnameFromRequest(request);
  if (isLocalHost(hostname)) return true;
  const ip = getClientIp(request);
  return ip === "::1" || ip === "127.0.0.1" || ip === "unknown";
}

export async function enforceRateLimit(
  request: NextRequest,
  action: GuardAction
): Promise<{ ok: true } | { ok: false; message: string; retryAfterSec?: number }> {
  if (shouldSkipRateLimit(request)) return { ok: true };

  const ip = getClientIp(request);
  const cfg = RATE_LIMITS[action];
  const result = await checkRateLimit({
    key: `${action}:${ip}`,
    limit: cfg.limit,
    windowMs: cfg.windowMs,
  });

  if (result.success) return { ok: true };

  const retryAfterSec = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
  return {
    ok: false,
    message: "Too many requests. Please try again later.",
    retryAfterSec,
  };
}

export async function guardPublicForm(
  request: NextRequest,
  body: Record<string, unknown>,
  action: GuardAction,
  options?: { skipTiming?: boolean; skipTurnstile?: boolean }
): Promise<
  { ok: true } | { ok: false; status: number; message: string; retryAfterSec?: number }
> {
  const rate = await enforceRateLimit(request, action);
  if (!rate.ok) {
    return {
      ok: false,
      status: 429,
      message: rate.message,
      retryAfterSec: rate.retryAfterSec,
    };
  }

  if (!validateHoneypot(body[HONEYPOT_FIELD])) {
    return { ok: false, status: 400, message: "Submission rejected." };
  }

  if (!options?.skipTiming) {
    const timingError = validateFormTiming(body.formStartedAt);
    if (timingError) {
      return { ok: false, status: 400, message: timingError };
    }
  }

  if (!options?.skipTurnstile && isTurnstileEnabled()) {
    const token = body.turnstileToken?.toString();
    const valid = await verifyTurnstileToken(token, request);
    if (!valid) {
      return { ok: false, status: 400, message: "Security check failed. Please try again." };
    }
  }

  return { ok: true };
}
