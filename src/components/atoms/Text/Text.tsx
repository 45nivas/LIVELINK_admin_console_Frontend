import React from 'react';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses = {
  primary: 'text-primary-500',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
  info: 'text-blue-600',
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color,
  children,
  className = '',
  ...props
}) => {
  const sizeClass = sizeClasses[size];
  const weightClass = weightClasses[weight];
  const colorClass = color ? colorClasses[color] : '';

  return (
    <Component
      className={`
        ${sizeClass}
        ${weightClass}
        ${colorClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
