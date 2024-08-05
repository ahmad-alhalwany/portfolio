"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import MagicButtons from "./ui/Magic-buttons";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export function AppleCardsCarousel({ data, onPrevProject, onNextProject }: any) {
  const cards = data.cards.map((card: any, index: number) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {data.title}
      </h2>
      <Carousel items={cards} />
      <div className="flex justify-between">
        <MagicButtons
          icon={<BsArrowLeft />}
          postion="left"
          title="prev project"
          handleClick={onPrevProject}
        />
        <MagicButtons
          icon={<BsArrowRight />}
          postion="right"
          title="next project"
          handleClick={onNextProject}
        />
      </div>
    </div>
  );
}

export const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <Image
              src="/project/plaze1.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};