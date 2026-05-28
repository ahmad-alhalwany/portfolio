import { EmploymentType, WorkExperience } from "@/lib/types";

export function parseWorkTitle(title: string): { company: string; role: string } {
  const dash = title.lastIndexOf(" - ");
  if (dash > 0) {
    return {
      role: title.slice(0, dash).trim(),
      company: title.slice(dash + 3).trim(),
    };
  }
  return { role: title, company: "" };
}

export function getCompany(item: WorkExperience): string {
  return item.company || parseWorkTitle(item.title).company || "Experience";
}

export function getRole(item: WorkExperience): string {
  return item.role || parseWorkTitle(item.title).role || item.title;
}

export function inferEmploymentType(item: WorkExperience): EmploymentType {
  if (item.employmentType) return item.employmentType;
  const t = item.title.toLowerCase();
  if (t.includes("intern")) return "internship";
  if (t.includes("freelance")) return "freelance";
  if (t.includes("contract")) return "contract";
  return "full-time";
}

export function getFeaturedWork(items: WorkExperience[], limit = 2): WorkExperience[] {
  const flagged = items.filter((i) => i.featured);
  if (flagged.length > 0) return flagged.slice(0, limit);
  return items.slice(0, limit);
}
