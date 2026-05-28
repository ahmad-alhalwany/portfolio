import { SpokenLanguage, SpokenLanguageLevel } from "@/lib/types";

export const CEFR_LEVELS: { value: SpokenLanguageLevel; label: string }[] = [
  { value: "native", label: "Native / mother tongue" },
  { value: "c2", label: "C2 — Mastery" },
  { value: "c1", label: "C1 — Advanced" },
  { value: "b2", label: "B2 — Upper intermediate" },
  { value: "b1", label: "B1 — Intermediate" },
  { value: "a2", label: "A2 — Elementary" },
  { value: "a1", label: "A1 — Beginner" },
];

export const CEFR_STEPS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const LEVEL_INDEX: Record<SpokenLanguageLevel, number> = {
  a1: 0,
  a2: 1,
  b1: 2,
  b2: 3,
  c1: 4,
  c2: 5,
  native: 6,
};

/** Suggested progress % when level changes in admin */
export function suggestedProgress(level: SpokenLanguageLevel): number {
  switch (level) {
    case "native":
      return 100;
    case "c2":
      return 95;
    case "c1":
      return 88;
    case "b2":
      return 72;
    case "b1":
      return 58;
    case "a2":
      return 42;
    case "a1":
      return 18;
    default:
      return 50;
  }
}

/** One-line summary for About meta chip */
export function languagesMetaSummary(languages: SpokenLanguage[]): string {
  return languages
    .map((lang) => {
      const code = lang.id.toUpperCase().slice(0, 2);
      if (lang.level === "native") return `${code} native`;
      const level = lang.level.toUpperCase();
      if (lang.learning) return `${code} ${level} → next`;
      return `${code} ${level}`;
    })
    .join(" · ");
}

export function newLanguage(partial?: Partial<SpokenLanguage>): SpokenLanguage {
  const level: SpokenLanguageLevel = partial?.level ?? "a1";
  return {
    id: partial?.id ?? `lang-${Date.now()}`,
    name: partial?.name ?? "New language",
    nativeLabel: partial?.nativeLabel ?? "",
    levelLabel: partial?.levelLabel ?? "A1 — Beginner",
    level,
    progress: partial?.progress ?? suggestedProgress(level),
    progressLabel: partial?.progressLabel ?? "Proficiency",
    note: partial?.note ?? "",
    flag: partial?.flag ?? "🌐",
    learning: partial?.learning ?? false,
  };
}
