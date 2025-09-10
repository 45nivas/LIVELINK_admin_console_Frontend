import React from 'react';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  size?: LogoSize;
  alt?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-12 w-auto',
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  alt = 'LIVELINK Logo',
  className = '',
  ...props
}) => {
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses];

  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} ${className}`}
      role="img"
      aria-label={alt}
      {...props}
    >
      <rect width="120" height="40" rx="8" fill="#007ABF"/>
      <text 
        x="60" 
        y="25" 
        textAnchor="middle" 
        fill="white" 
        fontFamily="Arial, sans-serif" 
        fontSize="16" 
        fontWeight="bold"
      >
        LIVELINK
      </text>
    </svg>
  );
};

export default Logo;
