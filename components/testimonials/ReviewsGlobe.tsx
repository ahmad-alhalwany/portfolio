"use client";

import dynamic from "next/dynamic";
import { ReviewPublic } from "@/lib/types";

const World = dynamic(() => import("@/components/ui/Globe").then((m) => m.World), {
  ssr: false,
});

const RATING_COLORS = ["#64748b", "#f97316", "#eab308", "#22d3ee", "#a78bfa", "#f472b6"];

function buildArcs(reviews: ReviewPublic[]) {
  const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#3b82f6"];
  if (reviews.length < 2) {
    if (reviews.length === 1) {
      const r = reviews[0];
      return [
        {
          order: 1,
          startLat: r.lat,
          startLng: r.lng,
          endLat: r.lat + 8,
          endLng: r.lng + 12,
          arcAlt: 0.15,
          color: RATING_COLORS[r.rating] ?? colors[0],
        },
      ];
    }
    return [];
  }

  return reviews.map((review, index) => {
    const next = reviews[(index + 1) % reviews.length];
    return {
      order: (index % 3) + 1,
      startLat: review.lat,
      startLng: review.lng,
      endLat: next.lat,
      endLng: next.lng,
      arcAlt: 0.12 + (review.rating / 5) * 0.25,
      color: RATING_COLORS[review.rating] ?? colors[index % colors.length],
    };
  });
}

export function ReviewsGlobe({ reviews }: { reviews: ReviewPublic[] }) {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#0a1628",
    showAtmosphere: true,
    atmosphereColor: "#a78bfa",
    atmosphereAltitude: 0.18,
    emissive: "#1e1b4b",
    emissiveIntensity: 0.25,
    shininess: 0.95,
    polygonColor: "rgba(139, 92, 246, 0.35)",
    ambientLight: "#c4b5fd",
    directionalLeftLight: "#e0e7ff",
    directionalTopLight: "#ffffff",
    pointLight: "#c084fc",
    arcTime: 1200,
    arcLength: 0.85,
    rings: 2,
    maxRings: 4,
    initialPosition: reviews[0]
      ? { lat: reviews[0].lat, lng: reviews[0].lng }
      : { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.35,
  };

  const arcs = buildArcs(reviews);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90">
      <div className="h-[min(520px,70vw)] w-[min(520px,90vw)] max-w-full">
        <World globeConfig={globeConfig} data={arcs} />
      </div>
    </div>
  );
}
