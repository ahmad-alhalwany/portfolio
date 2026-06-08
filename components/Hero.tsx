import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { HeroSection } from "@/lib/types";
import { CVShowcase } from "./resume/CVShowcase";
import { HeroIntro } from "./hero/HeroIntro";
import { RESUME_PATH_EN } from "@/lib/resume";

type HeroProps = {
  hero: HeroSection;
};

const Hero = ({ hero }: HeroProps) => {
  return (
    <div className="scroll-mt-24 pb-20 pt-20 md:pt-24" id="home">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-40 h-[80vh] w-[50vw]" fill="blue" />
        <Spotlight className="top-24 left-32 h-[80vh] w-[50vw]" fill="cyan" />
      </div>
      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-page-dots">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-page [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="relative z-10 my-16 flex justify-center md:my-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-14 px-2 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-6">
          <HeroIntro hero={hero} />
          <CVShowcase
            resumeUrl={hero.resumeUrl ?? RESUME_PATH_EN}
            resumeUrlDe={hero.resumeUrlDe}
            label={hero.resumeLabel ?? "Download CV (EN)"}
            labelDe={hero.resumeLabelDe ?? "Lebenslauf (DE)"}
            tagline={hero.resumeTagline ?? "Lebenslauf · encrypted"}
            className="lg:shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
