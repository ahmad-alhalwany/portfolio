import { ServicesSection } from "@/lib/types";

export const defaultServicesSection: ServicesSection = {
  title: "What I build for product teams",
  description:
    "Full-stack engineering, thoughtful UI, and hands-on technical guidance — from first prototype to production, with clear communication and code your team can maintain.",
  services: [
    {
      id: 1,
      title: "Full-Stack Product Development",
      tagline: "Next.js, React & Python backends",
      description:
        "End-to-end web applications: typed frontends, APIs, authentication, dashboards, and deployments that stay fast and maintainable after launch.",
      image: "/b4.svg",
      highlights: [
        "Next.js & React applications",
        "Python APIs (FastAPI / Django)",
        "Databases, auth & third-party integrations",
        "Production performance & reliability",
      ],
    },
    {
      id: 2,
      title: "UI/UX & Frontend Excellence",
      tagline: "Interfaces people enjoy using",
      description:
        "Modern, accessible interfaces with responsive layouts, motion, and design patterns that scale as your product and team grow.",
      image: "/app.svg",
      highlights: [
        "Design systems & reusable components",
        "Mobile-first, responsive layouts",
        "Accessibility & interaction polish",
        "Animation & micro-interactions",
      ],
    },
    {
      id: 3,
      title: "Architecture & Technical Advisory",
      tagline: "Clarity before you scale",
      description:
        "Stack decisions, system design, and delivery plans — so you invest in the right foundations and ship without costly rework.",
      image: "/cloud.svg",
      highlights: [
        "Architecture & API design reviews",
        "Cloud, DevOps & CI/CD guidance",
        "Code quality & team mentoring",
        "AI / ML integration strategy",
      ],
    },
  ],
};
