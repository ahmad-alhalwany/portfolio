"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";
import { HoverBorderGradientDemo } from "./HoverBorderGradient";

export function TracingBeamDemo() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <HoverBorderGradientDemo />
      <TracingBeam className="py-4">
        <div className="max-w-3xl mx-auto antialiased relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-12 md:mb-16">
              <div className="flex flex-wrap items-center mb-6">
                <h2 className="bg-black text-white rounded-full text-xs md:text-sm w-fit px-3 py-1">
                  {item.badge}
                </h2>
                <div
                  className="ml-4 border border-white/[.2] rounded-full bg-black flex justify-center items-center"
                  style={{
                    width: 'clamp(24px, 6vw, 40px)',
                    height: 'clamp(24px, 6vw, 40px)',
                    transform: `translateX(-${5 * index + 2}px)`,
                  }}
                >
                  <img
                    src={item.icon}
                    alt="icon"
                    className="p-1 rounded-full w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className={twMerge("text-lg md:text-xl mb-6")}>
                {item.title}
              </p>

              <div className="text-sm prose prose-sm dark:prose-invert">
                {item?.image && (
                  <div className="relative w-full h-auto mb-8">
                    <Image
                      src={item.image}
                      alt="blog thumbnail"
                      layout="responsive"
                      height={500}
                      width={1000}
                      className="rounded-lg object-cover"
                      style={{ maxHeight: '60vh' }}
                    />
                  </div>
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}

const dummyContent = [
  {
    title: "Information Technology Engineer | Artificial Intelligence Engineer",
    description: (
        <div className="max-w-2xl mx-auto">
        <p>
          I started studying at university in 2017.
        </p>
        <p>
          I graduated with an average of 71.43% in 2023.
        </p>
        <p className="mt-6">
          <span>Projects:</span>
          
          <span className="block pl-4 mb-4">
            <span className="inline-block"> • Built an NLP based app to classify people&lsquo;s reactions to some emotional categories.</span>
          </span>
          
          <span className="block pl-4 mb-4">
            <span className="inline-block"> • Built a self-driving car using Unity and Genetic Algorithm to study the effect of deep neural networks over the randomness of genetic algorithms.</span>
          </span>
          
          <span className="block pl-4 mb-4">
            <span className="inline-block"> • Data Mining project to classify favorite songs.</span>
          </span>
        </p>
      </div>
    ),
    badge: "Tishreen University",
    image:
      "/Tishreen.jpeg",
    icon:"/Tishreen.jpeg",
  },
  {
    title: "Introduction to Back-End Development",
    description: (
      <>
        <p>
            learn about the day-to-day responsibilities of a web developer and get a general understanding of the core and underlying technologies that power the internet. You will learn how front-end developers create websites and applications that work well and are easy to maintain. 
        </p>
      </>
    ),
    badge: "Meta",
    image:
      "/Back-End.jpeg",
    icon:"/facebook_logo.jpeg",
  },
  {
    title: "Introduction to Front-End Development",
    description: (
      <>
        <p>
            learn about the day-to-day responsibilities of a web developer and get a general understanding of the core and underlying technologies that power the internet. You will learn how front-end developers create websites and applications that work well and are easy to maintain. 
        </p>
      </>
    ),
    badge: "Meta",
    image:
      "/front-End.jpeg",
    icon:"/facebook_logo.jpeg",
  },
  {
    title: "Neural Networks and Deep Learning",
    description: (
      <>
        <p>
            familiar with the significant technological trends driving the rise of deep learning; build, train, and apply fully connected deep neural networks; implement efficient (vectorized) neural networks; identify key parameters in a neural network’s architecture; and apply deep learning to your own applications.
            <br/>
            The Deep Learning Specialization is our foundational program that will help you understand the capabilities, challenges, and consequences of deep learning and prepare you to participate in the development of leading-edge AI technology. It provides a pathway for you to gain the knowledge and skills to apply machine learning to your work, level up your technical career, and take the definitive step in the world of AI.
        </p>
      </>
    ),
    badge: "DeepLearning.AI",
    image:
      "/NN-DL.jpeg",
    icon:"/deeplearningai_logo.jpeg",
  },
  {
    title: "Project Initiation: Starting a Successful Project",
    description: (
      <>
        <p>
            set a project up for success in the first phase of the project life cycle: the project initiation phase. In exploring the key components of this phase, you’ll learn how to define and manage project goals, deliverables, scope, and success criteria. You’ll discover how to use tools and templates like stakeholder analysis grids and project charters to help you set project expectations and communicate roles and responsibilities. Current Google project managers will continue to instruct and provide you with hands-on approaches for accomplishing these tasks while showing you the best project management tools and resources for the job at hand.
        </p>
      </>
    ),
    badge: "Google",
    image:
      "/Project-Initiation.jpeg",
    icon:"/Google.png",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    description: (
      <>
      <div className="max-w-2xl mx-auto">
        <p className="mt-6">
        <span className="block pl-4 mb-4">
          <span className="inline-block"> • Build machine learning models in Python using popular machine learning libraries NumPy and scikit-learn.</span>
        </span>
        <span className="block pl-4 mb-4">
          <span className="inline-block"> • Build and train supervised machine learning models for prediction and binary classification tasks, including linear regression and logistic regression</span>
        </span>
        </p>
      </div>
      </>
    ),
    badge: "DeepLearning.AI",
    image:
      "/ML.jpeg",
    icon:"/DeepLearning.png",
  },
  {
    title: "Excel Basics for Data Analysis",
    description: (
      <>
        <p>
          Spreadsheet tools like Excel are an essential tool for working with data - whether for data analytics, business, marketing, or research. This course is designed to give you a basic working knowledge of Excel and how to use it for analyzing data. 
          This course is suitable for those who are interested in pursuing a career in data analysis or data science, as well as anyone looking to use Excel for data analysis in their own domain. No prior experience with spreadsheets or coding is required - all you need is a device with a modern web browser and the ability to create a Microsoft account to access Excel online at no cost. If you have a desktop version of Excel, you can also easily follow along with the course. 
        </p>
      </>
    ),
    badge: "IBM",
    image:
      "/EB-DA.jpeg",
    icon:"/IBM.png",
  },
  {
    title: "Foundations of Project Management",
    description: (
      <>
        <p>
        This course is the first in a series of six to equip you with the skills you need to apply to introductory-level roles in project management. Project managers play a key role in leading, planning and implementing critical projects to help their organizations succeed. In this course, you’ll discover foundational project management terminology and gain a deeper understanding of  the role and responsibilities of a project manager. We’ll also introduce you to the kinds of jobs you might pursue after completing this program. Throughout the program, you’ll learn from current Google project managers, who can provide you with a multi-dimensional educational experience that will help you build your skills  for on-the-job application. 
        </p>
      </>
    ),
    badge: "Google",
    image:
      "/FOPM.jpeg",
    icon:"/Google.png",
  },
  {
    title: "Introduction to Data Analytics",
    description: (
      <>
        <p>
        start a career in Data Analysis but don&lsquo;t know where to begin? This course presents you with a gentle introduction to Data Analysis, the role of a Data Analyst, and the tools used in this job. You will learn about the skills and responsibilities of a data analyst and hear from several data experts sharing their tips & advice to start a career. This course will help you to differentiate between the roles of Data Analysts, Data Scientists, and Data Engineers. 
        </p>
      </>
    ),
    badge: "IBM",
    image:
      "/ITDA.jpeg",
    icon:"/IBM.png",
  },
  {
    title: "Preparing to Manage Human Resources",
    description: (
      <>
        <p>
          One way or another, all employees are managed. But approaches to managing employees varying from employee-to-employee, job-to-job, manager-to-manager, organization-to-organization, and country-to-country. This course provides a foundation for developing your own approach to skillfully managing employees by illustrating alternative human resource management (HRM) strategies, introducing the importance of the legal context, and thinking about what motivates employees. This will then give you the factual and conceptual basis for developing specific, critical HRM skills in subsequent courses on hiring employees, managing performance, and rewarding employees. Don&lsquo;t know anything about HRM? That&lsquo;s OK! Leave this course with a new-found understanding of the range of options available for managing employees, a grasp of what makes workers tick, and the readiness to develop your own HRM skills.
        </p>
      </>
    ),
    badge: "University of Minnesota",
    image:
      "/PTMHR.jpeg",
    icon:"/UOM.png",
  },
];
