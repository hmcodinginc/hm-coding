import React from "react";
import { motion } from "framer-motion";
import {
  HeroSection,
  WhyChooseUs,
  ProcessTimeline,
  FeaturedProjectsSection,
  StatsBar,
  TestimonialsSection,
  FaqSection,
  FinalCta,
  LiveAnalysisSection,
} from "../components/home";

interface HomeProps {
  openContact: () => void;
}

const Home: React.FC<HomeProps> = ({ openContact }) => {
  return (
    <motion.div
      className="flex w-full flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <HeroSection openContact={openContact} />
      <LiveAnalysisSection openContact={openContact} />
      <WhyChooseUs />
      <ProcessTimeline />
      <FeaturedProjectsSection />
      <StatsBar />
      <TestimonialsSection />
      <FaqSection openContact={openContact} />
      <FinalCta openContact={openContact} />
    </motion.div>
  );
};

export default Home;
