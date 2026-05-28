"use client";

import dynamic from "next/dynamic";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { AboutSection, GridItem } from "@/lib/types";
import { gridItems as defaultGridItems } from "@/data/indxe";
import { defaultAboutSection } from "@/lib/about-defaults";

const AboutManifest = dynamic(() => import("./about/AboutManifest"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 h-48 animate-pulse rounded-3xl border border-page bg-page-card" />
  ),
});

const Grid = ({
  gridItems = defaultGridItems,
  aboutSection = defaultAboutSection,
}: {
  gridItems?: GridItem[];
  aboutSection?: AboutSection;
}) => {
  const about = { ...defaultAboutSection, ...aboutSection };

  return (
    <div id="about" className="scroll-mt-24">
      <AboutManifest section={about} />

      {about.bentoTitle ? (
        <div className="mx-auto mt-16 flex max-w-6xl items-center gap-4 px-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple/30 to-transparent" />
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.35em] text-page-muted">
            {about.bentoTitle}
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple/30 to-transparent" />
        </div>
      ) : null}

      <BentoGrid className="w-full px-2 pb-20 pt-6">
        {gridItems.map(
          ({
            id,
            title,
            description,
            className,
            img,
            imgClassName,
            titleClassName,
            spareImg,
          }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          )
        )}
      </BentoGrid>
    </div>
  );
};

export default Grid;
