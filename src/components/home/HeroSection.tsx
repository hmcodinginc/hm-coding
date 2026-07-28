import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { heroContent } from "../../constants/homeContent";
import { AnimatedLogo } from "../shared/AnimatedLogo";
import { Section } from "../ui/Section";
import { Heading, Text } from "../ui/Typography";
import { Button } from "../ui/Button";

type HeroSectionProps = { openContact: () => void };

export function HeroSection({ openContact }: HeroSectionProps) {
  const navigate = useNavigate();
  const { badge, headline, subtext, since, primaryCta, secondaryCta } = heroContent;

  return (
    <Section paddingSpacing="lg" className="relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-between gap-8 sm:gap-12 md:flex-row">
        
        {/* Left: text */}
        <motion.div
          className="z-10 flex w-full flex-col items-center space-y-4 sm:space-y-6 text-center md:w-1/2 md:items-start md:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
        >
          <span className="inline-block rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-3 py-1 text-[10px] sm:px-4 sm:py-1.5 sm:text-xs font-semibold uppercase tracking-wider text-brand-cyan">
            {badge}
          </span>

          {/* Strict H1 sizing prevents wrapping past 3 lines on 320px screens */}
          <Heading level={1} className="w-full">
            <span className="text-gradient-brand">HM Coding</span><br/>{headline.split(" ").slice(0, -2).join(" ")}{" "}Empowers Your Business Growth
          </Heading>

          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-lavender">
            {since}
          </p>

          <Text variant="lead" className="w-full sm:max-w-xl">
            {subtext}
          </Text>

          {/* Mobile Buttons: Strict 48px height, auto width */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-56"
                onClick={() => navigate("/services")}
              >
                {primaryCta}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-56"
                onClick={openContact}
              >
                {secondaryCta}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: animated logo - HIDDEN ON MOBILE to prevent overcrowding and allow 1-column focus */}
        <motion.div
          className="z-10 flex w-full justify-center md:w-1/2 md:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
        >
          <AnimatedLogo variant="hero" />
        </motion.div>
      </div>
    </Section>
  );
}
