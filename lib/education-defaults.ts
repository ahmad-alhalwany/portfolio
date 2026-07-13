import { EducationItem } from "@/lib/types";

/** Fallback when CMS content has not loaded yet */
export const defaultEducationItems: EducationItem[] = [
  {
    id: 1,
    institution: "Tishreen University",
    title: "Information Technology & AI Engineering (Bachelor)",
    desc: "",
    className: "md:col-span-2",
    thumbnail: "/education/Tishreen.jpeg",
    coverImage: "/education/Tishreen.jpeg",
    kind: "degree",
    featured: true,
    timeline: [
      "I started studying at university in 2017.",
      "I graduated in 2023 with a degree in Information Technology and Artificial Intelligence.",
      "ZAB equivalence certificate available on request for German employers.",
    ],
    projects: [
      "Built an NLP based app to classify people's reactions to some emotional categories.",
      "Built a self-driving car using Unity and Genetic Algorithm to study the effect of deep neural networks over the randomness of genetic algorithms.",
      "Data Mining project to classify favorite songs.",
    ],
  },
];
