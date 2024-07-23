"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { SparklesCore } from "./ui/sparkles";
import MagicButtons from "./ui/Magic-buttons";
import { BiBookAlt } from "react-icons/bi";
import Link from "next/link";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="tracking-widest text-xs text-center text-blue-100 max-w-80"
      >
        <div className='flex justify-center relative my-20 z-10'>
            <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
                <div className="w-full absolute inset-0 h-screen">
                    <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    />
                </div>
                <span className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
                    Education <br/> And <br/> 
                    <span className="text-purple">Certificates</span>
                </span>
                <Link href={"/education"}>
                    <MagicButtons title="Show my Education" postion='right' icon={<BiBookAlt/>}/>
                </Link>
            </div>
        </div>
      </motion.h1>
    </LampContainer>
  );
}
