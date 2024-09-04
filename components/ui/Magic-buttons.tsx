import React from 'react';

const MagicButtons = (
  {title, icon, postion, handleClick, otherClasses}:{
    title:string, icon:React.ReactNode, postion:string, handleClick?: () => void, otherClasses?: string
  }) => {
  return (
    <button 
      className="relative inline-flex h-8 sm:h-10 md:h-12 w-auto sm:w-auto overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 sm:px-5 text-[10px] sm:text-xs md:text-sm font-medium text-white backdrop-blur-3xl gap-1 sm:gap-2 ${otherClasses}`}>
        {postion === 'left' && icon}
          {title}
        {postion === 'right' && icon}
      </span>
    </button>
  )
}

export default MagicButtons;