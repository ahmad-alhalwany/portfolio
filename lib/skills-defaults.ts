import { SkillsSection } from "@/lib/types";

export const defaultSkillsSection: SkillsSection = {
  title: "Skills & technologies I work with",
  description:
    "AI/ML and LLM systems first — then the backend, frontend, and DevOps stack I use to ship production AI applications.",
  categories: [
    {
      id: 1,
      title: "AI / ML",
      skills: [
        { id: 1, name: "Machine Learning", level: "Mid" },
        { id: 2, name: "Deep Learning", level: "Mid" },
        { id: 3, name: "Computer Vision (OpenCV, Keras, CNNs, MobileNetV3)", level: "Mid" },
        { id: 4, name: "Grad-CAM (Explainable AI)", level: "Mid" },
        { id: 5, name: "NLP", level: "Mid" },
      ],
    },
    {
      id: 2,
      title: "Generative AI / LLMs",
      skills: [
        { id: 1, name: "LLM integration", level: "Mid" },
        { id: 2, name: "RAG (retrieval-augmented generation)", level: "Mid" },
        { id: 3, name: "Embeddings", level: "Mid" },
        { id: 4, name: "Prompt engineering", level: "Mid" },
        { id: 5, name: "Multi-provider LLM orchestration", level: "Mid" },
      ],
    },
    {
      id: 3,
      title: "Backend",
      skills: [
        { id: 1, name: "Python", level: "Senior" },
        { id: 2, name: "FastAPI", level: "Mid" },
        { id: 3, name: "Django", level: "Mid" },
        { id: 4, name: "REST APIs", level: "Senior" },
        { id: 5, name: "PostgreSQL", level: "Mid" },
      ],
    },
    {
      id: 4,
      title: "Frontend",
      skills: [
        { id: 1, name: "Next.js", level: "Senior" },
        { id: 2, name: "React", level: "Senior" },
        { id: 3, name: "TypeScript", level: "Mid" },
        { id: 4, name: "Tailwind CSS", level: "Senior" },
      ],
    },
    {
      id: 5,
      title: "DevOps",
      skills: [
        { id: 1, name: "Docker", level: "Mid" },
        { id: 2, name: "Linux", level: "Mid" },
        { id: 3, name: "Git", level: "Senior" },
        { id: 4, name: "CI/CD", level: "Mid" },
      ],
    },
    {
      id: 6,
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
