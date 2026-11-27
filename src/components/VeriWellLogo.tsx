import React from 'react';

interface VeriWellLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  subtitle?: string;
  className?: string;
}

export const VeriWellLogo: React.FC<VeriWellLogoProps> = ({
  size = 'md',
  showText = true,
  showBadge = true,
  badgeText = 'Hybrid AI',
  subtitle = 'Clinical Truth · On-Device Privacy',
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]', badge: 'text-[9px] px-1 py-0.2' },
    md: { box: 'w-10 h-10', svg: 'w-10 h-10', text: 'text-2xl', sub: 'text-[11px]', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { box: 'w-12 h-12', svg: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs', badge: 'text-xs px-2 py-0.5' },
    xl: { box: 'w-16 h-16', svg: 'w-16 h-16', text: 'text-4xl', sub: 'text-sm', badge: 'text-xs px-2.5 py-1' },
  };

  const dim = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <div className={`${dim.box} rounded-xl bg-forest-900 border-2 border-forest-950 flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_#0F172A] flex-shrink-0 relative overflow-hidden group`}>
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
        
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Inner Bio-Sanctum Frame */}
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="9"
            fill="#0D2E26"
            stroke="#10B981"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Pulse to Verification V Wave */}
          <path
            d="M9 25h4l3.5-7 6.5 19 6-18 8 10"
            stroke="url(#veriwellGrad)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Precision Verification Node */}
          <circle
            cx="37"
            cy="19"
            r="3"
            fill="#34D399"
            stroke="#0A221C"
            strokeWidth="1"
          />

          <defs>
            <linearGradient id="veriwellGrad" x1="9" y1="25" x2="37" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className={`font-display font-black tracking-tight text-forest-950 ${dim.text}`}>
              VeriWell
            </span>
            {showBadge && (
              <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-semibold tracking-wider ${dim.badge}`}>
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className={`text-forest-600 font-semibold tracking-tight ${dim.sub}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
