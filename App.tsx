import React, { useState, useEffect, useRef } from 'react';
import { fetchMaoWisdom } from './services/aiService';
import { SpreadData, AppState } from './types';
import { QuoteCard } from './components/QuoteCard';

const SUGGESTIONS = [
  "工作陷入瓶颈，坚持还是转行？",
  "团队执行力差，如何统一思想？",
  "面对巨头竞争，小团队如何取胜？",
  "生活失去方向，看不清未来。",
  "合伙人利益分配不均怎么搞？"
];

const LOADING_MESSAGES = [
  "正在查阅《矛盾论》...",
  "正在查阅《实践论》...",
  "正在分析主要矛盾...",
  "正在总结历史经验..."
];

function App() {
  const [input, setInput] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<SpreadData | null>(null);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  
  const resultTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (appState === AppState.LOADING) {
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [appState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setAppState(AppState.LOADING);
    setResult(null);
    setFlippedIndices([]);
    setLoadingMsgIndex(0);

    try {
      const data = await fetchMaoWisdom(input);
      setResult(data);
      setAppState(AppState.SUCCESS);
      setTimeout(() => resultTopRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: any) {
      console.error(err);
      setAppState(AppState.ERROR);
    }
  };

  const handleCardClick = (index: number) => {
    if (appState !== AppState.SUCCESS) return;
    if (!flippedIndices.includes(index)) {
      setFlippedIndices(prev => [...prev, index]);
    }
  };

  const reset = () => {
    setInput('');
    setAppState(AppState.IDLE);
    setResult(null);
    setFlippedIndices([]);
  };

  return (
    <div className={`w-full bg-[#8B1A1A] text-[#f2e9e4] relative selection:bg-[#FFD700] selection:text-[#8B1A1A] flex flex-col ${appState === AppState.IDLE ? 'min-h-[100dvh]' : 'min-h-screen'}`}>
      
      {/* Global Background */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#760c0c] to-[#4a0e0e] z-0"></div>
      <div className="fixed inset-0 pointer-events-none bg-noise z-0 opacity-30"></div>
      
      {/* ---------------- IDLE STATE ---------------- */}
      {appState === AppState.IDLE && (
        <div className="relative z-10 flex flex-col h-full max-w-lg mx-auto px-6 py-6 animate-fade-in">
          
          {/* Header Area */}
          <div className="flex-none flex flex-col items-center pt-4">
             <div className="mb-6 relative">
                {/* Portrait - Serious Style */}
                <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#FFD700]/30 shadow-2xl relative z-10 bg-[#8B1A1A]">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mao_Zedong_portrait.jpg/480px-Mao_Zedong_portrait.jpg" 
                    alt="Chairman Mao"
                    className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.3]"
                  />
                  {/* Inner shadow/glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B1A1A]/50 to-transparent mix-blend-multiply"></div>
                </div>
                {/* Decorative Laurels/Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD700] blur-[100px] opacity-10 -z-10"></div>
             </div>

             <h1 className="text-4xl sm:text-5xl md:text-6xl font-calligraphy text-[#FFD700] leading-none drop-shadow-xl text-center mb-2">
               毛泽东选集
             </h1>
             <div className="h-[1px] w-24 bg-[#FFD700]/50 my-3"></div>
             <p className="text-sm text-[#f2e9e4]/70 font-sans tracking-[0.3em] uppercase text-center">
               唯物辩证法 · 答案之书
             </p>
          </div>

          {/* Input Card */}
          <div className="flex-1 flex flex-col justify-center py-6">
             <div className="bg-[#5e1010]/80 backdrop-blur-sm border border-[#FFD700]/20 p-1 shadow-2xl">
                <div className="border border-[#FFD700]/10 p-5 flex flex-col">
                  <label className="block text-xs text-[#FFD700] mb-4 font-sans font-bold tracking-widest opacity-80 flex items-center">
                    <span className="w-2 h-2 bg-[#FFD700] mr-2"></span>
                    请陈述当前主要矛盾
                  </label>
                  
                  <textarea
                    className="w-full bg-transparent text-lg text-[#f2e9e4] placeholder-[#f2e9e4]/20 resize-none focus:outline-none font-serif leading-relaxed min-h-[100px]"
                    placeholder="同志，你遇到了什么困难？"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  
                  {/* Separator */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent my-4"></div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.slice(0, 3).map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(s)}
                        className="text-[10px] text-[#f2e9e4]/60 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors px-2 py-1 border border-[#f2e9e4]/10"
                      >
                        {s.substring(0, 10)}...
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Bottom Action */}
          <div className="flex-none pb-8">
             <button
               onClick={handleSubmit}
               disabled={!input.trim()}
               className="w-full bg-[#FFD700] text-[#8B1A1A] py-4 shadow-[0_5px_20px_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffe033] transition-all active:scale-[0.99] border-2 border-[#FFD700]"
             >
                <div className="flex items-center justify-center space-x-3">
                   <span className="font-calligraphy text-2xl">寻找破局之道</span>
                </div>
             </button>
          </div>
        </div>
      )}

      {/* ---------------- LOADING STATE ---------------- */}
      {appState === AppState.LOADING && (
        <div className="h-[100dvh] w-full flex flex-col justify-center items-center relative z-10 px-6">
             <div className="w-20 h-20 border-4 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin mb-8"></div>
             <p className="text-2xl font-calligraphy text-[#FFD700] tracking-widest animate-pulse">
               {LOADING_MESSAGES[loadingMsgIndex]}
             </p>
        </div>
      )}

      {/* ---------------- SUCCESS STATE ---------------- */}
      {appState === AppState.SUCCESS && result && (
          <div ref={resultTopRef} className="relative z-10 w-full flex flex-col items-center py-6 sm:py-10 px-4 animate-fade-in">

             {/* 顶部标题 */}
             <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-calligraphy text-amber-300 mb-2">锦囊三计</h2>
                <p className="text-xs text-stone-400 tracking-widest">点击卡片查看详情</p>
             </div>

             {/* 卡片区域 - 横向滚动(移动端) / 网格(桌面端) */}
             <div className="w-full max-w-4xl mb-6 sm:mb-10">
               {/* 移动端: 横向滚动 */}
               <div className="flex md:hidden gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory no-scrollbar">
                 {result.cards.map((card, idx) => (
                   <div key={idx} className="flex-none w-[75vw] max-w-[280px] snap-center">
                     <QuoteCard
                       index={idx}
                       data={card}
                       isFlipped={flippedIndices.includes(idx)}
                       onClick={() => handleCardClick(idx)}
                     />
                   </div>
                 ))}
               </div>

               {/* 桌面端: 网格布局 */}
               <div className="hidden md:grid grid-cols-3 gap-6">
                 {result.cards.map((card, idx) => (
                   <div key={idx} className="flex justify-center">
                     <div className="w-full max-w-[260px]">
                       <QuoteCard
                         index={idx}
                         data={card}
                         isFlipped={flippedIndices.includes(idx)}
                         onClick={() => handleCardClick(idx)}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* 进度指示 */}
             <div className="flex items-center gap-2 mb-6 sm:mb-8">
               {[0, 1, 2].map((i) => (
                 <div
                   key={i}
                   className={`w-2 h-2 rounded-full transition-colors ${
                     flippedIndices.includes(i) ? 'bg-amber-400' : 'bg-stone-600'
                   }`}
                 />
               ))}
               <span className="text-stone-500 text-xs ml-2">
                 {flippedIndices.length}/3 已揭晓
               </span>
             </div>

             {/* 总体方针 - 全部翻开后显示 */}
             {flippedIndices.length === 3 && (
               <div className="w-full max-w-2xl animate-fade-in">
                 {/* 做旧纸张风格 */}
                 <div className="rounded-sm shadow-xl overflow-hidden" style={{ background: '#f8f4eb' }}>
                   {/* 纸张纹理 */}
                   <div className="relative p-5 sm:p-8">
                     <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23p)'/%3E%3C/svg%3E")`
                     }}></div>

                     {/* 标题 */}
                     <div className="relative flex items-center gap-3 mb-4 sm:mb-6 pb-3 border-b border-stone-300">
                       <span className="text-red-800 text-xl">★</span>
                       <h3 className="text-red-800 font-calligraphy text-xl sm:text-2xl">总体方针</h3>
                     </div>

                     {/* 内容 */}
                     <p className="relative text-stone-700 text-sm sm:text-base leading-relaxed font-serif mb-6">
                       {result.overallAdvice}
                     </p>

                     {/* 底部按钮 */}
                     <div className="relative flex justify-center pt-4 border-t border-dashed border-stone-300">
                       <button
                         onClick={reset}
                         className="px-6 py-2.5 bg-red-800 text-amber-200 text-sm font-medium hover:bg-red-900 transition-colors rounded-sm shadow"
                       >
                         再问一卦
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {/* 未全部翻开时的提示 */}
             {flippedIndices.length > 0 && flippedIndices.length < 3 && (
               <p className="text-stone-500 text-xs animate-pulse">
                 翻开全部卡片查看总体方针
               </p>
             )}
          </div>
      )}

      {/* ---------------- ERROR STATE ---------------- */}
      {appState === AppState.ERROR && (
         <div className="h-screen w-full flex items-center justify-center px-6">
           <div className="text-center">
             <p className="text-[#FFD700] font-bold mb-4 text-xl">通讯线路故障</p>
             <button onClick={() => setAppState(AppState.IDLE)} className="px-6 py-2 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#8B1A1A]">
               重试
             </button>
           </div>
         </div>
      )}
    </div>
  );
}

export default App;