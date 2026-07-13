import { AboutSection } from "./types";

export const defaultAboutSection: AboutSection = {
  label: "profile.sys / decode",
  title: "The engineer",
  titleAccent: "behind the product",
  intro:
    "AI Application Developer combining a ZAB-recognised Bachelor in AI Engineering with 3+ years of full-stack experience. I build AI products end-to-end — machine learning, computer vision (OpenCV, Keras, Grad-CAM), NLP, and LLM assistants — and ship them as production apps (Python/FastAPI, Next.js, TypeScript, PostgreSQL). I care about shipping real, usable AI products, not notebooks.",
  story: [
    "From AI engineering studies to production systems — I combine ML model work with the full-stack delivery that turns research into software people actually use.",
    "Recent focus: computer vision with explainability (Grad-CAM), RAG assistants with source citations, and context-grounded LLM integrations in real web apps.",
    "I'm seeking a full-time role where I can build AI products end-to-end — from model and retrieval layer to API, UI, and deployment.",
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
    { id: "t1", year: "Now", label: "AI applications · open to full-time hire" },
    { id: "t2", year: "Focus", label: "ML · LLM/RAG · production full-stack" },
    { id: "t3", year: "Goal", label: "Join a team building something meaningful" },
  ],
  meta: [
    { key: "mode", value: "employment · not freelance" },
    { key: "stack", value: "ml · llm/rag · python · next.js" },
    { key: "timezone", value: "Germany · CET (Trier)" },
    { key: "languages", value: "AR native · EN B2 · DE A2 → B1" },
  ],
  bentoTitle: "Identity fragments",
};
