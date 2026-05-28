import { LanguagesSection } from "@/lib/types";

export const defaultLanguagesSection: LanguagesSection = {
  title: "Languages I communicate in",
  description:
    "Clear communication across teams and markets — from my native Arabic to professional English and German I am actively improving.",
  languages: [
    {
      id: "ar",
      name: "Arabic",
      nativeLabel: "العربية",
      levelLabel: "Native · mother tongue",
      level: "native",
      progress: 100,
      flag: "🇸🇾",
      note: "Fluent in professional and technical communication.",
      learning: false,
    },
    {
      id: "en",
      name: "English",
      nativeLabel: "English",
      levelLabel: "B2 — Upper intermediate",
      level: "b2",
      progress: 72,
      progressLabel: "Professional proficiency",
      flag: "🇬🇧",
      note: "Comfortable in meetings, documentation, and day-to-day dev collaboration.",
      learning: false,
    },
    {
      id: "de",
      name: "German",
      nativeLabel: "Deutsch",
      levelLabel: "A2 · studying for B1",
      level: "a2",
      progress: 48,
      progressLabel: "Progress toward B1",
      flag: "🇩🇪",
      note: "VHS A2 course + self-study — working toward B1 for work and daily life in Germany.",
      learning: true,
    },
  ],
};
