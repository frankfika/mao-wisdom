import React from 'react';
import { CardWisdom } from '../types';

interface QuoteCardProps {
  data: CardWisdom;
  isFlipped: boolean;
  index: number;
  onClick: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, isFlipped, index, onClick }) => {
  
  const headers = ["第一步 · 认清本质", "第二步 · 思想纲领", "第三步 · 行动指南"];
  
  return (
    <div 
      className="relative w-full aspect-[3/4] perspective-1000 select-none cursor-pointer group"
      onClick={onClick}
    >
      <div className={`relative w-full h-full duration-500 transition-all transform-style-3d shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${isFlipped ? 'rotate-y-180' : 'hover:-translate-y-2'}`}>
        
        {/* --- FRONT: Classic Red Book Style --- */}
        <div className="absolute w-full h-full backface-hidden bg-[#A61C1C] flex flex-col items-center justify-between py-8 px-4 border border-[#ffffff]/10">
           {/* Texture */}
           <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}></div>
           
           <div className="relative z-10 flex flex-col items-center w-full h-full border border-[#FFD700]/30 p-2">
              <div className="w-full h-full border border-[#FFD700]/30 flex flex-col items-center justify-center space-y-6">
                  <span className="text-[#FFD700]/50 font-serif text-sm tracking-widest uppercase">Volume 0{index + 1}</span>
                  <div className="flex flex-col items-center">
                    <h2 className="font-serif text-4xl font-bold text-[#FFD700] tracking-[0.2em] mb-2 writing-vertical-rl md:writing-horizontal-tb text-shadow">
                      毛泽东
                    </h2>
                    <h2 className="font-serif text-4xl font-bold text-[#FFD700] tracking-[0.2em] writing-vertical-rl md:writing-horizontal-tb text-shadow">
                      选集
                    </h2>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center text-[#A61C1C] font-bold text-xs">
                    ★
                  </div>
              </div>
           </div>
        </div>

        {/* --- BACK: Paper/File Style --- */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-[#fdfbf7] flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="h-14 bg-[#8B1A1A] text-[#FFD700] flex items-center justify-center px-4 shrink-0 relative">
             <span className="font-bold text-lg tracking-widest font-serif">{headers[index]}</span>
             {/* Decorative lines */}
             <div className="absolute bottom-1 w-full h-[1px] bg-[#FFD700]/30"></div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto relative no-scrollbar">
             
             {/* Keyword Watermark */}
             <div className="absolute right-[-10px] top-[40px] opacity-5 pointer-events-none rotate-12">
                <span className="font-calligraphy text-9xl text-[#8B1A1A]">{data.keyword}</span>
             </div>

             <div className="relative z-10 mb-6 text-center">
                <h3 className="text-3xl font-calligraphy text-[#8B1A1A] mb-4">{data.keyword}</h3>
             </div>

             <div className="relative mb-6">
                <p className="relative z-10 text-[#2c2c2c] font-serif font-bold text-lg leading-relaxed text-justify">
                  “{data.quote}”
                </p>
                <p className="text-right text-xs text-[#8B1A1A]/60 mt-3 italic">—— {data.source}</p>
             </div>

             <div className="border-t border-[#8B1A1A]/10 pt-4">
                <p className="text-xs font-bold text-[#8B1A1A] mb-2 uppercase tracking-wider">Directive / 指示</p>
                <p className="text-sm text-[#4a4a4a] leading-6 text-justify font-sans">
                  {data.interpretation}
                </p>
             </div>
          </div>
          
          <div className="h-2 bg-[#8B1A1A] w-full shrink-0"></div>
        </div>

      </div>
    </div>
  );
};