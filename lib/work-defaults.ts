import { WorkExperience } from "@/lib/types";

/** Fallback when CMS content has not loaded yet */
export const defaultWorkExperience: WorkExperience[] = [
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
  {
    id: 3,
    title: "Frontend Developer — LIT-Co",
    company: "LIT-Co",
    role: "Frontend Developer",
    period: "Jun 2023 — Aug 2024",
    employmentType: "full-time",
    desc: "Plaze e-commerce platform and WordPress ecosystem.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
    featured: true,
  },
  {
    id: 1,
    title: "Freelancer — Web & Backend (Fixed-Scope Contracts)",
    company: "Independent / Freelance",
    role: "Freelance Full-Stack Developer",
    period: "2022 — Apr 2023",
    location: "Remote · Syria",
    employmentType: "freelance",
    desc: "Short-term client contracts — completed before LIT-Co full-time.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    featured: false,
  },
];
