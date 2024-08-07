"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/animated-modal";
import { FaLocationArrow } from "react-icons/fa";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { SignupFormDemo } from "./SignupForm";

export function AnimatedModalDemo() {
  const images = [
    "/Back-End.jpeg",
    "/Back-End.jpeg",
    "/Back-End.jpeg",
    "/Back-End.jpeg",
    "/Back-End.jpeg",
  ];
  return (
    <div className="py-40  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                Let&lsquo;s get in touch
                <FaLocationArrow />
            </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <SignupFormDemo/>
            <ShootingStars />
            <StarsBackground />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
