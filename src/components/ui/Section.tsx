import type { ReactNode } from 'react';
import { Container } from './Container';

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  paddingSpacing?: 'sm' | 'md' | 'lg' | 'none';
  containerFluid?: boolean;
};

/**
 * A vertical spacing primitive to ensure consistent padding between page sections.
 * Automatically wraps content in a Container unless fluid is requested.
 */
export function Section({ 
  children, 
  className = '', 
  as: Component = 'section', 
  paddingSpacing = 'md',
  containerFluid = false
}: SectionProps) {
  
  const paddingMap = {
    none: '',
    sm: 'py-6 sm:py-10 lg:py-12',
    md: 'py-8 sm:py-12 lg:py-16',
    lg: 'py-10 sm:py-16 lg:py-20',
  };

  return (
    <Component className={`w-full ${paddingMap[paddingSpacing]} ${className}`}>
      <Container fluid={containerFluid}>
        {children}
      </Container>
    </Component>
  );
}
