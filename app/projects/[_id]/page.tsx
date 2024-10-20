"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppleCardsCarousel } from '@/components/AppleCardsCarousel';

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
      },
      {
        src: "/project/plaze2.png",
      },
      {
        src: "/project/plaze3.png",
      },
      {
        src: "/project/plaze4.png",
      },
      {
        src: "/project/plaze5.png",
      },
      {
        src: "/project/plaze6.png",
      },
      {
        src: "/project/plaze7.png",
      },
      {
        src: "/project/plaze8.png",
      },
      {
        src: "/project/plaze9.png",
      },
      {
        src: "/project/plaze10.png",
      },
      {
        src: "/project/plaze11.png",
      },
      {
        src: "/project/plaze12.png",
      },
      {
        src: "/project/plaze13.png",
      },
      {
        src: "/project/plaze14.png",
      },
      {
        src: "/project/plaze15.png",
      },
      {
        src: "/project/plaze16.png",
      },
      {
        src: "/project/plaze17.png",
      },
      {
        src: "/project/plaze18.png",
      },
      {
        src: "/project/plaze19.png",
      },
      {
        src: "/project/plaze20.png",
      },
      {
        src: "/project/plaze21.png",
      },
      {
        src: "/project/plwp1.png",
      },
      {
        src: "/project/plwp1.png",
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
      },
      {
        src: "/project/jobsapp2.png",
      },
      {
        src: "/project/jobsapp3.png",
      },
      {
        src: "/project/jobsapp4.png",
      },
      {
        src: "/project/jobsapp5.png",
      },
      {
        src: "/project/jobsapp6.png",
      },
      {
        src: "/project/jobsapp7.png",
      },
      {
        src: "/project/jobsapp8.png",
      },
      {
        src: "/project/jobsapp9.png",
      },
      {
        src: "/project/jobsapp10.png",
      },
      {
        src: "/project/jobsapp11.png",
      },
      {
        src: "/project/jobsapp12.png",
      },
      {
        src: "/project/jobsapp13.png",
      },
      {
        src: "/project/jobsapp14.png",
      },
      {
        src: "/project/jobsapp15.png",
      },
      {
        src: "/project/jobsapp16.png",
      },
    ],
  },
  {
    id: 3,
    title: "Zeus - AI Prompt Application",
    gitHubLink:"https://github.com/ahmad-alhalwany/Zeus",
    link:"https://zeus-kappa.vercel.app/",
    cards: [
      {
        src: "/project/zeus1.png",
      },
      {
        src: "/project/zeus2.png",
      },
      {
        src: "/project/zeus3.png",
      },
      {
        src: "/project/zeus4.png",
      },
      {
        src: "/project/zeus5.png",
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
      },
      {
        src: "/project/AI-Powered2.png",
      },
      {
        src: "/project/AI-Powered3.png",
      },
      {
        src: "/project/AI-Powered4.png",
      },
      {
        src: "/project/AI-Powered5.png",
      },
      {
        src: "/project/AI-Powered6.png",
      },
      {
        src: "/project/AI-Powered7.png",
      },
      {
        src: "/project/AI-Powered8.png",
      },
      {
        src: "/project/AI-Powered9.png",
      },
      {
        src: "/project/AI-Powered10.png",
      },
      {
        src: "/project/AI-Powered11.png",
      },
    ],
  },
  {
    id: 5,
    title: "Student Website to share knowledge",
    gitHubLink:"https://github.com/ahmad-alhalwany/django_Project_social",
    link:"https://django-project-social.vercel.app/",
    cards: [
      {
        src: "/project/studybud2.png",
      },
      {
        src: "/project/studybud1.png",
      },
      {
        src: "/project/studybud3.png",
      },
      {
        src: "/project/studybud4.png",
      },
      {
        src: "/project/studybud5.png",
      },
      {
        src: "/project/studybud6.png",
      },
      {
        src: "/project/studybud7.png",
      },
      {
        src: "/project/studybud8.png",
      },
      {
        src: "/project/studybud9.png",
      },
      {
        src: "/project/studybud10.png",
      },
      {
        src: "/project/studybud11.png",
      },
    ],
  },
];