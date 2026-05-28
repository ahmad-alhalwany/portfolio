import emailjs from "emailjs-com";

export type HireEmailParams = {
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
};

let emailJsInitialized = false;

export function isEmailJsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SERVICE_ID?.trim() &&
      process.env.NEXT_PUBLIC_TEMPLATE_ID?.trim() &&
      process.env.NEXT_PUBLIC_USER_ID?.trim()
  );
}

/** EmailJS rejects with { status, text } — not an Error instance. */
export function formatClientError(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === "object") {
    const record = err as { text?: unknown; status?: unknown; message?: unknown };
    const text =
      typeof record.text === "string" && record.text.trim()
        ? record.text.trim()
        : typeof record.message === "string"
          ? record.message.trim()
          : "";

    if (text.includes("Invalid grant") || text.includes("Gmail_API")) {
      return "Email service offline — Gmail must be reconnected in the EmailJS dashboard. Use LinkedIn or copy my email for now.";
    }

    if (text) return text;
    if (typeof record.status === "number") {
      return `${fallback} (HTTP ${record.status})`;
    }
  }
  return fallback;
}

function ensureEmailJsInit(userId: string): void {
  if (emailJsInitialized) return;
  emailjs.init(userId);
  emailJsInitialized = true;
}

/** EmailJS blocks non-browser API calls — send from the client after server validation. */
export async function sendHireInquiryEmail(params: HireEmailParams): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID?.trim();
  const userId = process.env.NEXT_PUBLIC_USER_ID?.trim();

  if (!serviceId || !templateId || !userId) {
    throw new Error("Email service is not configured.");
  }

  ensureEmailJsInit(userId);

  const subject = `HIRING INQUIRY — ${params.company} — ${params.role}`;
  const body = [
    `Company: ${params.company}`,
    `Role: ${params.role}`,
    `Inquiry type: Full-time / Employment`,
    "",
    params.message,
  ].join("\n");

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: params.name,
        from_email: params.email,
        subject,
        message: body,
        company: params.company,
        role: params.role,
        inquiry_type: "Full-time / Employment",
      },
      userId
    );
  } catch (err) {
    throw new Error(
      formatClientError(err, "Email delivery failed. Check your EmailJS template variables.")
    );
  }
}
