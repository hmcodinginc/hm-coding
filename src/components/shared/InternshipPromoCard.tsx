import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

type InternshipPromoCardProps = {
  title: ReactNode;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  buttonClassName?: string;
  className?: string;
};

export function InternshipPromoCard({
  title,
  description,
  buttonLabel,
  onButtonClick,
  buttonClassName = "bg-brand-cyan text-brand-black shadow-neon-cyan",
  className = "",
}: InternshipPromoCardProps) {
  return (
    <div className={`max-w-6xl mx-auto px-6 text-center preserve-3d flex justify-center ${className}`}>
      <TiltCard maxRotation={6} className="w-full max-w-4xl preserve-3d">
        <div className="card-surface group relative overflow-hidden rounded-3xl border border-brand-cyan/20 bg-brand-gradient/10 p-10 shadow-card-md preserve-3d md:p-14">
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          <h2
            className="relative z-10 mb-6 font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{ transform: "translateZ(25px)" }}
          >
            {title}
          </h2>

          <p
            className="relative z-10 mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl"
            style={{ transform: "translateZ(15px)" }}
          >
            {description}
          </p>

          <motion.button
            type="button"
            onClick={onButtonClick}
            className={`relative z-10 rounded-full px-8 py-4 font-bold hover:opacity-95 btn-shimmer ${buttonClassName}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ transform: "translateZ(20px)" }}
          >
            {buttonLabel}
          </motion.button>
        </div>
      </TiltCard>
    </div>
  );
}
