import { EducationItem } from "@/lib/types";

/** Fallback when CMS content has not loaded yet */
export const defaultEducationItems: EducationItem[] = [
  {
    id: 1,
    institution: "Tishreen University",
    title: "Information Technology Engineer | Artificial Intelligence Engineer",
    desc: "",
    className: "md:col-span-2",
    thumbnail: "/education/Tishreen.jpeg",
    coverImage: "/education/Tishreen.jpeg",
    kind: "degree",
    featured: true,
    timeline: [
      "I started studying at university in 2017.",
      "I graduated with an average of 71.43% in 2023.",
    ],
    projects: [
      "Built an NLP based app to classify people's reactions to some emotional categories.",
      "Built a self-driving car using Unity and Genetic Algorithm to study the effect of deep neural networks over the randomness of genetic algorithms.",
      "Data Mining project to classify favorite songs.",
    ],
  },
];
