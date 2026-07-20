import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/convetly_slide_1.jpg",
  "/convetly_slide_2.jpg",
  "/convetly_slide_3.jpg",
];

const features = [
  "Convetly comprehensively analyzes your website architecture.",
  "Generates detailed, actionable performance reports.",
  "Provides intelligent suggestions to fix issues rapidly.",
  "Identifies hidden bugs affecting user experience.",
  "Exposes critical security vulnerabilities before they are exploited."
];

export const ConvetlyPromotion: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-black relative border-t border-brand-indigo/10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="section-eyebrow mb-3 block text-brand-cyan">Introducing Convetly</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-display tracking-tight">
            Next-Gen Website Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="min-h-[120px]"
              >
                <motion.p
                  className="text-2xl md:text-3xl font-medium text-gray-200 leading-relaxed"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      }
                    }
                  }}
                >
                  {features[currentIndex].split("").map((char, index) => (
                    <motion.span
                      key={`${index}-${char}`}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-brand-cyan text-brand-black font-semibold rounded-full shadow-neon-cyan hover:opacity-90 transition-opacity" onClick={() => window.open("https://convertly.hmcoding.com/", "_blank")}>
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Image Slider with Custom Animations */}
          <div className="relative aspect-video w-full max-w-[500px] lg:max-w-none mx-auto rounded-2xl overflow-hidden border border-brand-indigo/30 bg-gray-900 shadow-2xl order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex % images.length]}
                alt={`Convetly feature ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>

            {/* Slide 1: Scan-line animation */}
            {currentIndex % images.length === 0 && (
              <>
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <motion.div 
                  className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent to-brand-cyan/20 z-10"
                  animate={{ top: ["-10%", "90%", "-10%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              </>
            )}

            {/* Slide 2: One-by-one slice reveal */}
            {currentIndex % images.length === 1 && (
              <div className="absolute inset-0 z-20 flex pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`slice-${i}`}
                    className="flex-1 h-full bg-brand-black"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: "circOut" }}
                    style={{ transformOrigin: "top" }}
                  />
                ))}
              </div>
            )}

            {/* Slide 3: Neon Pulse Effect */}
            {currentIndex % images.length === 2 && (
              <>
                <motion.div 
                  className="absolute inset-0 z-20 mix-blend-overlay bg-brand-magenta/30 pointer-events-none"
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-0 z-20 mix-blend-overlay bg-brand-cyan/20 pointer-events-none"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
