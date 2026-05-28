"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaCloud, FaCode, FaPaintBrush } from "react-icons/fa";
import { ServicesSection, ServiceItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const SERVICE_VISUALS: Record<
  number,
  {
    Icon: React.ComponentType<{ className?: string }>;
    accent: string;
    glow: string;
    border: string;
    techIcons: string[];
  }
> = {
  1: {
    Icon: FaCode,
    accent: "text-purple",
    glow: "from-purple/30 via-violet-500/10",
    border: "border-purple/40",
    techIcons: ["/next.svg", "/tail.svg", "/ts.svg", "/re.svg"],
  },
  2: {
    Icon: FaPaintBrush,
    accent: "text-cyan-400",
    glow: "from-cyan-500/25 via-sky-500/10",
    border: "border-cyan-500/35",
    techIcons: ["/framer-motion.svg", "/app.svg", "/three.svg"],
  },
  3: {
    Icon: FaCloud,
    accent: "text-sky-400",
    glow: "from-sky-500/25 via-blue-500/10",
    border: "border-sky-500/35",
    techIcons: ["/cloudName.svg", "/dockerName.svg", "/hostName.svg"],
  },
};

function getVisuals(service: ServiceItem) {
  return SERVICE_VISUALS[service.id] ?? SERVICE_VISUALS[1];
}

const Services = ({ servicesSection }: { servicesSection: ServicesSection }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const services = servicesSection.services;
  const activeService = services[activeIndex] ?? services[0];

  if (!activeService) return null;

  const visual = getVisuals(activeService);

  return (
    <section
      id="services"
      className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-slate-950/80 p-6 shadow-[0_0_80px_-24px_rgba(139,92,246,0.4)] backdrop-blur-sm lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(139,92,246,0.14),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(34,211,238,0.08),transparent)]" />
      </div>

      <div className="relative z-10 mb-10 text-center lg:mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-purple">
          Services
        </span>
        <h2 className="mt-5 bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {servicesSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {servicesSection.description}
        </p>
      </div>

      <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_1.05fr] xl:items-stretch">
        {/* Service selector */}
        <div className="flex flex-col gap-3">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const v = getVisuals(service);
            const Icon = v.Icon;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition duration-300",
                  isActive
                    ? cn("border-white/10 bg-slate-900/80 shadow-lg", v.border)
                    : "border-white/[0.04] bg-slate-900/30 hover:border-white/10 hover:bg-slate-900/50"
                )}
              >
                {isActive ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
                      v.glow
                    )}
                  />
                ) : null}
                <div className="relative flex gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 transition",
                      isActive && v.border
                    )}
                  >
                    <Icon className={cn("h-5 w-5", v.accent)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{service.title}</p>
                    {service.tagline ? (
                      <p className={cn("mt-0.5 text-sm", isActive ? v.accent : "text-slate-500")}>
                        {service.tagline}
                      </p>
                    ) : null}
                    {isActive ? (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
                        {service.description}
                      </p>
                    ) : null}
                  </div>
                  <span
                    className={cn(
                      "shrink-0 self-start rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums",
                      isActive ? "bg-white/10 text-white" : "text-slate-600"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            );
          })}

          <AnimatePresence mode="wait">
            {(activeService.highlights?.length ?? 0) > 0 && (
              <motion.ul
                key={activeService.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-1 space-y-2 rounded-2xl border border-white/[0.06] bg-slate-900/40 p-5"
              >
                {activeService.highlights!.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm text-slate-300">
                    <FaCheck className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", visual.accent)} />
                    <span>{line}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Visual panel */}
        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/50 shadow-xl sm:min-h-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-90",
                  visual.glow
                )}
              />
              {/* Blurred backdrop from hero image */}
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-30 blur-2xl">
                <Image
                  src={activeService.image}
                  alt=""
                  width={400}
                  height={300}
                  className="max-h-full max-w-full object-contain"
                  unoptimized={activeService.image.endsWith(".svg")}
                />
              </div>

              <div className="relative flex h-full flex-col">
                <div className="flex flex-1 items-center justify-center p-8 pt-10 sm:p-12">
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-md"
                  >
                    <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-xl" />
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      width={520}
                      height={400}
                      className="relative mx-auto h-auto w-full max-h-[280px] object-contain drop-shadow-2xl sm:max-h-[320px]"
                      unoptimized={activeService.image.endsWith(".svg")}
                      priority={activeIndex === 0}
                    />
                  </motion.div>
                </div>

                <div className="border-t border-white/[0.06] bg-slate-950/50 px-6 py-4 backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {visual.techIcons.map((src) => (
                        <span
                          key={src}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-900/80 p-1.5"
                        >
                          <Image
                            src={src}
                            alt=""
                            width={24}
                            height={24}
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      {activeIndex + 1} / {services.length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Services;
