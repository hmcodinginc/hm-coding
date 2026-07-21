import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
}

/**
 * A wrapper component that delays rendering of its children until it enters the viewport.
 * This is crucial for performance, drastically reducing the initial DOM size and JavaScript execution.
 * To revert lazy loading, simply remove this wrapper from the parent component.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  minHeight = "100vh",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        // Start loading when the section is within 400px of entering the viewport
        rootMargin: "400px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }}>
      {isVisible && children}
    </div>
  );
};
