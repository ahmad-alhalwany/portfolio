import type { IconType } from "react-icons";
import { FaUniversity } from "react-icons/fa";
import { SiCoursera, SiGoogle, SiIbm, SiMeta } from "react-icons/si";

export type InstitutionBrand = {
  /** Short label for the header chip */
  displayName: string;
  /** Official-style logo in /public/education */
  logoSrc?: string;
  /** Fallback vector mark when no raster logo exists */
  Icon?: IconType;
  iconClassName?: string;
};

type BrandRule = {
  match: (institution: string) => boolean;
  brand: InstitutionBrand;
};

const RULES: BrandRule[] = [
  {
    match: (s) => s.includes("google"),
    brand: { displayName: "Google", logoSrc: "/education/Google.png" },
  },
  {
    match: (s) => s.includes("meta") || s.includes("facebook"),
    brand: { displayName: "Meta", logoSrc: "/education/facebook_logo.jpeg" },
  },
  {
    match: (s) => s.includes("ibm"),
    brand: { displayName: "IBM", logoSrc: "/education/IBM.png" },
  },
  {
    match: (s) => s.includes("deeplearning") || s.includes("deep learning"),
    brand: { displayName: "DeepLearning.AI", logoSrc: "/education/DeepLearning.png" },
  },
  {
    match: (s) => s.includes("minnesota"),
    brand: { displayName: "University of Minnesota", logoSrc: "/education/UOM.png" },
  },
  {
    match: (s) => s.includes("stanford"),
    brand: {
      displayName: "Stanford Online",
      Icon: SiCoursera,
      iconClassName: "text-[#0056D2]",
    },
  },
  {
    match: (s) => s.includes("imperial"),
    brand: {
      displayName: "Imperial College London",
      Icon: FaUniversity,
      iconClassName: "text-sky-400",
    },
  },
  {
    match: (s) => s.includes("colorado"),
    brand: {
      displayName: "University of Colorado",
      Icon: FaUniversity,
      iconClassName: "text-amber-400/90",
    },
  },
  {
    match: (s) => s.includes("packt"),
    brand: {
      displayName: "Packt",
      Icon: SiCoursera,
      iconClassName: "text-[#0056D2]",
    },
  },
  {
    match: (s) => s.includes("tishreen"),
    brand: { displayName: "Tishreen University", logoSrc: "/education/Tishreen.jpeg" },
  },
];

const ICON_FALLBACKS: Record<string, InstitutionBrand> = {
  google: { displayName: "Google", Icon: SiGoogle, iconClassName: "text-[#4285F4]" },
  meta: { displayName: "Meta", Icon: SiMeta, iconClassName: "text-[#0081FB]" },
  ibm: { displayName: "IBM", Icon: SiIbm, iconClassName: "text-[#1F70C1]" },
};

export function resolveInstitutionBrand(institution?: string): InstitutionBrand {
  if (!institution?.trim()) {
    return {
      displayName: "Institution",
      Icon: FaUniversity,
      iconClassName: "text-slate-400",
    };
  }

  const lower = institution.toLowerCase();

  for (const { match, brand } of RULES) {
    if (match(lower)) return { ...brand };
  }

  for (const [key, brand] of Object.entries(ICON_FALLBACKS)) {
    if (lower.includes(key)) return { ...brand };
  }

  return {
    displayName: institution,
    Icon: FaUniversity,
    iconClassName: "text-slate-400",
  };
}

/** Prefer official brand art for certificate thumbnails in lists. */
export function certificateThumbnail(institution: string, verifyId: string): string {
  const brand = resolveInstitutionBrand(institution);
  return brand.logoSrc ?? `/certificates/${verifyId}.png`;
}
