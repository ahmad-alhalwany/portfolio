"use client";

import { useEffect, useState } from "react";
import { NewsletterSignup } from "./NewsletterSignup";

export function FooterNewsletter() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/newsletter/status")
      .then((res) => (res.ok ? res.json() : { enabled: false }))
      .then((data) => setEnabled(Boolean(data.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  return (
    <div className="relative z-10 mx-auto mb-10 max-w-4xl px-4">
      <NewsletterSignup variant="footer" />
    </div>
  );
}
