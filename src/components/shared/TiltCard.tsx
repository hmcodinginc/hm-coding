import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export function TiltCard({ children, className = "", maxRotation = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out coordinate changes using useSpring
  const springConfig = { damping: 20, stiffness: 120, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing mouse coordinates to [-0.5, 0.5] range
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-3d ${className}`}
    >
      {children}
    </motion.div>
  );
}
