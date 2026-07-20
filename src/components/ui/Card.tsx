import type { ReactNode } from 'react';

// Main Card Wrapper
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border border-brand-indigo/20 bg-brand-surface/60 backdrop-blur transition-colors hover:border-brand-cyan/30 ${className}`}>
      {children}
    </div>
  );
}

// Card Header (used for titles or top images)
export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-5 sm:p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

// Card Content (Main body, uses flex-1 to push footer down if min-h is applied)
export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex-1 p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

// Card Footer (Actions, buttons)
export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center p-5 sm:p-6 pt-0 mt-auto border-t border-brand-indigo/10 ${className}`}>
      {children}
    </div>
  );
}
