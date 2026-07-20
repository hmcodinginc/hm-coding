import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InternshipPromoCard } from "./shared/InternshipPromoCard";

interface Props {
  onSendIdea: () => void;
}

const items = [
  {
    title: "Client Acquisition",
    details:
      "You will learn how to identify potential clients, communicate effectively, and close deals. This includes real-world exposure to sales, negotiation, and understanding business requirements.",
  },
  {
    title: "Development & Execution",
    details:
      "Work on actual projects using modern technologies. You’ll collaborate with developers, understand project structure, and contribute to building real systems used by clients.",
  },
  {
    title: "Product & Idea Building",
    details:
      "Turn ideas into real products. You’ll learn how to structure, validate, and build startup ideas with guidance — including architecture and execution planning.",
  },
];

const InternshipDetails: React.FC<Props> = ({ onSendIdea }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-black perspective-3d preserve-3d border-t border-brand-indigo/10">
      <div className="max-w-6xl mx-auto px-6 preserve-3d">

        {/* TITLE */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-white mb-16 font-display tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What You’ll <span className="text-gradient-brand">Work On</span>
        </motion.h2>

        {/* CARDS */}
        <motion.div 
          className="mx-auto w-full max-w-[380px] md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 preserve-3d"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div 
                key={item.title} 
                className="flex flex-col relative"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <motion.div
                  className={`p-6 rounded-2xl transition-all duration-300 text-center cursor-pointer shadow-lg ${
                    isActive 
                      ? "border border-brand-cyan bg-brand-surface shadow-neon-cyan/20" 
                      : "border border-brand-indigo/10 bg-brand-black/50 hover:bg-brand-surface hover:border-brand-cyan/30"
                  }`}
                  onClick={() => handleClick(index)}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-white font-display">
                    {item.title}
                  </h3>
                </motion.div>

                {/* DETAILS */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="mt-4 p-6 bg-brand-surface border border-brand-indigo/20 rounded-xl shadow-2xl text-sm leading-relaxed text-gray-300 preserve-3d origin-top"
                      initial={{ opacity: 0, height: 0, rotateX: -15, transformOrigin: "top" }}
                      animate={{ opacity: 1, height: "auto", rotateX: 0 }}
                      exit={{ opacity: 0, height: 0, rotateX: -15 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <p style={{ transform: "translateZ(10px)" }}>
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* STARTUP SECTION — same animation shell as Campus Internship Program */}
        <div className="relative mt-20 overflow-hidden rounded-3xl perspective-3d preserve-3d">
          <div
            className="pointer-events-none absolute left-10 top-1/4 h-72 w-72 animate-float-orb-slow rounded-full bg-brand-cyan/10 blur-3xl"
            style={{ transform: "translateZ(-40px)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-1/4 right-10 h-80 w-80 animate-float-orb-delayed rounded-full bg-brand-magenta/5 blur-3xl"
            style={{ transform: "translateZ(-60px)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(72,207,203,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(72,207,203,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />

          <InternshipPromoCard
            title={
              <>
                Have a <span className="text-gradient-brand">Startup Idea?</span>
              </>
            }
            description="We help you turn your idea into a real product with proper guidance, technical direction, and execution strategy."
            buttonLabel="Send Your Idea"
            onButtonClick={onSendIdea}
            buttonClassName="bg-brand-magenta text-white shadow-neon-magenta"
          />
        </div>

      </div>
    </section>
  );
};

export default InternshipDetails;
