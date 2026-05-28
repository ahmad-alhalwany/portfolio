"use client";

import { useEffect, useState } from "react";
import { NewsletterSignup } from "./NewsletterSignup";

export function BlogArticleNewsletter() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/newsletter/status")
      .then((res) => (res.ok ? res.json() : { enabled: false }))
      .then((data) => setEnabled(Boolean(data.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  return <NewsletterSignup variant="inline" />;
}
