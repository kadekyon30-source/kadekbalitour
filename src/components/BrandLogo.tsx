import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  subtitle = 'TOUR BALI',
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      text: 'text-lg sm:text-xl',
      sub: 'text-[9px] tracking-[0.25em]',
      icon: 'w-5 h-5',
    },
    md: {
      text: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
      icon: 'w-6 h-6',
    },
    lg: {
      text: 'text-3xl sm:text-4xl',
      sub: 'text-xs sm:text-[13px] tracking-[0.32em]',
      icon: 'w-8 h-8',
    },
    xl: {
      text: 'text-4xl sm:text-5xl lg:text-6xl',
      sub: 'text-xs sm:text-sm tracking-[0.35em]',
      icon: 'w-10 h-10',
    },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div className="flex items-center gap-1.5 leading-none">
        {/* Decorative tropical compass emblem */}
        <span className="inline-flex items-center justify-center p-1 rounded-lg bg-gradient-to-br from-blue-500/10 via-emerald-500/10 to-amber-500/10 border border-emerald-600/20 group-hover:scale-105 transition-transform">
          <svg
            className={`${sizeClasses.icon} text-emerald-600`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" className="text-blue-500 opacity-40" />
            <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" fill="#16A34A" stroke="#1D4ED8" />
          </svg>
        </span>

        {/* Wordmark: KADEK in Blue, BALI in Green */}
        <div className="flex items-baseline font-serif font-black tracking-tight drop-shadow-xs">
          <span className={`${sizeClasses.text} text-[#1E6FD9] group-hover:text-[#1858ad] transition-colors pr-1.5 font-extrabold`}>
            KADEK
          </span>
          <span className={`${sizeClasses.text} text-[#15803D] group-hover:text-[#166534] transition-colors font-extrabold`}>
            BALI
          </span>
        </div>
      </div>

      {/* Subtitle in small letters: TOUR BALI */}
      <div className="flex items-center gap-2 mt-0.5 pl-0.5">
        <span className={`font-sans font-bold uppercase text-[#526B50] ${sizeClasses.sub} leading-tight`}>
          {subtitle}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#15803D]/30 to-transparent max-w-[40px]"></span>
      </div>
    </div>
  );
};
