import { WorkExperience } from "@/lib/types";

/** Fallback when CMS content has not loaded yet */
export const defaultWorkExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Freelancer — Full-Stack & Product Development",
    company: "Independent / Freelance",
    role: "Freelancer — Full-Stack Developer",
    period: "2022 — Present",
    location: "Remote",
    employmentType: "freelance",
    desc: "End-to-end delivery of web, AI, and blockchain products for clients.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    featured: true,
    overview:
      "Independent engineering across AI platforms, blockchain systems, marketing UIs, games, and e-commerce backends.",
    responsibilities: [
      "AI autism early-detection platform (Next.js, FastAPI, OpenCV, Keras, XAI questionnaire)",
      "Blockchain voting system — 10,000+ votes with zero reported integrity issues",
    ],
    technologies: ["Next.js", "FastAPI", "Python", "React", "Blockchain"],
  },
  {
    id: 2,
    title: "Full-Stack Payment System — Al Ankabot",
    company: "Al Ankabot",
    role: "Lead Full-Stack Developer",
    period: "Oct 2024 — Jan 2026",
    employmentType: "full-time",
    desc: "Secure transaction platform with web and desktop clients.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    featured: true,
  },
];
