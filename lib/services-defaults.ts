import { ServicesSection } from "@/lib/types";

export const defaultServicesSection: ServicesSection = {
  title: "What I deliver for product teams",
  description:
    "AI Application Development — ML models, LLM/RAG systems, and the full-stack apps around them. From first prototype to production, with clear communication and code your team can maintain.",
  services: [
    {
      id: 1,
      title: "AI Application Development",
      tagline: "ML · LLM/RAG · Computer Vision",
      description:
        "Production AI products end-to-end — model training and serving, RAG assistants with retrieval and citations, explainable computer vision, and LLM integrations grounded in real data.",
      image: "/b4.svg",
      highlights: [
        "Machine learning & deep learning pipelines",
        "LLM/RAG systems — embeddings, retrieval, prompt engineering",
        "Computer vision — OpenCV, Keras, Grad-CAM explainability",
        "Anti-hallucination guardrails & production deployment",
      ],
    },
    {
      id: 2,
      title: "Full-Stack Product Delivery",
      tagline: "Next.js, FastAPI & PostgreSQL",
      description:
        "The full-stack layer around AI — typed frontends, Python APIs, authentication, dashboards, and deployments that stay fast and maintainable after launch.",
      image: "/app.svg",
      highlights: [
        "Next.js & React applications",
        "Python APIs (FastAPI / Django)",
        "PostgreSQL, auth & third-party integrations",
        "Production performance & reliability",
      ],
    },
    {
      id: 3,
      title: "UI/UX & Frontend Excellence",
      tagline: "Interfaces people enjoy using",
      description:
        "Modern, accessible interfaces with responsive layouts, motion, and design patterns that scale as your product and team grow — including bilingual EN/DE and RTL/LTR.",
      image: "/cloud.svg",
      highlights: [
        "Design systems & reusable components",
        "Mobile-first, responsive layouts",
        "Accessibility & interaction polish",
        "Animation & micro-interactions",
      ],
    },
  ],
};
