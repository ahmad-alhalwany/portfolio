"use client";

import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
};

const sizeMap = {
  sm: "text-sm gap-0.5",
  md: "text-xl gap-1",
  lg: "text-3xl gap-1.5",
};

export function StarRating({ value, onChange, size = "md", readOnly = false }: StarRatingProps) {
  return (
    <div className={cn("inline-flex items-center", sizeMap[size])} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={cn(
            "transition-transform focus:outline-none",
            !readOnly && "hover:scale-110 active:scale-95",
            readOnly && "cursor-default"
          )}
        >
          <FaStar
            className={cn(
              star <= value
                ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                : "text-slate-600"
            )}
          />
        </button>
      ))}
    {/* end stars */}
    </div>
  );
}
