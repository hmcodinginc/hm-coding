import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";


const SCAN_MESSAGES = [
  "Analyzing Website...",
  "Scanning Performance...",
  "Scanning Security...",
  "Scanning Conversions...",
];

const RESULTS = [
  "Security vulnerabilities detected",
  "Performance improvements available",
  "Lead capture opportunities found",
  "SEO issues identified",
];
type Live = { openContact: () => void };

export const LiveAnalysisSection: React.FC<Live> = ({ openContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [scanMessageIndex, setScanMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "scanning" | "results" | "complete">("idle");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView && phase === "idle") {
      setPhase("scanning");
    }
  }, [isInView, phase]);

  useEffect(() => {
    if (phase === "scanning") {
      // Progress bar animation
      const duration = 1200; // 1.2s total scan
      const interval = 20;
      const steps = duration / interval;
      let currentStep = 0;

      const progressTimer = setInterval(() => {
        currentStep++;
        setProgress(Math.min((currentStep / steps) * 100, 100));
        
        if (currentStep >= steps) {
          clearInterval(progressTimer);
          setPhase("results");
        }
      }, interval);

      // Message cycling
      const messageTimer = setInterval(() => {
        setScanMessageIndex((prev) => (prev + 1) % SCAN_MESSAGES.length);
      }, 300); // cycle every 300ms

      return () => {
        clearInterval(progressTimer);
        clearInterval(messageTimer);
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "results") {
      const timer = setTimeout(() => {
        setPhase("complete");
      }, RESULTS.length * 300 + 400); // Time for all results to show
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 md:py-24 overflow-hidden border-y border-brand-indigo/10"
    >
      {/* Background Glows removed for global background seamlessness */}

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-xl order-2 lg:order-1">
          {/* Scan UI */}
          <div className="mb-12 bg-[#0e1118] border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-semibold text-brand-cyan font-mono h-5">
                {phase === "idle" ? "Waiting..." : phase === "complete" ? "Analysis Complete." : SCAN_MESSAGES[scanMessageIndex]}
              </span>
              <span className="text-sm font-bold text-white font-mono">{Math.round(progress)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-magenta relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[4px]" />
              </motion.div>
            </div>

            {/* Results List */}
            <div className="space-y-4 min-h-[160px]">
              {RESULTS.map((result, index) => {
                const showItem = phase === "results" || phase === "complete";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: showItem ? 1 : 0, 
                      x: showItem ? 0 : -10 
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: showItem ? index * 0.3 : 0 
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-mint/20 text-brand-mint shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{result}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Headline & CTA */}
          <div className="min-h-[160px] flex flex-col items-start text-left">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === "complete" ? 1 : 0, y: phase === "complete" ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              Your Website Is Leaving <span className="bg-gradient-to-r from-brand-cyan to-brand-magenta bg-clip-text text-transparent">Opportunities Behind.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: phase === "complete" ? 1 : 0, scale: phase === "complete" ? 1 : 0.95 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-start w-full">
                <button 
                  onClick={openContact} 
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto overflow-hidden border border-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Contact us</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Dashboard Visual */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative perspective-1000 order-1 lg:order-2">
          <div className="flex flex-col items-center gap-8 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, rotateY: -10, rotateX: 5 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                rotateY: isInView ? mousePosition.x * 10 : -10,
                rotateX: isInView ? mousePosition.y * -10 : 5,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="relative rounded-2xl p-1 bg-gradient-to-b from-white/10 to-transparent w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
            >
              {/* Neon Border Glow */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-indigo to-brand-magenta opacity-30 blur-sm pointer-events-none" />
              
              <div className="relative rounded-xl overflow-hidden bg-brand-black border border-white/5 aspect-[4/3]">
                <img 
                  src="/images/convertly_dashboard.jpg" 
                  alt="Convertly Dashboard Preview" 
                  className="w-full h-full object-cover opacity-90"
                />
                
                {/* Scan Line Animation Overlay */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-cyan shadow-[0_0_15px_#44b0ba] opacity-0 animate-scan-line pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-brand-cyan/20 opacity-0 animate-scan-glow pointer-events-none" />
              </div>
            </motion.div>

            <button
              onClick={() => window.open('https://convertly.hmcoding.com/', '_blank')}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto overflow-hidden border border-transparent z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Get Free Website Analysis</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scan-glow {
          0% { top: -8rem; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% - 8rem); opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
        .animate-scan-glow {
          animation: scan-glow 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};
