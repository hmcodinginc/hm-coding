import React from "react";
import { motion } from "framer-motion";
import AboutImageNew from "../assets/aboutus-new.png";
import { aboutContent } from "../constants/aboutContent";
import { useNavigate } from "react-router-dom";
import { TiltCard } from "../components/shared/TiltCard";
import { ConvetlyPromotion } from "../components/about/ConvetlyPromotion";

interface AboutProps {
  openContact: () => void;
}

const About: React.FC<AboutProps> = ({ openContact }) => {
  const { hero, whoWeAre, missionVision, values } = aboutContent;
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full flex flex-col bg-brand-black"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <section className="relative bg-brand-black overflow-hidden py-20 md:py-28 border-b border-brand-indigo/10 perspective-3d preserve-3d">
        <div className="absolute inset-0 bg-hero-glow-about pointer-events-none" />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none" />
        
        <div className="max-w-7xl mx-auto gap-12 px-6 relative z-10 flex flex-col md:flex-row items-center justify-between preserve-3d">
          <motion.div
            className="md:w-1/2 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="section-eyebrow block">About HM Coding</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight font-display tracking-tight text-white">
              {hero.title.split(" ")[0]}{" "}
              <span className="text-gradient-brand">
                {hero.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              {hero.tagline}
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
              <motion.button
                className="px-6 py-3 bg-brand-cyan text-brand-black font-semibold rounded-full shadow-neon-cyan btn-shimmer hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/services")}
              >
                Explore Services
              </motion.button>

              <motion.button
                className="px-6 py-3 border border-brand-magenta text-white font-semibold rounded-full hover:bg-brand-magenta/10 hover:shadow-neon-magenta transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openContact}
              >
                {hero.buttonText}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end preserve-3d"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 }}
          >
            <TiltCard maxRotation={8} className="w-full max-w-2xl preserve-3d">
              <div className="relative group w-full preserve-3d">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-brand-cyan to-brand-magenta opacity-30 blur-2xl group-hover:opacity-60 transition duration-700" style={{ transform: "translateZ(-20px)" }} />
                <motion.img
                  src={AboutImageNew}
                  alt="HM Coding Dashboard"
                  className="relative rounded-3xl shadow-2xl object-cover border border-brand-indigo/30 w-full"
                  style={{ transform: "translateZ(30px)" }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-brand-black/40 border-b border-brand-indigo/10 relative">
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.span 
            className="section-eyebrow mb-3 block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Company Overview
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6 font-display tracking-tight"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {whoWeAre.title}
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {whoWeAre.description}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-brand-black relative overflow-hidden perspective-3d preserve-3d">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-30" />
        <motion.div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 preserve-3d"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {[missionVision.mission, missionVision.vision].map((item, index) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, x: index === 0 ? -100 : 100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="card-surface-hover p-8 md:p-10 flex flex-col justify-between h-full rounded-2xl border border-brand-indigo/10 bg-brand-black/50">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-3 block">
                    {index === 0 ? "Our Target" : "Our Dream"}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 font-display">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section 
        className="py-20 bg-brand-black/60 border-t border-brand-indigo/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-eyebrow mb-3 block">Our Core Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight">
              {values.title}
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 preserve-3d"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {values.list.map((value, idx) => {
              const icons = [
                <svg key="val-1" className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18zM12 18a3.75 3.75 0 00.495-7.467m-1.282.887a3.001 3.001 0 00-1.716 3.13C9.072 13.9 9 13.46 9 13c0-1.657 1.343-3 3-3V6m0 0a3 3 0 013 3v1m-6-4a3 3 0 013-3V6" /></svg>,
                <svg key="val-2" className="w-8 h-8 text-brand-magenta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
                <svg key="val-3" className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                <svg key="val-4" className="w-8 h-8 text-brand-magenta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
              ];
              return (
                <motion.div
                  key={value.title}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 flex flex-col items-center text-center shadow-lg rounded-2xl border border-brand-indigo/10 bg-brand-black/50 hover:bg-brand-surface hover:border-brand-cyan/30 transition-all h-full">
                    <div className="mb-4 p-3 bg-brand-surface border border-brand-indigo/20 rounded-2xl">
                      {icons[idx] || icons[0]}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2 font-display">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      {/* </motion.section> */}
      </section>

      {/* Convetly Promotion */}
      <ConvetlyPromotion />
    </motion.div>
  );
};

export default About;