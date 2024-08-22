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
    title: "plaze-shop ecommerce website",
    gitHubLink:"",
    link:"https://plaze-shop.de/",
    cards: [
      {
        category: "Slider for Home page",
        title: "You can change based on your WordPress",
        src: "/project/plaze1.png",
        content: <DummyContent />,
      },
      {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "/project/plaze2.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze3.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze4.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze5.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze6.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze7.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze8.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze9.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze10.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze11.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze12.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze13.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze14.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze15.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze16.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze17.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze18.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze19.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze20.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plaze21.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plwp1.png",
        content: <DummyContent />,
      },
      {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "/project/plwp1.png",
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