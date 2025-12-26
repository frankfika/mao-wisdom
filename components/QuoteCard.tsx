import React from 'react';
import { CardWisdom } from '../types';

interface QuoteCardProps {
  data: CardWisdom;
  index: number;
  isRevealed: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, index, isRevealed }) => {
  const labels = ["壹", "贰", "叁"];

  return (
    <div className={`transition-all duration-500 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* 卡片容器 */}
      <div className="bg-[#faf6ed] rounded shadow-lg overflow-hidden">

        {/* 顶部标签栏 */}
        <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 text-lg">★</span>
            <span className="text-amber-200 text-sm font-medium">{data.title}</span>
          </div>
          <span className="text-amber-300/60 text-xs">第{labels[index]}计</span>
        </div>

        {/* 内容区 */}
        <div className="p-4">
          {/* 关键词 */}
          <div className="text-center mb-4">
            <span className="font-calligraphy text-3xl sm:text-4xl text-red-800">{data.keyword}</span>
          </div>

          {/* 毛选引用 */}
          <div className="bg-red-50 rounded p-3 mb-4">
            <p className="text-stone-700 text-sm leading-relaxed">「{data.quote}」</p>
            <p className="text-stone-400 text-xs text-right mt-2">——《{data.source}》</p>
          </div>

          {/* 解读 */}
          <p className="text-stone-600 text-sm leading-relaxed">
            {data.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
};
