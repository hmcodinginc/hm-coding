import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Interactive3DGrid() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { damping: 25, stiffness: 60 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { damping: 25, stiffness: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 perspective-3d">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full opacity-[0.05] bg-grid-faint scale-105"
      />
    </div>
  );
}
