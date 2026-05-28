"use client";

import dynamic from "next/dynamic";
import animationData from "@/data/confetti.json";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

type ConfettiLottieProps = {
  play: boolean;
  height?: number;
  width?: number;
};

export function ConfettiLottie({ play, height = 200, width = 400 }: ConfettiLottieProps) {
  return (
    <Lottie
      eventListeners={[]}
      options={lottieOptions}
      height={height}
      width={width}
      isStopped={!play}
      isPaused={!play}
    />
  );
}
