/** Newsletter form is always available (JSON list); Buttondown is optional. */
export function isNewsletterAvailable(): boolean {
  return true;
}

export function usesButtondown(): boolean {
  return Boolean(process.env.BUTTONDOWN_API_KEY?.trim());
}

/** @deprecated Use isNewsletterAvailable */
export function isNewsletterConfigured(): boolean {
  return isNewsletterAvailable();
}

export async function subscribeToButtondown(email: string): Promise<"created" | "exists"> {
  const apiKey = process.env.BUTTONDOWN_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Newsletter is not configured.");
  }

  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      type: "regular",
      tags: ["portfolio"],
    }),
  });

  if (res.status === 409) return "exists";

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    try {
      const parsed = JSON.parse(body) as { code?: string; detail?: string };
      if (parsed.code === "email_already_exists") return "exists";
      if (parsed.code === "subscriber_blocked") {
        const err = new Error(body || "Subscriber blocked by Buttondown firewall.");
        (err as Error & { buttondownCode?: string }).buttondownCode = "subscriber_blocked";
        throw err;
      }
    } catch (parseErr) {
      if (
        parseErr instanceof Error &&
        (parseErr as Error & { buttondownCode?: string }).buttondownCode === "subscriber_blocked"
      ) {
        throw parseErr;
      }
    }
    throw new Error(body || "Subscription failed.");
  }

  return "created";
}

export type SubscribeResult = {
  outcome: "created" | "exists";
  /** Where the subscriber was recorded */
  channel: "buttondown" | "local";
};

export async function subscribeEmail(
  email: string,
  source: "portfolio" | "blog" = "portfolio"
): Promise<SubscribeResult> {
  const { addSubscriber } = await import("./subscribers");

  if (usesButtondown()) {
    try {
      const outcome = await subscribeToButtondown(email);
      return { outcome, channel: "buttondown" };
    } catch (error) {
      const blocked =
        error instanceof Error &&
        (error as Error & { buttondownCode?: string }).buttondownCode === "subscriber_blocked";

      if (blocked) {
        console.warn(
          "[newsletter] Buttondown firewall blocked this email — saved to local list instead. Adjust firewall in Buttondown dashboard."
        );
      } else {
        console.warn("[newsletter] Buttondown unavailable, saving locally:", error);
      }

      const outcome = await addSubscriber(email, source);
      return { outcome, channel: "local" };
    }
  }

  const outcome = await addSubscriber(email, source);
  return { outcome, channel: "local" };
}
