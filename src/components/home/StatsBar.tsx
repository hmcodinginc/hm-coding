import { motion } from "framer-motion";

export function StatsBar() {
  const text1 = "Building Tomorrow, Today.";
  const text2 = "HM Coding creates future-ready digital solutions that help businesses innovate, grow, and lead.";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 4, display: "inline-block" },
    visible: { opacity: 1, y: 0, display: "inline-block" }
  };

  return (
    <section className="border-y border-brand-indigo/20 bg-brand-black py-14 overflow-hidden">
      <motion.h2 
        className="text-center font-medium italic text-white drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] text-base sm:text-lg md:text-xl tracking-wide max-w-2xl mx-auto leading-relaxed px-6 sm:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="block mb-3 whitespace-normal">
          {text1.split(" ").map((word, wIdx) => (
            <span key={`w1-${wIdx}`} className="inline-block mr-1 sm:mr-1.5">
              {word.split("").map((char, cIdx) => (
                <motion.span key={`c1-${wIdx}-${cIdx}`} variants={childVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
        <span className="block whitespace-normal">
          {text2.split(" ").map((word, wIdx) => (
            <span key={`w2-${wIdx}`} className="inline-block mr-1 sm:mr-1.5">
              {word.split("").map((char, cIdx) => (
                <motion.span key={`c2-${wIdx}-${cIdx}`} variants={childVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </motion.h2>
    </section>
  );
}
