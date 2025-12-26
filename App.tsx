import React, { useState, useEffect } from 'react';
import { fetchMaoWisdom } from './services/aiService';
import { WisdomResult, AppState } from './types';

const SUGGESTIONS = [
  "工作遇到瓶颈怎么办",
  "团队不好带怎么破",
  "创业方向很迷茫",
];

// 毛主席挥手经典剪影 - 天安门城楼造型
const MaoWaving = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 300" className={className} fill="currentColor">
    {/* 头部 - 标志性发型 */}
    <ellipse cx="100" cy="45" rx="32" ry="38" />
    {/* 头发轮廓 - 向后梳的发型 */}
    <path d="M68 35 Q65 20 80 15 Q100 10 120 15 Q135 20 132 35 Q125 25 100 22 Q75 25 68 35Z"/>

    {/* 右手高举挥手 */}
    <path d="
      M145 85
      Q160 60 170 40
      Q175 30 180 35
      Q185 42 178 55
      Q170 75 158 95
      Q150 100 145 85
    "/>
    {/* 手掌张开 */}
    <path d="M170 40 Q175 32 178 28 Q180 25 183 28 Q185 33 180 38Z"/>
    <path d="M175 35 Q182 28 186 26 Q189 25 190 29 Q189 35 182 38Z"/>
    <path d="M178 38 Q187 33 191 32 Q194 32 194 36 Q192 40 185 42Z"/>
    <path d="M180 42 Q188 40 192 40 Q195 41 194 45 Q191 48 184 47Z"/>

    {/* 身体 - 中山装 */}
    <path d="
      M68 80
      Q55 90 50 120
      L45 200
      L48 280
      L85 280
      L88 200
      Q90 160 92 130
      L100 95
      L108 130
      Q110 160 112 200
      L115 280
      L152 280
      L155 200
      L150 120
      Q145 90 132 80
      Q115 75 100 78
      Q85 75 68 80
    "/>

    {/* 左手自然下垂 */}
    <path d="
      M55 120
      Q45 130 40 160
      Q38 180 42 200
      L50 200
      Q52 180 50 160
      Q52 140 58 125
    "/>

    {/* 中山装领子 */}
    <path d="M85 82 L100 95 L115 82 L108 78 L100 88 L92 78 Z" fill="currentColor"/>

    {/* 中山装口袋 */}
    <rect x="70" y="140" width="20" height="3" rx="1"/>
    <rect x="110" y="140" width="20" height="3" rx="1"/>
  </svg>
);

// 五角星装饰
const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// 放射光芒背景
const Sunburst = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className}>
    {[...Array(24)].map((_, i) => (
      <path
        key={i}
        d="M200 200 L200 0 L215 0 Z"
        fill="currentColor"
        transform={`rotate(${i * 15} 200 200)`}
      />
    ))}
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
    <div className="h-[100dvh] bg-gradient-to-b from-[#faf8f5] to-[#f5f0eb] flex flex-col overflow-hidden">

      {/* ===== 首页 ===== */}
      {appState === AppState.IDLE && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 overflow-hidden relative">
          {/* 放射光芒背景 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Sunburst className="w-[150%] h-[150%] text-red-500/[0.04]" />
          </div>

          {/* 背景毛主席挥手像 */}
          <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-[0.15]">
            <MaoWaving className="w-56 h-72 text-red-600 translate-x-6 translate-y-8" />
          </div>

          {/* Logo区 */}
          <div className="relative mb-8 text-center">
            <div className="inline-flex items-center gap-1 mb-4">
              <Star className="w-5 h-5 text-red-500" />
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <h1 className="font-calligraphy text-4xl sm:text-5xl text-red-700 mb-2">
              毛选答案
            </h1>
            <p className="text-gray-500 text-xs tracking-widest">遇事不决 · 问问毛选</p>
          </div>

          <div className="relative w-full max-w-sm">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-xl shadow-red-100/50 border border-red-100/50">
              <textarea
                className="w-full bg-transparent text-gray-700 text-base resize-none focus:outline-none placeholder-gray-400 h-[80px] leading-relaxed"
                placeholder="说说你的困惑..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-red-100/50">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="text-xs text-gray-500 hover:text-red-600 bg-red-50/50 hover:bg-red-100 px-2.5 py-1 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-400 font-medium py-3.5 rounded-xl transition-all text-base shadow-lg shadow-red-300/50 disabled:shadow-none"
            >
              求一签
            </button>
          </div>
        </div>
      )}

      {/* ===== 加载 ===== */}
      {appState === AppState.LOADING && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-red-100 border-t-red-500 animate-spin" />
          </div>
          <p className="mt-6 text-gray-400 text-sm">正在翻阅毛选...</p>
        </div>
      )}

      {/* ===== 结果卡片 - 战斗时代风格 ===== */}
      {appState === AppState.SUCCESS && result && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 overflow-hidden">

          <div className={`w-full max-w-sm transition-all duration-500 ${showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

            {/* 卡片 - 红色边框 + 米色内页 */}
            <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-xl shadow-xl shadow-red-300/40">
              <div className="relative bg-[#fdf8f3] rounded-lg overflow-hidden">

                {/* 放射光芒背景 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
                  <Sunburst className="w-[200%] h-[200%] text-red-600" />
                </div>

                {/* 毛主席挥手像 - 右下角 */}
                <div className="absolute -bottom-6 -right-2 pointer-events-none opacity-[0.12]">
                  <MaoWaving className="w-32 h-44 text-red-700" />
                </div>

                {/* 顶部装饰条 */}
                <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-2 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-amber-100 text-xs font-medium tracking-wider">毛选答案</span>
                  </div>
                  <div className="flex gap-0.5">
                    <Star className="w-3 h-3 text-amber-300" />
                    <Star className="w-2.5 h-2.5 text-amber-200" />
                    <Star className="w-2 h-2 text-amber-100" />
                  </div>
                </div>

                {/* 内容区 */}
                <div className="relative p-5">

                  {/* 语录 - 核心 */}
                  <div className="mb-5">
                    <p className="text-red-900 text-lg leading-relaxed font-medium">
                      「{result.quote}」
                    </p>
                    <p className="text-red-600 text-xs mt-3 font-medium">
                      —— {result.source}
                    </p>
                  </div>

                  {/* 分割线 - 五角星 */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px bg-red-200" />
                    <Star className="w-3 h-3 text-red-400" />
                    <div className="flex-1 h-px bg-red-200" />
                  </div>

                  {/* 解读 */}
                  <div className="bg-white/60 rounded-lg p-4 border border-red-200/50">
                    <p className="text-red-800/80 text-sm leading-relaxed">
                      {result.interpretation}
                    </p>
                  </div>

                  {/* 底部 */}
                  <div className="mt-4 pt-3 flex items-center justify-between text-red-400/60 text-xs border-t border-red-200/50">
                    <span className="truncate max-w-[55%]">{question}</span>
                    <span>{new Date().toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 水印/品牌 */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <Star className="w-2.5 h-2.5 text-red-400" />
              <span className="text-red-400/60 text-xs font-medium">指点江山</span>
              <Star className="w-2.5 h-2.5 text-red-400" />
            </div>
          </div>

          {/* 操作区 */}
          <div className={`mt-5 flex flex-col items-center gap-2 transition-all duration-500 delay-200 ${showCard ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm rounded-full transition-all shadow-lg shadow-red-300/50"
            >
              再问一签
            </button>
            <p className="text-gray-400 text-xs">长按截图分享给朋友</p>
          </div>
        </div>
      )}

      {/* ===== 错误 ===== */}
      {appState === AppState.ERROR && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">出了点问题</p>
          <button onClick={reset} className="px-6 py-2 bg-red-500 text-white rounded-full">重试</button>
        </div>
      )}
    </div>
  );
}

export default App;
