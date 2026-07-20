import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
};

/**
 * A standard wrapper to constrain max-width and center content.
 * Follows the 3-tier responsive strategy (Mobile, Tablet, Desktop).
 */
export function Container({ children, className = '', as: Component = 'div', fluid = false }: ContainerProps) {
  const maxWidthClass = fluid ? 'w-full' : 'max-w-7xl';
  return (
    <Component className={`mx-auto w-full ${maxWidthClass} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
}
