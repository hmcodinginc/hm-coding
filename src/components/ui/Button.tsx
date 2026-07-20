import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/**
 * Standard Button primitive enforcing responsive sizes.
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan/50';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-brand-cyan to-brand-magenta text-white hover:opacity-90',
    secondary: 'bg-brand-surface border border-brand-indigo/30 text-white hover:bg-brand-indigo/20',
    outline: 'border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
  };

  const sizeStyles = {
    sm: 'text-sm px-4 py-2 min-h-[40px] sm:text-sm sm:px-4 sm:py-2',
    md: 'text-sm px-4 py-2.5 min-h-[48px] sm:text-base sm:px-6 sm:py-3',
    lg: 'text-sm px-4 py-2.5 min-h-[48px] sm:text-lg sm:px-8 sm:py-4',
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
