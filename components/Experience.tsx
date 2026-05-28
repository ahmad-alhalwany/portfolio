import React from "react";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { WorkExperience, EducationItem } from "@/lib/types";
import { Button } from "./ui/moving-border";
import { workExperience as defaultWorkExperience } from "@/data/indxe";
import { OptimizedImage } from "./ui/optimized-image";
import { SIZES } from "@/lib/image-config";

type ExperienceItem = WorkExperience | EducationItem

const Experience = ({
  title = 'My work experience',
  items = defaultWorkExperience,
  sectionId = 'experience',
}: {
  title?: string
  items?: ExperienceItem[]
  sectionId?: string
}) => {
  return (
    <div className='py-20' id={sectionId}>
      <SectionHeading>
        {title.split(" ").slice(0, 1).join(" ")}
        <span className="text-purple">{` ${title.split(" ").slice(1).join(" ")}`}</span>
      </SectionHeading>

      <div className='w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10'>
        {items.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius='1.75rem'
            style={{
              background: 'rgb(4,7,29)',
              backgroundColor:
                'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="hover-lift flex-1 border-neutral-200 text-black dark:border-slate-800 dark:text-white"
          >
            <div className='flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2'>
              <OptimizedImage
                src={card.thumbnail}
                alt={card.title}
                width={128}
                height={128}
                sizes={SIZES.thumbnail}
                className="h-16 w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 object-contain"
              />
              <div className='lg:ms-5'>
                <h1 className='text-start text-xl md:text-2xl font-bold'>{card.title}</h1>
                <p className='text-start text-white-100 mt-3 font-semibold'>{card.desc}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Experience
