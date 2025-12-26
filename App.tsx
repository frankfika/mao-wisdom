import React, { useState, useEffect } from 'react';
import { fetchMaoWisdom } from './services/aiService';
import { WisdomResult, AppState } from './types';

const SUGGESTIONS = [
  "工作遇到瓶颈怎么办",
  "团队不好带怎么破",
  "创业方向很迷茫",
];

function App() {
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<WisdomResult | null>(null);
  const [showCard, setShowCard] = useState(false);

  // 结果出来后延迟显示卡片（动画）
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

      {/* ========== 首页输入 ========== */}
      {appState === AppState.IDLE && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="text-5xl mb-4">★</div>
            <h1 className="font-calligraphy text-4xl sm:text-5xl text-amber-400 mb-2">
              毛选答案
            </h1>
            <p className="text-stone-500 text-sm">遇事不决，问问毛选</p>
          </div>

          {/* 输入框 */}
          <div className="w-full max-w-md">
            <textarea
              className="w-full bg-stone-900 text-stone-100 rounded-xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder-stone-600 min-h-[120px]"
              placeholder="说说你的困惑..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* 快捷标签 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="text-xs text-stone-500 hover:text-amber-400 bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-stone-700 disabled:to-stone-700 text-white font-medium py-4 rounded-xl transition-all text-lg shadow-lg shadow-amber-500/20 disabled:shadow-none"
            >
              求一签
            </button>
          </div>
        </div>
      )}

      {/* ========== 加载动画 ========== */}
      {appState === AppState.LOADING && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="relative">
            {/* 外圈旋转 */}
            <div className="w-24 h-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            {/* 内圈星星 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-amber-400 text-3xl animate-pulse">★</span>
            </div>
          </div>
          <p className="mt-8 text-stone-400 text-sm animate-pulse">正在翻阅毛选...</p>
        </div>
      )}

      {/* ========== 结果明信片 ========== */}
      {appState === AppState.SUCCESS && result && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

          {/* 明信片容器 */}
          <div
            className={`w-full max-w-sm transition-all duration-700 ${
              showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* 明信片主体 */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #b91c1c 0%, #7f1d1d 50%, #450a0a 100%)',
              }}
            >
              {/* 做旧纹理 */}
              <div className="relative p-6 sm:p-8">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`
                }} />

                {/* 顶部装饰 */}
                <div className="relative flex items-center justify-between mb-6">
                  <span className="text-amber-300/40 text-xs tracking-widest">毛选答案</span>
                  <span className="text-amber-300 text-xl">★</span>
                </div>

                {/* 核心关键词 */}
                <div className="relative text-center mb-6">
                  <h2 className="font-calligraphy text-6xl sm:text-7xl text-amber-300 drop-shadow-lg">
                    {result.keyword}
                  </h2>
                </div>

                {/* 分隔线 */}
                <div className="relative flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                </div>

                {/* 引用 */}
                <div className="relative mb-6">
                  <p className="text-amber-100/90 text-center text-base sm:text-lg leading-relaxed font-serif">
                    「{result.quote}」
                  </p>
                  <p className="text-amber-300/50 text-center text-xs mt-2">
                    —— {result.source}
                  </p>
                </div>

                {/* 建议 */}
                <div className="relative bg-black/20 rounded-lg p-4 mb-4">
                  <p className="text-amber-100 text-center text-sm leading-relaxed">
                    {result.advice}
                  </p>
                </div>

                {/* 鼓励语 */}
                <div className="relative text-center">
                  <p className="text-amber-300/70 text-xs tracking-wider">
                    {result.encouragement}
                  </p>
                </div>

                {/* 底部装饰 */}
                <div className="relative mt-8 pt-4 border-t border-amber-400/20 flex items-center justify-between text-amber-300/30 text-xs">
                  <span>WISDOM CARD</span>
                  <span>{new Date().toLocaleDateString('zh-CN')}</span>
                </div>
              </div>
            </div>

            {/* 用户问题（卡片外） */}
            <div className="mt-4 text-center">
              <p className="text-stone-500 text-xs">「{question}」</p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className={`mt-8 flex gap-4 transition-all duration-700 delay-300 ${
            showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={reset}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition-colors"
            >
              再问一签
            </button>
          </div>

          {/* 分享提示 */}
          <p className={`mt-6 text-stone-600 text-xs transition-all duration-700 delay-500 ${
            showCard ? 'opacity-100' : 'opacity-0'
          }`}>
            长按截图分享给朋友
          </p>
        </div>
      )}

      {/* ========== 错误状态 ========== */}
      {appState === AppState.ERROR && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-red-400 mb-4">出了点问题</p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-stone-800 text-stone-300 rounded-lg"
          >
            重试
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
