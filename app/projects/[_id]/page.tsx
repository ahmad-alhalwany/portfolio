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
        src: "/project/plaze1.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze2.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze3.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze4.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze5.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze6.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze7.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze8.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze9.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze10.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze11.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze12.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze13.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze14.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze15.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze16.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze17.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze18.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze19.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze20.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plaze21.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plwp1.png",
        content: <DummyContent />,
      },
      {
        src: "/project/plwp1.png",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 2,
    title: "Apply for Jobs - Mobile App",
    gitHubLink:"https://github.com/ahmad-alhalwany/jobs-react-native",
    link:"",
    cards: [
      {
        src: "/project/jobsapp1.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp2.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp3.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp4.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp5.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp6.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp7.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp8.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp9.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp10.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp11.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp12.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp13.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp14.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp15.png",
        content: <DummyContent />,
      },
      {
        src: "/project/jobsapp16.png",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 3,
    title: "Zeus - AI Prompt Application",
    gitHubLink:"https://github.com/ahmad-alhalwany/Zeus",
    link:"https://zeus-v851-8wlmcxt7r-ahmad-alhalwany.vercel.app/",
    cards: [
      {
        src: "/project/zeus1.png",
        content: <DummyContent />,
      },
      {
        src: "/project/zeus2.png",
        content: <DummyContent />,
      },
      {
        src: "/project/zeus3.png",
        content: <DummyContent />,
      },
      {
        src: "/project/zeus4.png",
        content: <DummyContent />,
      },
      {
        src: "/project/zeus5.png",
        content: <DummyContent />,
      },
    ],
  },
  {
    id: 4,
    title: "AI-Powered Animated 3D Website",
    gitHubLink:"https://github.com/ahmad-alhalwany/AI-Powered-3D-Website",
    link:"",
    cards: [
      {
        src: "/project/AI-Powered1.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered2.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered3.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered4.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered5.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered6.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered7.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered8.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered9.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered10.png",
        content: <DummyContent />,
      },
      {
        src: "/project/AI-Powered11.png",
        content: <DummyContent />,
      },
    ],
  },
];