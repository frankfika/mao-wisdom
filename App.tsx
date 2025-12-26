import React, { useState, useEffect, useRef } from 'react';
import { fetchMaoWisdom } from './services/aiService';
import { SpreadData, AppState } from './types';
import { QuoteCard } from './components/QuoteCard';

const SUGGESTIONS = [
  "工作陷入瓶颈，坚持还是转行？",
  "团队执行力差，如何统一思想？",
  "面对巨头竞争，小团队如何取胜？",
];

const LOADING_MESSAGES = [
  "正在研读《矛盾论》...",
  "正在翻阅《实践论》...",
  "正在分析你的情况...",
  "正在整理锦囊妙计..."
];

function App() {
  const [input, setInput] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<SpreadData | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  const resultRef = useRef<HTMLDivElement>(null);

  // Loading 消息轮播
  useEffect(() => {
    let interval: any;
    if (appState === AppState.LOADING) {
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [appState]);

  // 成功后自动逐个揭示卡片
  useEffect(() => {
    if (appState === AppState.SUCCESS && result && revealedCount < 4) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, revealedCount === 0 ? 300 : 600);
      return () => clearTimeout(timer);
    }
  }, [appState, result, revealedCount]);

  // 滚动到结果
  useEffect(() => {
    if (appState === AppState.SUCCESS && revealedCount === 1) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [appState, revealedCount]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    setAppState(AppState.LOADING);
    setResult(null);
    setRevealedCount(0);
    setLoadingMsgIndex(0);

    try {
      const data = await fetchMaoWisdom(input);
      setResult(data);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setAppState(AppState.ERROR);
    }
  };

  const reset = () => {
    setInput('');
    setAppState(AppState.IDLE);
    setResult(null);
    setRevealedCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-950 to-stone-900 text-stone-100">

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-red-900/90 backdrop-blur border-b border-red-800/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">★</span>
            <span className="font-calligraphy text-xl text-amber-300">毛选指南</span>
          </div>
          {appState === AppState.SUCCESS && (
            <button
              onClick={reset}
              className="text-xs text-amber-300/70 hover:text-amber-300 transition-colors"
            >
              重新提问
            </button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">

        {/* ===== 输入区域 ===== */}
        {appState !== AppState.SUCCESS && (
          <div className="mb-8">
            {appState === AppState.IDLE && (
              <div className="text-center mb-8 pt-8">
                <h1 className="font-calligraphy text-4xl sm:text-5xl text-amber-300 mb-3">
                  遇事不决
                </h1>
                <p className="text-stone-400 text-sm">用毛泽东思想帮你分析问题、找到出路</p>
              </div>
            )}

            <div className="bg-red-950/50 rounded-lg p-4 border border-red-800/30">
              <textarea
                className="w-full bg-transparent text-stone-100 placeholder-stone-500 resize-none focus:outline-none text-base leading-relaxed min-h-[100px]"
                placeholder="说说你遇到了什么问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={appState === AppState.LOADING}
              />

              {appState === AppState.IDLE && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-red-800/30">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(s)}
                      className="text-xs text-stone-400 hover:text-amber-300 hover:bg-red-900/50 transition-colors px-2 py-1 rounded"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input.trim() || appState === AppState.LOADING}
              className="w-full mt-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-red-900 font-medium py-3 rounded-lg transition-colors"
            >
              {appState === AppState.LOADING ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-red-900/30 border-t-red-900 rounded-full animate-spin"></span>
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </span>
              ) : (
                '求一卦'
              )}
            </button>

            {appState === AppState.ERROR && (
              <p className="text-red-400 text-sm text-center mt-4">
                出了点问题，请稍后再试
              </p>
            )}
          </div>
        )}

        {/* ===== 结果区域 ===== */}
        {appState === AppState.SUCCESS && result && (
          <div ref={resultRef} className="space-y-4">

            {/* 用户问题回显 */}
            <div className="bg-red-950/30 rounded-lg p-4 border border-red-800/20">
              <p className="text-stone-400 text-xs mb-1">你的问题</p>
              <p className="text-stone-200 text-sm">{input}</p>
            </div>

            {/* 三条锦囊 */}
            <div className="space-y-4">
              {result.cards.map((card, idx) => (
                <QuoteCard
                  key={idx}
                  index={idx}
                  data={card}
                  isRevealed={revealedCount > idx}
                />
              ))}
            </div>

            {/* 总体建议 */}
            <div className={`transition-all duration-500 ${revealedCount > 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                <p className="text-stone-700 text-sm leading-relaxed">
                  {result.overallAdvice}
                </p>
              </div>

              <button
                onClick={reset}
                className="w-full mt-6 bg-red-800 hover:bg-red-700 text-amber-200 font-medium py-3 rounded-lg transition-colors"
              >
                再问一卦
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
