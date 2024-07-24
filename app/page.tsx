"use client";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProject from "@/components/RecentProject";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/indxe";
import { LampDemo } from "@/components/LampDemo";
import Experience from "@/components/Experience";
import { Approach } from "@/components/Approach";
import Footer from "@/components/Footer";


const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProject />
        <div id="education">
          <LampDemo/>
        </div>
        <Experience/>
        <Approach/>
        <Footer/>
      </div>
    </main>
  );
};

export default Home;