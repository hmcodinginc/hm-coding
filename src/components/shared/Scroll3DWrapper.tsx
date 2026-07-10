import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Scroll3DWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Tilts back as it enters, flattens in center, tilts forward as it exits
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.75, 1, 1, 0.75]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="perspective-3d preserve-3d w-full"
    >
      {children}
    </motion.div>
  );
}
