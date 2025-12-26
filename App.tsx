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
    <div className={`w-full bg-[#8B1A1A] text-[#f2e9e4] relative selection:bg-[#FFD700] selection:text-[#8B1A1A] flex flex-col ${appState === AppState.IDLE ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'}`}>
      
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
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#FFD700]/30 shadow-2xl relative z-10 bg-[#8B1A1A]">
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

             <h1 className="text-5xl md:text-6xl font-calligraphy text-[#FFD700] leading-none drop-shadow-xl text-center mb-2">
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
          <div ref={resultTopRef} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center py-10 px-4 animate-fade-in">
             
             {/* Result Header */}
             <div className="w-full flex justify-between items-end mb-12 border-b border-[#FFD700]/20 pb-4">
                <div>
                  <h2 className="text-3xl font-calligraphy text-[#FFD700] mb-1">战略部署</h2>
                  <p className="text-xs text-[#f2e9e4]/50 tracking-widest">STRATEGIC DIRECTIVES</p>
                </div>
                <button onClick={reset} className="px-4 py-1.5 border border-[#FFD700]/30 text-[#FFD700] text-xs hover:bg-[#FFD700] hover:text-[#8B1A1A] transition-colors">
                  下一题
                </button>
             </div>

             {/* Cards Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
               {result.cards.map((card, idx) => (
                 <div key={idx} className="flex justify-center w-full" style={{ animationDelay: `${idx * 0.15}s` }}>
                   <div className="w-full max-w-[320px]"> 
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

             {/* Summary Panel */}
             {flippedIndices.length > 0 && (
               <div className="w-full max-w-3xl animate-fade-in pb-20">
                 <div className="bg-[#f2e9e4] text-[#2c2c2c] shadow-2xl relative border-t-4 border-[#FFD700]">
                    <div className="p-8 md:p-10">
                       <div className="flex items-center mb-6 border-l-4 border-[#8B1A1A] pl-4">
                          <h3 className="text-xl font-bold font-serif text-[#8B1A1A] tracking-widest">
                            总体方针
                          </h3>
                       </div>
                       
                       <div className="prose prose-stone max-w-none">
                          <p className="text-lg font-serif leading-loose text-justify text-[#2c2c2c]">
                            {result.overallAdvice}
                          </p>
                       </div>

                       {flippedIndices.length === 3 && (
                          <div className="mt-10 pt-6 border-t border-[#8B1A1A]/10 flex justify-center">
                            <button 
                              onClick={reset}
                              className="px-8 py-3 bg-[#8B1A1A] text-[#FFD700] font-bold font-serif hover:bg-[#701010] transition-colors shadow-lg"
                            >
                              领会精神
                            </button>
                          </div>
                       )}
                    </div>
                 </div>
               </div>
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