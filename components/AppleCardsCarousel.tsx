"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import MagicButtons from "./ui/Magic-buttons";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa";
import { HoverBorderGradientDemo } from "./HoverBorderGradient";

export function AppleCardsCarousel({ data, onPrevProject, onNextProject }: any) {
  const cards = data.cards.map((card: any, index: number) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <div>
        <HoverBorderGradientDemo />
      </div>
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
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        {data.gitHubLink && (
          <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
              <Link href={data.gitHubLink}>
                <p className="flex flex-col items-center">
                  <Image src="/git.svg" alt={data.title} width={20} height={20} />
                </p>
              </Link>
          </div>
        )}
        {data.link && (
          <Link href={data.link}>
            <p className="flex items-center lg:text-xl md:text-xs text-sm text-purple transition duration-300 transform hover:translate-x-2 hover:text-purple-600">
              Check Live Site
              <FaLocationArrow className="ml-3 transition duration-300 transform hover:translate-x-2" color="#CBACF9" />
            </p>
          </Link>
        )}
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