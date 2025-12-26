import React from 'react';

interface AnalysisPanelProps {
  text: string;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ text }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
       <div className="bg-[#1c1917] p-8 rounded-lg border-l-4 border-red-800 shadow-xl">
         <h3 className="text-stone-500 font-bold text-xs uppercase tracking-widest mb-4">
           Strategic Synthesis
         </h3>
         <p className="text-stone-300 font-serif-sc leading-loose text-lg">
           {text}
         </p>
       </div>
    </div>
  );
};