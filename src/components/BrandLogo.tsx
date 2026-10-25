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
      sub: 'text-[9px] tracking-[0.24em]',
      icon: 'w-6 h-6',
      badge: 'p-1',
    },
    md: {
      text: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
      icon: 'w-8 h-8',
      badge: 'p-1.5',
    },
    lg: {
      text: 'text-3xl sm:text-4xl',
      sub: 'text-xs sm:text-[13px] tracking-[0.32em]',
      icon: 'w-10 h-10',
      badge: 'p-2',
    },
    xl: {
      text: 'text-4xl sm:text-5xl lg:text-6xl',
      sub: 'text-xs sm:text-sm tracking-[0.35em]',
      icon: 'w-14 h-14',
      badge: 'p-2.5',
    },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      aria-label="KADEK BALI TOUR Logo"
    >
      <div className="flex items-center gap-2 leading-none">
        {/* Emblem: Minimalist Balinese Candi Bentar (Split Gateway Motif) */}
        <div
          className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6FD9]/10 via-[#15803D]/10 to-[#C6A66B]/15 border border-[#15803D]/25 group-hover:border-[#1E6FD9]/40 group-hover:scale-105 transition-all shadow-xs ${sizeClasses.badge}`}
          title="Gapura Candi Bentar Bali - Simbol Harmoni & Budaya Bali"
        >
          <svg
            className={`${sizeClasses.icon} shrink-0`}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Balinese Base Platform (Batur Candi) */}
            <path
              d="M6 42H42M10 39H38M14 36H34"
              stroke="#C6A66B"
              strokeWidth="1.75"
              strokeLinecap="round"
            />

            {/* Central Sacred Sun / Rising Dawn between the Gates */}
            <circle cx="24" cy="25" r="3.5" fill="#C6A66B" fillOpacity="0.3" />
            <circle cx="24" cy="25" r="2" fill="#C6A66B" />
            <path
              d="M24 18V20M24 30V32"
              stroke="#C6A66B"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Left Candi Bentar Wing (Stepped Balinese Architecture) */}
            {/* Main pillar & tiered stepped finials */}
            <path
              d="M21 36V16L18 16V13L16 13V10L14 10V7L12 7V4L15 4V7L17 7V10L19 10V13L21 13V16"
              stroke="#1E6FD9"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="#1E6FD9"
              fillOpacity="0.12"
            />
            {/* Left outer tier ornaments */}
            <path
              d="M10 36V30L12 30V26L14 26V22L16 22V18"
              stroke="#1E6FD9"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Left horizontal carved accent */}
            <line x1="12" y1="33" x2="20" y2="33" stroke="#1E6FD9" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="14" y1="28" x2="20" y2="28" stroke="#1E6FD9" strokeWidth="1.2" strokeLinecap="round" />

            {/* Right Candi Bentar Wing (Symmetrical Twin in Green) */}
            {/* Main pillar & tiered stepped finials */}
            <path
              d="M27 36V16L30 16V13L32 13V10L34 10V7L36 7V4L33 4V7L31 7V10L29 10V13L27 13V16"
              stroke="#15803D"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="#15803D"
              fillOpacity="0.12"
            />
            {/* Right outer tier ornaments */}
            <path
              d="M38 36V30L36 30V26L34 26V22L32 22V18"
              stroke="#15803D"
              strokeWidth="1.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Right horizontal carved accent */}
            <line x1="28" y1="33" x2="36" y2="33" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="28" y1="28" x2="34" y2="28" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Wordmark: KADEK in Blue, BALI in Green */}
        <div className="flex items-baseline font-serif font-black tracking-tight drop-shadow-xs">
          <span
            className={`${sizeClasses.text} text-[#1E6FD9] group-hover:text-[#1858ad] transition-colors pr-1.5 font-extrabold`}
          >
            KADEK
          </span>
          <span
            className={`${sizeClasses.text} text-[#15803D] group-hover:text-[#166534] transition-colors font-extrabold`}
          >
            BALI
          </span>
        </div>
      </div>

      {/* Subtitle in small letters: TOUR BALI with subtle minimalist Balinese gold rule */}
      <div className="flex items-center gap-2 mt-0.5 pl-0.5">
        <span className={`font-sans font-bold uppercase text-[#526B50] ${sizeClasses.sub} leading-tight`}>
          {subtitle}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#C6A66B]/50 via-[#15803D]/30 to-transparent max-w-[44px]"></span>
      </div>
    </div>
  );
};
