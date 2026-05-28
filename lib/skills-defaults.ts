import { SkillsSection } from "@/lib/types";

export const defaultSkillsSection: SkillsSection = {
  title: "Skills & technologies I work with",
  description:
    "Programming languages, web and mobile stack, AI/ML foundations, tooling, and the soft skills that make delivery reliable in real teams.",
  categories: [
    {
      id: 1,
      title: "Programming Languages",
      skills: [
        { id: 1, name: "Python", level: "Senior" },
        { id: 2, name: "JavaScript", level: "Senior" },
        { id: 3, name: "TypeScript", level: "Mid" },
        { id: 4, name: "SQL", level: "Mid" },
        { id: 5, name: "PHP", level: "Mid" },
      ],
    },
    {
      id: 2,
      title: "Web & App Development",
      skills: [
        { id: 1, name: "React", level: "Senior" },
        { id: 2, name: "Next.js", level: "Senior" },
        { id: 3, name: "Tailwind CSS", level: "Senior" },
        { id: 4, name: "React Native", level: "Mid" },
        { id: 5, name: "HTML5", level: "Senior" },
        { id: 6, name: "CSS3", level: "Senior" },
        { id: 7, name: "Bootstrap", level: "Mid" },
        { id: 8, name: "Django", level: "Mid" },
        { id: 9, name: "Node.js", level: "Mid" },
        { id: 10, name: "Three.js", level: "Mid" },
      ],
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      skills: [
        { id: 1, name: "Deep Learning", level: "Mid" },
        { id: 2, name: "Machine Learning", level: "Mid" },
        { id: 3, name: "NLP", level: "Mid" },
        { id: 4, name: "Data Mining", level: "Mid" },
      ],
    },
    {
      id: 4,
      title: "Tools & Infrastructure",
      skills: [
        { id: 1, name: "Microsoft Office", level: "Mid" },
        { id: 2, name: "Git", level: "Senior" },
        { id: 3, name: "Docker", level: "Mid" },
        { id: 4, name: "Linux", level: "Mid" },
        { id: 5, name: "PostgreSQL", level: "Mid" },
        { id: 6, name: "SQL Server", level: "Mid" },
        { id: 7, name: "CI/CD", level: "Mid" },
      ],
    },
    {
      id: 5,
      title: "Soft Skills",
      skills: [
        { id: 1, name: "Problem solving", level: "Senior", display: "chip" },
        { id: 2, name: "Teamwork", level: "Senior", display: "chip" },
        { id: 3, name: "Adaptability", level: "Senior", display: "chip" },
        { id: 4, name: "Project management", level: "Mid", display: "chip" },
        { id: 5, name: "Analytical thinking", level: "Senior", display: "chip" },
        { id: 6, name: "Ownership & self-reliance", level: "Senior", display: "chip" },
      ],
    },
  ],
};
