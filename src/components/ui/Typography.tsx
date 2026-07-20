import type { ReactNode, ElementType } from 'react';

type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

export function Heading({ children, level = 2, className = '', as, style }: HeadingProps) {
  const Component = as || (`h${level}` as ElementType);

  // Responsive font sizes mapped to the 3-tier strategy.
  // H1 is strictly sized on mobile to prevent >3 line wrapping on 320px displays.
  const sizeMap = {
    1: 'text-2xl leading-[1.2] sm:text-4xl lg:text-5xl font-extrabold', // Hero (Max 3 lines on 320px)
    2: 'text-xl sm:text-3xl lg:text-4xl font-bold',      // Section Headers
    3: 'text-lg sm:text-2xl font-semibold',               // Card Headers / Subsections
    4: 'text-base sm:text-xl font-medium',
    5: 'text-base sm:text-lg font-medium',
    6: 'text-sm sm:text-base font-medium',
  };

  return (
    <Component className={`font-display text-white tracking-tight ${sizeMap[level]} ${className}`} style={style}>
      {children}
    </Component>
  );
}

type TextProps = {
  children: ReactNode;
  variant?: 'base' | 'muted' | 'lead' | 'small';
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

export function Text({ children, variant = 'base', className = '', as: Component = 'p', style }: TextProps) {
  const variantMap = {
    base: 'text-base text-gray-300 leading-relaxed',
    muted: 'text-sm text-gray-400 leading-relaxed',
    lead: 'text-base sm:text-xl text-gray-300 leading-relaxed',
    small: 'text-xs text-gray-500',
  };

  return (
    <Component className={`${variantMap[variant]} ${className}`} style={style}>
      {children}
    </Component>
  );
}
