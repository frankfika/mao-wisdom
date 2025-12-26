import React from 'react';
import { CardWisdom } from '../types';

interface QuoteCardProps {
  data: CardWisdom;
  isFlipped: boolean;
  index: number;
  onClick: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, isFlipped, index, onClick }) => {

  const cardNum = ["一", "二", "三"][index];

  return (
    <div
      className="relative w-full aspect-[4/5] perspective-1000 select-none cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative w-full h-full duration-500 ease-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* === 正面: 简约红色封面 === */}
        <div className="absolute w-full h-full backface-hidden rounded-sm overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(145deg, #b91c1c 0%, #7f1d1d 100%)' }}>

          {/* 纸张纹理 */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}></div>

          {/* 内容 */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
            <div className="text-amber-300/60 text-xs tracking-[0.4em] mb-4">锦 囊 {cardNum}</div>

            <div className="text-amber-300 text-4xl mb-4">★</div>

            <div className="text-amber-200 font-calligraphy text-3xl sm:text-4xl tracking-widest mb-3">
              {data.keyword}
            </div>

            <div className="w-12 h-[1px] bg-amber-300/30 mb-4"></div>

            <div className="text-amber-300/50 text-[10px] tracking-[0.3em]">点击查看</div>
          </div>
        </div>

        {/* === 背面: 做旧纸张 === */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-sm overflow-hidden shadow-lg"
          style={{ background: '#f8f4eb' }}>

          {/* 纸张做旧效果 */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(180,140,100,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(160,120,80,0.1) 0%, transparent 40%)'
          }}></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23p)'/%3E%3C/svg%3E")`
          }}></div>

          {/* 内容区 */}
          <div className="relative z-10 h-full flex flex-col p-4 sm:p-5">

            {/* 顶部标题 */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-300">
              <span className="text-red-800 font-calligraphy text-2xl sm:text-3xl">{data.keyword}</span>
              <span className="text-stone-400 text-[10px]">第{cardNum}计</span>
            </div>

            {/* 引言 */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-3 font-serif">
                「{data.quote}」
              </p>
              <p className="text-stone-400 text-xs text-right mb-4">
                —— {data.source}
              </p>

              {/* 分隔 */}
              <div className="flex items-center gap-2 my-3">
                <div className="flex-1 h-[1px] bg-stone-200"></div>
                <span className="text-red-700 text-xs">指示</span>
                <div className="flex-1 h-[1px] bg-stone-200"></div>
              </div>

              {/* 解读 */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {data.interpretation}
              </p>
            </div>

            {/* 底部印章 */}
            <div className="flex-none flex justify-end mt-3 pt-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border-2 border-red-700/60 flex items-center justify-center rotate-[-8deg]">
                <span className="text-red-700/70 font-calligraphy text-lg sm:text-xl">妙</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
