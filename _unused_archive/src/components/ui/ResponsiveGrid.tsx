import type { ReactNode } from 'react';

type ResponsiveGridProps = {
  children: ReactNode;
  columns?: '1-2-3' | '1-2-4' | '1-1-2';
  className?: string;
  as?: React.ElementType;
};

/**
 * A reusable responsive grid primitive for common layouts.
 * Follows the 3-tier strategy (Mobile, Tablet, Desktop) using grid-cols-*.
 */
export function ResponsiveGrid({ children, columns = '1-2-3', className = '', as: Component = 'div' }: ResponsiveGridProps) {
  
  const columnsMap = {
    '1-2-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '1-2-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '1-1-2': 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-2',
  };

  return (
    <Component className={`grid gap-6 sm:gap-8 lg:gap-10 ${columnsMap[columns]} ${className}`}>
      {children}
    </Component>
  );
}
