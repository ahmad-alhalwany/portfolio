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
    <div className="w-full h-full py-10 sm:py-20">
      <div className="px-4 mb-6 flex flex-col items-center">
        <HoverBorderGradientDemo />
        <h2 className="text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mt-4">
          {data.title}
        </h2>
      </div>
      <Carousel items={cards} />
      <div className="flex justify-between px-4 mt-8">
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
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 px-4">
        {data.gitHubLink && (
          <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-neutral-200 dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
            <Link href={data.gitHubLink}>
              <p className="flex flex-col items-center">
                <Image src="/git.svg" alt={data.title} width={20} height={20} />
              </p>
            </Link>
          </div>
        )}
        {data.link && (
          <Link href={data.link}>
            <p className="flex items-center text-sm sm:text-base lg:text-xl text-purple transition duration-300 transform hover:translate-x-2 hover:text-purple-600">
              Check Live Site
              <FaLocationArrow className="ml-2 sm:ml-3 transition duration-300 transform hover:translate-x-2" color="#CBACF9" />
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}