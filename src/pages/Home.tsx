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
import { LazySection } from "../components/shared/LazySection";

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
      
      <LazySection minHeight="800px">
        <WhyChooseUs />
      </LazySection>
      
      <LazySection minHeight="800px">
        <ProcessTimeline />
      </LazySection>
      
      <LazySection minHeight="1000px">
        <FeaturedProjectsSection />
      </LazySection>
      
      <LazySection minHeight="200px">
        <StatsBar />
      </LazySection>
      
      <LazySection minHeight="800px">
        <TestimonialsSection />
      </LazySection>
      
      <LazySection minHeight="600px">
        <FaqSection />
      </LazySection>
      
      <LazySection minHeight="400px">
        <FinalCta openContact={openContact} />
      </LazySection>
    </motion.div>
  );
};

export default Home;
