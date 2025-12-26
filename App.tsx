import React, { useState, useEffect } from 'react';
import { fetchMaoWisdom } from './services/aiService';
import { WisdomResult, AppState } from './types';

const SUGGESTIONS = [
  "工作遇到瓶颈怎么办",
  "团队不好带怎么破",
  "创业方向很迷茫",
];

// 毛主席挥手剪影 SVG
const MaoWavingSilhouette = () => (
  <svg viewBox="0 0 300 400" className="w-full h-full" fill="currentColor">
    <path d="M150 20 C120 20 100 40 95 70 C90 100 95 120 100 140 L95 145 C85 150 80 160 85 175 L75 180 C65 175 55 180 50 195 C45 210 50 225 60 235 L55 250 C50 260 55 275 70 285 L65 320 C60 350 70 380 90 395 L210 395 C230 380 240 350 235 320 L230 285 C245 275 250 260 245 250 L240 235 C250 225 255 210 250 195 C245 180 235 175 225 180 L215 175 C220 160 215 150 205 145 L200 140 C205 120 210 100 205 70 C200 40 180 20 150 20 Z M130 60 C140 55 160 55 170 60 C180 65 185 80 180 95 L175 110 C165 105 155 105 145 105 C135 105 125 105 120 110 L115 95 C110 80 120 65 130 60 Z M110 200 L100 180 C95 170 100 160 110 155 L120 150 L130 170 L110 200 Z M190 200 L170 170 L180 150 L190 155 C200 160 205 170 200 180 L190 200 Z"/>
  </svg>
);

function App() {
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<WisdomResult | null>(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (appState === AppState.SUCCESS && result) {
      const timer = setTimeout(() => setShowCard(true), 100);
      return () => clearTimeout(timer);
    }
  }, [appState, result]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setQuestion(input);
    setAppState(AppState.LOADING);
    setResult(null);
    setShowCard(false);

    try {
      const data = await fetchMaoWisdom(input);
      setResult(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setAppState(AppState.ERROR);
    }
  };

  const reset = () => {
    setInput('');
    setQuestion('');
    setAppState(AppState.IDLE);
    setResult(null);
    setShowCard(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">

      {/* ===== 首页 ===== */}
      {appState === AppState.IDLE && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* 顶部装饰 */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-red-500 text-2xl">★</span>
              <h1 className="font-calligraphy text-5xl sm:text-6xl text-[#f5e6d3]">
                毛选答案
              </h1>
              <span className="text-red-500 text-2xl">★</span>
            </div>
            <p className="text-[#a89584] text-sm tracking-widest">遇事不决 · 问问毛选</p>
          </div>

          <div className="w-full max-w-md">
            <textarea
              className="w-full bg-[#2a2a2a] text-[#f5e6d3] rounded-lg p-5 text-base resize-none focus:outline-none focus:ring-1 focus:ring-red-600/50 placeholder-[#666] min-h-[120px] border border-[#333]"
              placeholder="说说你的困惑..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="text-xs text-[#888] hover:text-red-400 bg-[#2a2a2a] hover:bg-[#333] px-3 py-1.5 rounded transition-colors border border-[#333]"
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full mt-6 bg-red-700 hover:bg-red-600 disabled:bg-[#333] disabled:text-[#666] text-[#f5e6d3] font-medium py-4 rounded-lg transition-all text-lg"
            >
              求 签
            </button>
          </div>
        </div>
      )}

      {/* ===== 加载 ===== */}
      {appState === AppState.LOADING && (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a1a]">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-2 border-[#333] border-t-red-600 rounded-full animate-spin" />
            <div className="absolute inset-3 border-2 border-[#333] border-b-red-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="mt-8 text-[#888] text-sm tracking-widest">翻阅毛选中...</p>
        </div>
      )}

      {/* ===== 明信片结果 ===== */}
      {appState === AppState.SUCCESS && result && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

          <div className={`w-full max-w-sm transition-all duration-700 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* 明信片 - 复古宣传画风格 */}
            <div className="relative overflow-hidden bg-[#f5e6d3]" style={{ aspectRatio: '3/4' }}>

              {/* 顶部红色条幅 */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-red-700 to-red-800 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-amber-300 text-sm">★</span>
                  <span className="text-amber-100 text-xs tracking-[0.3em] font-medium">毛选答案</span>
                  <span className="text-amber-300 text-sm">★</span>
                </div>
              </div>

              {/* 放射光芒背景 */}
              <div className="absolute inset-0 opacity-[0.08]" style={{
                background: `repeating-conic-gradient(from 0deg at 50% 100%, #c41e3a 0deg 2deg, transparent 2deg 15deg)`
              }} />

              {/* 毛主席剪影 - 右下角 */}
              <div className="absolute -bottom-10 -right-10 w-[70%] text-red-800/10">
                <MaoWavingSilhouette />
              </div>

              {/* 内容区域 */}
              <div className="relative z-10 h-full flex flex-col pt-16 px-6 pb-6">

                {/* 引用区 */}
                <div className="flex-1 flex flex-col justify-center py-4">
                  {/* 大引号 */}
                  <div className="text-red-700/30 text-7xl font-serif leading-none mb-2">"</div>

                  {/* 引用文字 */}
                  <p className="text-[#2a1810] text-xl leading-relaxed font-serif px-2">
                    {result.quote}
                  </p>

                  {/* 闭合引号 */}
                  <div className="text-red-700/30 text-7xl font-serif leading-none text-right mt-2">"</div>

                  {/* 出处 */}
                  <p className="text-red-800 text-sm mt-4 text-right pr-2">
                    ——《{result.source.replace(/[《》]/g, '')}》
                  </p>
                </div>

                {/* 分割线 */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-red-800/20" />
                  <span className="text-red-700 text-xs">指点江山</span>
                  <div className="flex-1 h-px bg-red-800/20" />
                </div>

                {/* 解读区 */}
                <div className="bg-red-900/5 border border-red-800/20 rounded p-4">
                  <p className="text-[#4a3728] text-sm leading-relaxed">
                    {result.interpretation}
                  </p>
                </div>

                {/* 底部信息 */}
                <div className="mt-4 flex items-center justify-between text-[#8a7a6a] text-xs">
                  <span className="truncate max-w-[60%]">问：{question}</span>
                  <span>{new Date().toLocaleDateString('zh-CN')}</span>
                </div>
              </div>

              {/* 复古纸张纹理 */}
              <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
              }} />
            </div>
          </div>

          {/* 操作区 */}
          <div className={`mt-8 flex flex-col items-center gap-4 transition-all duration-500 delay-300 ${showCard ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={reset}
              className="px-8 py-3 bg-red-700 hover:bg-red-600 text-[#f5e6d3] rounded transition-colors"
            >
              再问一签
            </button>
            <p className="text-[#666] text-xs">截图分享给朋友</p>
          </div>
        </div>
      )}

      {/* ===== 错误 ===== */}
      {appState === AppState.ERROR && (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a1a]">
          <p className="text-red-400 mb-4">出了点问题</p>
          <button onClick={reset} className="px-6 py-2 bg-red-700 text-[#f5e6d3] rounded">重试</button>
        </div>
      )}
    </div>
  );
}

export default App;
