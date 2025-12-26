import React from 'react';
import { CardWisdom } from '../types';

interface QuoteCardProps {
  data: CardWisdom;
  isFlipped: boolean;
  index: number;
  onClick: () => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, isFlipped, index, onClick }) => {

  const cardLabels = ["壹", "贰", "叁"];
  const cardTitles = ["析形势", "明纲领", "定战术"];

  return (
    <div
      className="relative w-full aspect-[3/4] perspective-1000 select-none cursor-pointer group"
      onClick={onClick}
    >
      <div className={`relative w-full h-full duration-700 transition-all transform-style-3d ${isFlipped ? 'rotate-y-180' : 'hover:-translate-y-2 hover:shadow-2xl'}`}>

        {/* === FRONT: 复古宣传画风格 === */}
        <div className="absolute w-full h-full backface-hidden overflow-hidden" style={{
          background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 50%, #5c0000 100%)'
        }}>
          {/* 做旧纹理 */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}></div>

          {/* 放射光芒背景 */}
          <div className="absolute inset-0 opacity-10" style={{
            background: 'repeating-conic-gradient(from 0deg, #ffd700 0deg 10deg, transparent 10deg 20deg)',
            transform: 'scale(2)'
          }}></div>

          {/* 边框装饰 */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-[#ffd700]/40"></div>
          <div className="absolute inset-3 sm:inset-4 border border-[#ffd700]/20"></div>

          {/* 角落装饰 */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#ffd700]/60"></div>
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#ffd700]/60"></div>
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#ffd700]/60"></div>
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#ffd700]/60"></div>

          {/* 主内容 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6">
            {/* 顶部编号 */}
            <div className="absolute top-4 sm:top-6 left-0 right-0 flex justify-center">
              <span className="text-[#ffd700]/50 text-xs tracking-[0.5em] font-mono">第{cardLabels[index]}计</span>
            </div>

            {/* 五角星 */}
            <div className="text-[#ffd700] text-3xl sm:text-4xl mb-3 sm:mb-4 drop-shadow-lg" style={{
              textShadow: '0 0 20px rgba(255,215,0,0.5)'
            }}>★</div>

            {/* 主标题 */}
            <h2 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-[#ffd700] mb-2 tracking-wider drop-shadow-lg">
              {cardTitles[index]}
            </h2>

            {/* 装饰线 */}
            <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#ffd700]/60"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#ffd700]/60 rotate-45"></div>
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#ffd700]/60"></div>
            </div>

            {/* 副标题 */}
            <p className="text-[#ffd700]/70 text-xs sm:text-sm tracking-[0.3em] font-serif">
              毛泽东选集
            </p>

            {/* 底部提示 */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center">
              <span className="text-[#ffd700]/40 text-[10px] sm:text-xs tracking-widest animate-pulse">
                [ 点击翻开 ]
              </span>
            </div>
          </div>
        </div>

        {/* === BACK: 复古明信片风格 === */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 overflow-hidden" style={{
          background: 'linear-gradient(to bottom, #f5f0e6 0%, #e8e0d0 100%)'
        }}>
          {/* 做旧纸张纹理 */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`
          }}></div>

          {/* 泛黄边缘 */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 60px rgba(139, 69, 19, 0.15)'
          }}></div>

          {/* 红色印章装饰 - 右上角 */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 opacity-80">
            <div className="w-full h-full rounded-full border-2 border-[#c41e3a] flex items-center justify-center rotate-[-15deg]" style={{
              boxShadow: '0 0 0 2px #c41e3a'
            }}>
              <span className="font-calligraphy text-[#c41e3a] text-lg sm:text-2xl">妙</span>
            </div>
          </div>

          {/* 明信片分割线 */}
          <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-[#8b4513]/20 hidden sm:block"></div>

          {/* 左侧主要内容 */}
          <div className="h-full flex flex-col p-4 sm:p-5 sm:pr-[35%]">
            {/* 关键词大字 */}
            <div className="flex-none mb-3 sm:mb-4">
              <div className="inline-block relative">
                <span className="font-calligraphy text-4xl sm:text-5xl text-[#8b0000]" style={{
                  textShadow: '2px 2px 0 rgba(139,0,0,0.1)'
                }}>{data.keyword}</span>
                {/* 红色下划线装饰 */}
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#c41e3a] to-transparent"></div>
              </div>
            </div>

            {/* 引言区域 */}
            <div className="flex-1 relative">
              {/* 引号装饰 */}
              <span className="absolute -top-2 -left-1 text-3xl sm:text-4xl text-[#c41e3a]/20 font-serif">"</span>

              <p className="text-[#2c2c2c] font-serif text-sm sm:text-base leading-relaxed pl-3 sm:pl-4 border-l-2 border-[#c41e3a]/30" style={{
                fontStyle: 'italic'
              }}>
                {data.quote}
              </p>

              <p className="text-right text-xs text-[#8b4513]/70 mt-2 sm:mt-3 pr-2">
                ——《{data.source}》
              </p>
            </div>

            {/* 解读区域 */}
            <div className="flex-none mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-dashed border-[#8b4513]/30">
              <div className="flex items-start gap-2">
                <span className="text-[#c41e3a] text-sm">▸</span>
                <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed font-sans">
                  {data.interpretation}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧装饰区域 (桌面端显示) */}
          <div className="absolute top-0 bottom-0 right-0 w-1/3 hidden sm:flex flex-col items-center justify-center p-4">
            {/* 邮票风格装饰 */}
            <div className="w-16 h-20 border-2 border-dashed border-[#8b4513]/30 flex items-center justify-center mb-4" style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139,69,19,0.03) 2px, rgba(139,69,19,0.03) 4px)'
            }}>
              <span className="text-[#c41e3a]/60 text-2xl">★</span>
            </div>

            {/* 竖排文字 */}
            <div className="writing-vertical-rl text-[#8b4513]/40 text-xs tracking-widest">
              为人民服务
            </div>
          </div>

          {/* 底部装饰 */}
          <div className="absolute bottom-2 sm:bottom-3 left-4 right-4 flex justify-between items-center text-[10px] text-[#8b4513]/40">
            <span>POSTCARD</span>
            <span>明信片</span>
          </div>
        </div>

      </div>
    </div>
  );
};
