import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/text-generate-effect';
import MagicButtons from './ui/Magic-buttons';
import Link from 'next/link';
import { FaLocationArrow } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='pb-20 pt-36'>
      <div>
        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white'/>
        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple'/>
        <Spotlight className='top-28 left-40 h-[80vh] w-[50vw]' fill='blue'/>
        <Spotlight className='top-24 left-32 h-[80vh] w-[50vw]' fill='cyan'/>
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-dot-white/[0.4] bg-dot-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
      </div>
      <div className='flex justify-center relative my-20 z-10'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
            <h1 className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>Dynamic magic portfolio with NEXT.JS</h1>
            <TextGenerateEffect 
                className='text-center text-[40px] md:text-5xl lg:text-7xl'
                words='Let&apos;s Take a Look at my Portfolio to Showcase my Experiences.'
            />

            <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
                Hi I&apos;m Ahmad, a Full stack developer. 
            </p>
            <Link href={"#about"}>
                <MagicButtons title='Show my work' postion='right' icon={<FaLocationArrow/>}/>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
