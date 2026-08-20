import React from 'react';

export const ConvoraIcon: React.FC<{ className?: string; size?: number }> = ({ className = "h-8 w-8", size }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={size ? { width: size, height: size } : undefined}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Rounded Envelope Body */}
        <rect x="8" y="20" width="84" height="60" rx="16" fill="#181A22" stroke="#525866" strokeWidth="3" />
        
        {/* Envelope Top Flap */}
        <path
          d="M14 26 L50 56 L86 26"
          stroke="#E2E8F0"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Circular Pointer Badge */}
        <circle cx="76" cy="68" r="18" fill="#181A22" stroke="#E2E8F0" strokeWidth="3" />
        
        {/* Arrow / Paper Plane in Badge */}
        <path
          d="M84 60 L68 67 L73 72 L77 78 L84 60 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};

export const ConvoraLogo: React.FC<{
  showBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ showBadge = true, size = 'md', className = '' }) => {
  const iconSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-11 w-11' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <ConvoraIcon className={iconSize} />
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className={`font-extrabold ${textSize} tracking-tight text-white flex items-center`}>
            Convora<span className="text-zinc-300 ml-0.5">AI</span>
          </span>
          {showBadge && (
            <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
              AI Sales
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
