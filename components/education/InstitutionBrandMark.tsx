"use client";

import { InstitutionBrand } from "@/lib/institution-brand";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type Props = {
  brand: InstitutionBrand;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE = {
  sm: { box: "h-10 w-10 rounded-xl p-1.5", icon: "h-5 w-5", img: 32 },
  md: { box: "h-14 w-14 rounded-2xl p-2", icon: "h-7 w-7", img: 48 },
  lg: { box: "h-16 w-16 rounded-2xl p-2.5 md:h-[4.5rem] md:w-[4.5rem]", icon: "h-8 w-8", img: 56 },
};

export function InstitutionBrandMark({ brand, size = "md", className }: Props) {
  const s = SIZE[size];
  const Icon = brand.Icon;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-white shadow-lg ring-1 ring-black/20",
        s.box,
        className
      )}
      title={brand.displayName}
    >
      {brand.logoSrc ? (
        <OptimizedImage
          src={brand.logoSrc}
          alt={brand.displayName}
          width={s.img}
          height={s.img}
          sizes={SIZES.icon}
          className="h-full w-full object-contain"
        />
      ) : Icon ? (
        <Icon className={cn(s.icon, brand.iconClassName)} aria-hidden />
      ) : (
        <span className="text-xs font-bold text-slate-600">{brand.displayName.slice(0, 2)}</span>
      )}
    </div>
  );
}
