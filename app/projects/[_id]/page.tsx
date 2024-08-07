"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppleCardsCarousel, DummyContent } from '@/components/AppleCardsCarousel';

const Page = ({ params }: any) => {
  const router = useRouter();
  const { _id } = params;

  const projectId = parseInt(_id);

  const [currentProjectIndex, setCurrentProjectIndex] = useState(
    data.findIndex((item) => item.id === projectId)
  );

  useEffect(() => {
    if (currentProjectIndex !== -1) {
      router.push(`/projects/${data[currentProjectIndex].id}`);
    }
  }, [currentProjectIndex, router]);

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const projectData = data[currentProjectIndex];

  return (
    <div>
      {projectData ? (
        <AppleCardsCarousel
          data={projectData}
          onPrevProject={handlePrevProject}
          onNextProject={handleNextProject}
        />
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
};

export default Page;

const data = [
  {
    id: 1,
    title: "3D Solar System Planets to Explore",
    gitHubLink:"",
    link:"https://ui.aceternity.com/components/text-reveal-card",
    cards: [
      {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "/project/plaze1.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/Back-End.jpeg",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    gitHubLink:"",
    link:"",
    cards: [
      {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "/Back-End.jpeg",
        content: <DummyContent />,
      },
      {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "/Back-End.jpeg",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    gitHubLink:"",
    link:"",
    cards: [
      {
        category: "iOS",
        title: "Photography just got better.",
        src: "/Back-End.jpeg",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    gitHubLink:"",
    link:"",
    cards: [
      {
        category: "Hiring",
        title: "Hiring for a Staff Software Engineer",
        src: "/Back-End.jpeg",
        content: <DummyContent />,
      },
    ],
  },
];