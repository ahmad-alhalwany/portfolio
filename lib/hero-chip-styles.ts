/** Per-stack chip colors — harmonious in light & dark */
export const HERO_CHIP_STYLES: Record<string, string> = {
  Python:
    "border-[#3776AB]/35 bg-[#3776AB]/10 text-[#1e4a6f] dark:border-[#FFD43B]/25 dark:bg-[#3776AB]/20 dark:text-[#7dd3fc]",
  "Next.js":
    "border-page bg-page-card-solid text-page-fg shadow-sm dark:border-white/25 dark:bg-white/10 dark:text-white",
  TypeScript:
    "border-[#3178C6]/35 bg-[#3178C6]/10 text-[#1a4a7a] dark:border-[#3178C6]/40 dark:bg-[#3178C6]/15 dark:text-[#93c5fd]",
  Django:
    "border-[#092E20]/25 bg-[#0C4B33]/10 text-[#0C4B33] dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300",
};

export const DEFAULT_CHIP_CLASS =
  "border-purple/30 bg-purple/10 text-purple dark:border-purple/35 dark:bg-purple/15 dark:text-purple-soft";

export function getHeroChipClass(name: string): string {
  return HERO_CHIP_STYLES[name] ?? DEFAULT_CHIP_CLASS;
}
