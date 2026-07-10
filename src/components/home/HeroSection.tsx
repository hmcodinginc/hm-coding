import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { heroContent } from "../../constants/homeContent";
import { AnimatedLogo } from "../shared/AnimatedLogo";

type HeroSectionProps = { openContact: () => void };

export function HeroSection({ openContact }: HeroSectionProps) {
  const navigate = useNavigate();
  const { badge, headline, subtext, since, primaryCta, secondaryCta } = heroContent;

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row">

        {/* Left: text */}
        <motion.div
          className="z-10 space-y-6 text-center md:w-1/2 md:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
        >
          <span className="inline-block rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-cyan">
            {badge}
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            {headline.split(" ").slice(0, -2).join(" ")}{" "} Revolution  your business with{" "}<br/>
            <span className="text-gradient-brand">HM Coding</span>
          </h1>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-lavender">
            {since}
          </p>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-300 md:mx-0 md:text-xl">
            {subtext}
          </p>

          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row md:justify-start">
            <motion.button
              type="button"
              className="w-full sm:w-56 whitespace-nowrap text-center rounded-full bg-brand-cyan px-7 py-3.5 font-semibold text-black shadow-neon-cyan transition hover:opacity-90"
              onClick={() => navigate("/services")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(62,195,202,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              {primaryCta}
            </motion.button>
            <motion.button
              type="button"
              className="w-full sm:w-56 whitespace-nowrap text-center rounded-full border border-brand-cyan/50 px-7 py-3.5 font-semibold text-brand-cyan transition hover:bg-brand-cyan/10"
              onClick={openContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {secondaryCta}
            </motion.button>
          </div>
        </motion.div>

        {/* Right: animated logo */}
        <motion.div
          className="z-10 flex justify-center md:w-1/2 md:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
        >
          <AnimatedLogo variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
