import { AboutSection } from "./types";

export const defaultAboutSection: AboutSection = {
  label: "profile.sys / decode",
  title: "The engineer",
  titleAccent: "behind the product",
  intro:
    "I'm Ahmad Al-Halwany — a full-stack developer who cares about the whole journey: architecture, developer experience, and the people who rely on what we ship.",
  story: [
    "I grew from tinkering with how systems work into owning production APIs, dashboards, and web applications that teams depend on every day.",
    "Today I work across Python backends and Next.js frontends — favoring maintainable code, honest communication, and outcomes that survive beyond the first launch.",
    "I'm seeking a full-time role where ownership, craft, and long-term product impact matter more than quick freelance handoffs.",
  ],
  principles: [
    {
      id: "p1",
      title: "Own the outcome",
      body: "From schema design to UI polish — I follow problems end-to-end instead of throwing them over the wall.",
    },
    {
      id: "p2",
      title: "Communicate clearly",
      body: "Stakeholders and teammates get plain language, realistic estimates, and visibility while work is in flight.",
    },
    {
      id: "p3",
      title: "Ship to learn",
      body: "Small, reliable releases beat big-bang demos — I iterate with metrics, feedback, and room to improve.",
    },
  ],
  timeline: [
    { id: "t1", year: "Now", label: "Full-stack · open to full-time hire" },
    { id: "t2", year: "Focus", label: "Python systems & Next.js products" },
    { id: "t3", year: "Goal", label: "Join a team building something meaningful" },
  ],
  meta: [
    { key: "mode", value: "employment · not freelance" },
    { key: "stack", value: "python · next.js · typescript" },
    { key: "timezone", value: "EU / MENA · remote-friendly" },
    { key: "languages", value: "AR native · EN B2 · DE A2 → B1" },
  ],
  bentoTitle: "Identity fragments",
};
