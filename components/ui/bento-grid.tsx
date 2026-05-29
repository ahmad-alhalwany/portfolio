"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./backgroundGradientAnimation";
import dynamic from "next/dynamic";
import MagicButtons from "./Magic-buttons";
import { ConfettiLottie } from "./ConfettiLottie";
import { OptimizedImage } from "./optimized-image";
import { SIZES } from "@/lib/image-config";
import { useLocale } from "@/components/i18n/LocaleProvider";

const GlobeDemo = dynamic(() => import("./GridGlobe").then((m) => m.GlobeDemo), {
  ssr: false,
});

const STACK_LEFT = ["Python", "Next.js", "TypeScript"];
const STACK_RIGHT = ["Django", "PostgreSQL", "Tailwind"];

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-6 md:grid-row-7 lg:grid-cols-5 lg:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    const text = "ahmad.s.alhalwany@gmail.com";
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: id * 0.06 }}
      className={cn("group/bento relative", className)}
    >
      <div
        className={cn(
          "bento-surface relative flex h-full min-h-[10rem] flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.12), transparent 40%)",
          }}
        />

        <div className={cn("relative h-full", id === 6 && "flex justify-center")}>
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {img ? (
              <>
                <OptimizedImage
                  src={img}
                  alt=""
                  fill
                  sizes={SIZES.blogCard}
                  className={cn(
                    imgClassName,
                    "object-cover object-center transition duration-500 group-hover/bento:scale-[1.03]",
                    id === 1 && "dark:opacity-95"
                  )}
                />
                {(id === 1 || id === 4 || id === 5) && (
                  <div className="absolute inset-0 bento-img-overlay" />
                )}
              </>
            ) : null}
          </div>

          <div
            className={cn(
              "absolute right-0 -bottom-5 transition duration-500 group-hover/bento:translate-y-[-2px]",
              id === 5 && "w-full opacity-90"
            )}
          >
            {spareImg ? (
              <div className="relative h-full min-h-[8rem] w-full">
                <OptimizedImage
                  src={spareImg}
                  alt=""
                  fill
                  sizes={SIZES.blogCard}
                  className="object-cover object-center opacity-90 dark:opacity-100"
                />
              </div>
            ) : null}
          </div>

          {id === 6 && (
            <BackgroundGradientAnimation>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" />
            </BackgroundGradientAnimation>
          )}

          <div
            className={cn(
              titleClassName,
              "relative z-10 flex min-h-40 flex-col px-5 py-6 transition duration-300 md:h-full lg:px-8 lg:py-8",
              "group-hover/bento:translate-x-1"
            )}
          >
            {description ? (
              <p className="bento-kicker z-10 max-w-md">{description}</p>
            ) : null}

            <div
              className={cn(
                "bento-title z-10 mt-2 max-w-lg",
                description ? "mt-3" : "mt-0"
              )}
            >
              {title}
            </div>

            {id === 2 && (
              <div className="absolute inset-0 flex items-center justify-end pe-2 opacity-80 dark:opacity-90">
                <GlobeDemo />
              </div>
            )}

            {id === 3 && (
              <div className="absolute -right-1 bottom-6 flex gap-1.5 lg:-right-2 lg:gap-3">
                <StackColumn items={STACK_LEFT} delay={0} />
                <StackColumn items={STACK_RIGHT} delay={0.12} />
              </div>
            )}

            {id === 6 && (
              <div className="relative z-20 mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 rounded-xl border border-purple/30 bg-page-card-solid px-4 py-2.5 text-sm font-semibold text-page-fg shadow-sm transition hover:border-purple/50 hover:bg-purple/10 dark:border-white/20 dark:bg-black/40 dark:text-white dark:hover:bg-purple/20"
                >
                  {t("bento.contactRoles")}
                  <FaArrowRight className="h-3 w-3 transition group-hover/btn:translate-x-0.5" />
                </Link>
                <MagicButtons
                  title={copied ? "Copied!" : "Copy email"}
                  icon={<IoCopyOutline />}
                  postion="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-page-card-solid !text-page-fg !text-xs dark:!bg-[#161A31]/90 dark:!text-white"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute -bottom-4 right-0",
                    copied ? "opacity-100" : "opacity-0"
                  )}
                >
                  <ConfettiLottie play={copied} height={160} width={280} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function StackColumn({ items, delay }: { items: string[]; delay: number }) {
  return (
    <motion.div
      className="flex flex-col gap-2 lg:gap-3"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {items.map((item, i) => (
        <motion.span
          key={item}
          whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.6)" }}
          className={cn("bento-stack-pill", i === 1 && "lg:opacity-100 opacity-90")}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
