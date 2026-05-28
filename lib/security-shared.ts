/** Client-safe validation & anti-spam helpers (no Node.js fs). */

export const HONEYPOT_FIELD = "website";
export const MIN_FORM_FILL_MS = 3000;
export const MAX_FORM_FILL_MS = 2 * 60 * 60 * 1000;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
]);

const SPAM_PATTERNS = [
  /viagra|cialis|casino|crypto airdrop|buy followers/i,
  /(https?:\/\/){3,}/i,
];

export type HireInquiryInput = {
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
};

export type ReviewSubmitInput = {
  name: string;
  email: string;
  message: string;
  rating: number;
  avatar?: string;
};

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

export function looksLikeSpam(text: string): boolean {
  return SPAM_PATTERNS.some((p) => p.test(text));
}

export function hasTooManyLinks(text: string, max = 3): boolean {
  const links = text.match(/https?:\/\//gi);
  return (links?.length ?? 0) > max;
}

export function sanitizeText(value: string, maxLen: number): string {
  return value.replace(/\0/g, "").trim().slice(0, maxLen);
}

export function validateHoneypot(value: unknown): boolean {
  if (value == null) return true;
  const s = String(value).trim();
  return s.length === 0;
}

export function validateFormTiming(startedAt: unknown): string | null {
  const ts = Number(startedAt);
  if (!Number.isFinite(ts)) return "Invalid form session.";
  const elapsed = Date.now() - ts;
  if (elapsed < MIN_FORM_FILL_MS) return "Please take a moment before submitting.";
  if (elapsed > MAX_FORM_FILL_MS) return "Form expired. Please refresh and try again.";
  return null;
}

export function validateHireInquiry(input: HireInquiryInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = sanitizeText(input.name, 80);
  const company = sanitizeText(input.company, 100);
  const email = sanitizeText(input.email, 254).toLowerCase();
  const role = sanitizeText(input.role, 120);
  const message = sanitizeText(input.message, 2000);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (company.length < 2) errors.company = "Company name is required.";
  if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid work email.";
  else if (isDisposableEmail(email)) errors.email = "Please use a permanent work email.";
  if (role.length < 2) errors.role = "Role or team name helps me prepare.";
  if (message.length < 20) errors.message = "At least 20 characters so I can respond meaningfully.";
  if (message.length > 2000) errors.message = "Message is too long (max 2000 characters).";
  if (looksLikeSpam(message) || looksLikeSpam(name)) errors.message = "Message could not be sent.";
  if (hasTooManyLinks(message)) errors.message = "Too many links in the message.";

  return errors;
}

export function validateReviewSubmit(input: ReviewSubmitInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = sanitizeText(input.name, 80);
  const email = sanitizeText(input.email, 254).toLowerCase();
  const message = sanitizeText(input.message, 1500);

  if (name.length < 2) errors.name = "Name is required (min 2 characters).";
  if (!EMAIL_REGEX.test(email)) errors.email = "Valid email is required.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (message.length > 1500) errors.message = "Message is too long.";
  if (!Number.isFinite(input.rating) || input.rating < 1 || input.rating > 5) {
    errors.rating = "Rating must be between 1 and 5.";
  }
  if (looksLikeSpam(message) || looksLikeSpam(name)) errors.message = "Submission blocked.";
  if (hasTooManyLinks(message)) errors.message = "Too many links in the message.";

  return errors;
}

export function normalizeHireInput(raw: Record<string, unknown>): HireInquiryInput {
  return {
    name: sanitizeText(String(raw.name ?? ""), 80),
    company: sanitizeText(String(raw.company ?? ""), 100),
    email: sanitizeText(String(raw.email ?? ""), 254).toLowerCase(),
    role: sanitizeText(String(raw.role ?? ""), 120),
    message: sanitizeText(String(raw.message ?? ""), 2000),
  };
}

export function normalizeReviewInput(raw: Record<string, unknown>): ReviewSubmitInput {
  return {
    name: sanitizeText(String(raw.name ?? ""), 80),
    email: sanitizeText(String(raw.email ?? ""), 254).toLowerCase(),
    message: sanitizeText(String(raw.message ?? ""), 1500),
    rating: Number(raw.rating),
    avatar: raw.avatar ? sanitizeText(String(raw.avatar), 512) : undefined,
  };
}

export function validateNewsletterEmail(email: string): Record<string, string> {
  const errors: Record<string, string> = {};
  const normalized = sanitizeText(email, 254).toLowerCase();

  if (!EMAIL_REGEX.test(normalized)) errors.email = "Enter a valid email address.";
  else if (isDisposableEmail(normalized)) errors.email = "Please use a permanent email address.";

  return errors;
}

export function normalizeNewsletterInput(raw: Record<string, unknown>): { email: string } {
  return {
    email: sanitizeText(String(raw.email ?? ""), 254).toLowerCase(),
  };
}

export type CommentSubmitInput = {
  postSlug: string;
  name: string;
  email: string;
  message: string;
};

export function validateCommentSubmit(input: CommentSubmitInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = sanitizeText(input.name, 80);
  const email = sanitizeText(input.email, 254).toLowerCase();
  const message = sanitizeText(input.message, 1200);
  const slug = sanitizeText(input.postSlug, 120).toLowerCase();

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) errors.postSlug = "Invalid article.";
  if (name.length < 2) errors.name = "Name is required (min 2 characters).";
  if (!EMAIL_REGEX.test(email)) errors.email = "Valid email is required.";
  else if (isDisposableEmail(email)) errors.email = "Please use a permanent email.";
  if (message.length < 5) errors.message = "Comment must be at least 5 characters.";
  if (message.length > 1200) errors.message = "Comment is too long (max 1200).";
  if (looksLikeSpam(message) || looksLikeSpam(name)) errors.message = "Comment could not be posted.";
  if (hasTooManyLinks(message)) errors.message = "Too many links in the comment.";

  return errors;
}

export function normalizeCommentInput(raw: Record<string, unknown>): CommentSubmitInput {
  return {
    postSlug: sanitizeText(String(raw.postSlug ?? ""), 120).toLowerCase(),
    name: sanitizeText(String(raw.name ?? ""), 80),
    email: sanitizeText(String(raw.email ?? ""), 254).toLowerCase(),
    message: sanitizeText(String(raw.message ?? ""), 1200),
  };
}
