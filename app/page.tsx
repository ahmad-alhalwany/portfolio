"use client";

import React from "react";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProject from "@/components/RecentProject";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaUser, FaProjectDiagram, FaGraduationCap, FaEnvelope, FaHome } from "react-icons/fa";
import { LampDemo } from "@/components/LampDemo";
import Experience from "@/components/Experience";
import { Approach } from "@/components/Approach";
import Footer from "@/components/Footer";

const navItems = [
  { name: "Home", link: "#home", icon: <FaHome /> },
  { name: "About", link: "#about", icon: <FaUser /> },
  { name: "Projects", link: "#projects", icon: <FaProjectDiagram /> },
  { name: "Education", link: "#education", icon: <FaGraduationCap /> },
  { name: "Contact", link: "#contact", icon: <FaEnvelope /> },
];

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProject />
        <div id="education">
          <LampDemo />
        </div>
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;