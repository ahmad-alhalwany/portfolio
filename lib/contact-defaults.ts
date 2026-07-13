import { ContactSection } from "./types";

export const defaultContactSection: ContactSection = {
  heading: "Hiring managers:",
  headingHighlight: "let's build your next product together.",
  description:
    "I'm an AI Application Developer open to full-time roles — not freelance. Reach out for interviews, technical screens, or team-fit conversations.",
  badge: "Open to full-time opportunities",
  availability: "Based in Trier, Germany · open to on-site, hybrid & remote roles",
  email: "ahmad.s.alhalwany@gmail.com",
  calendlyUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/ahmad-alhalwany/",
  resumeUrl: "/resume/ahmad-alhalwany-cv-en.pdf",
  resumeUrlDe: "/resume/ahmad-alhalwany-cv-de.pdf",
  highlights: [
    { id: "h1", value: "3+", label: "years experience" },
    { id: "h2", value: "Full-stack", label: "Python & Next.js" },
    { id: "h3", value: "1–2 days", label: "recruiter reply time" },
  ],
  formTitle: "Send a hiring inquiry",
  formDescription: "Include company, role, and stack. Built for HR and engineering leads.",
  primaryCtaLabel: "Connect on LinkedIn",
  calendlyCtaLabel: "Book an intro call",
  copyright: "Copyright © 2026 Ahmad Alhalwany",
  socialMedia: [],
};

export function mergeContactSection(
  contact: ContactSection,
  socialFallback: ContactSection["socialMedia"] = []
): ContactSection {
  return {
    ...defaultContactSection,
    ...contact,
    highlights:
      contact.highlights?.length > 0 ? contact.highlights : defaultContactSection.highlights,
    socialMedia:
      contact.socialMedia?.length > 0 ? contact.socialMedia : socialFallback,
  };
}
