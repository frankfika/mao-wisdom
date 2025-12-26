import React from 'react';

export const Seal: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-24 h-24 border-4 border-red-800 rounded-lg flex items-center justify-center p-1 opacity-80 mix-blend-multiply ${className}`}>
      <div className="w-full h-full border-2 border-red-800 flex flex-wrap content-center justify-center">
        <div className="text-red-800 font-calligraphy text-2xl leading-none text-center grid grid-cols-2 gap-1 w-full px-1">
          <span>实事</span>
          <span>求是</span>
        </div>
      </div>
    </div>
  );
};