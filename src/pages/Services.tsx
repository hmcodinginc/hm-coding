import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { services } from "../constants/services";
import { ServiceCard } from "../components/services/ServiceCard";
import { ServiceDetailPanel } from "../components/services/ServiceDetailPanel";

interface LocationState {
  initialIndex?: number;
}

interface ServicesProps {
  openContact: () => void;
}

const serviceIcons = [
  <svg key="srv-1" className="mb-0 h-8 w-8 text-brand-cyan" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" /></svg>,
  <svg key="srv-2" className="mb-0 h-8 w-8 text-brand-magenta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="srv-3" className="mb-0 h-8 w-8 text-brand-cyan" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h9" /></svg>,
  <svg key="srv-4" className="mb-0 h-8 w-8 text-brand-magenta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-1.813-5.096L2.091 14.09 7.187 13l1.813-5.096L10.813 13l5.096 1.091-5.096 1.813zM18.688 4.688L18 7l-.688-2.313L15 4l2.313-.688L18 1l.688 2.313L21 4l-2.313.688zM20.188 15.188L19.5 17.5l-.688-2.313L16.5 14l2.313-.688L19.5 11l.688 2.313L22.5 14l-2.313.688z" /></svg>,
];

const Services: React.FC<ServicesProps> = ({ openContact }) => {
  const location = useLocation();
  const state = location.state as LocationState;
  const initialIndex = state?.initialIndex;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (initialIndex != null && initialIndex >= 0 && initialIndex < services.length) {
      setActiveIndex(initialIndex);
    }
  }, [initialIndex]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="relative flex w-full min-h-screen flex-col bg-brand-black pb-24"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" aria-hidden />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <span className="section-eyebrow mb-3 block">Expertise Areas</span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our <span className="text-gradient-brand">Services</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={service.title} className="flex flex-col">
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={serviceIcons[index] ?? serviceIcons[0]}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />

              {isMobile && activeIndex === index ? (
                <div className="mt-4">
                  <ServiceDetailPanel service={service} onEnquiry={openContact} />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {!isMobile ? (
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <ServiceDetailPanel
                key={activeIndex}
                service={services[activeIndex]}
                onEnquiry={openContact}
              />
            </AnimatePresence>
          </div>
        ) : null}
      </section>
    </motion.div>
  );
};

export default Services;
