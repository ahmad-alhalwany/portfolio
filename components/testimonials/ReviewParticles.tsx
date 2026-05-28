"use client";

import { useCallback, useEffect, useRef } from "react";
import { ReviewPublic } from "@/lib/types";

type Particle = {
  review: ReviewPublic;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  entering: boolean;
  enterProgress: number;
  pulse: number;
};

type ReviewParticlesProps = {
  reviews: ReviewPublic[];
  newReviewIds: string[];
  onSelect: (review: ReviewPublic) => void;
};

const ATTRACT_RADIUS = 220;
const ATTRACT_STRENGTH = 0.045;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ratingColor(rating: number) {
  const colors = ["#94a3b8", "#fb923c", "#facc15", "#38bdf8", "#c084fc", "#f472b6"];
  return colors[rating] ?? colors[4];
}

function spawnParticle(review: ReviewPublic, w: number, h: number, entering = false): Particle {
  return {
    review,
    x: entering ? w * (0.2 + Math.random() * 0.6) : Math.random() * w,
    y: entering ? -40 : Math.random() * h,
    vx: (Math.random() - 0.5) * 1.2,
    vy: entering ? 2.5 + Math.random() * 1.5 : (Math.random() - 0.5) * 1.2,
    radius: 22 + review.rating * 2,
    entering,
    enterProgress: entering ? 0 : 1,
    pulse: Math.random() * Math.PI * 2,
  };
}

export function ReviewParticles({ reviews, newReviewIds, onSelect }: ReviewParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number>();
  const reviewsRef = useRef(reviews);
  const newIdsRef = useRef(new Set(newReviewIds));

  reviewsRef.current = reviews;
  newIdsRef.current = new Set(newReviewIds);

  const syncParticles = useCallback((w: number, h: number) => {
    const existing = new Map(particlesRef.current.map((p) => [p.review.id, p]));
    const next: Particle[] = [];

    for (const review of reviewsRef.current) {
      const found = existing.get(review.id);
      if (found) {
        next.push(found);
      } else {
        next.push(spawnParticle(review, w, h, newIdsRef.current.has(review.id)));
      }
    }
    particlesRef.current = next;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (const p of particlesRef.current) {
        const dx = x - p.x;
        const dy = y - p.y;
        if (dx * dx + dy * dy < (p.radius + 8) ** 2) {
          onSelect(p.review);
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const tick = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      if (particlesRef.current.length !== reviewsRef.current.length) {
        syncParticles(w, h);
      }

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        if (p.entering) {
          p.enterProgress = Math.min(1, p.enterProgress + 0.02);
          p.y += p.vy * (1.2 - p.enterProgress * 0.4);
          if (p.enterProgress >= 1) p.entering = false;
        }

        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < ATTRACT_RADIUS) {
            const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
            p.vx += (dx / dist) * force * 60;
            p.vy += (dy / dist) * force * 60;
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx *= -0.6;
        }
        if (p.x > w - p.radius) {
          p.x = w - p.radius;
          p.vx *= -0.6;
        }
        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy *= -0.6;
        }
        if (p.y > h - p.radius) {
          p.y = h - p.radius;
          p.vy *= -0.6;
        }

        p.pulse += 0.04;
        const glow = 0.5 + Math.sin(p.pulse) * 0.25;
        const color = ratingColor(p.review.rating);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.2);
        gradient.addColorStop(0, `${color}55`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();
        ctx.strokeStyle = `${color}${Math.floor(glow * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = `bold ${Math.floor(p.radius * 0.55)}px system-ui`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials(p.review.name), p.x, p.y);

        ctx.fillStyle = "rgba(226,232,240,0.9)";
        ctx.font = "10px system-ui";
        ctx.fillText(p.review.name.split(" ")[0], p.x, p.y + p.radius + 12);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onSelect, syncParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!parent) return;
    syncParticles(parent.clientWidth, parent.clientHeight);
  }, [reviews, newReviewIds, syncParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 cursor-crosshair"
      aria-label="Interactive review particles. Click a particle to read the review."
    />
  );
}
