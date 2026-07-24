import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { processContent } from "../../constants/homeContent";

export function ProcessTimeline() {
  const { eyebrow, title, steps } = processContent;

  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <motion.div
          className="mx-auto w-full max-w-[380px] md:max-w-none grid grid-cols-1 gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {steps.map((step) => (
              <motion.div
                key={step.step}
                className="group flex flex-col items-center rounded-2xl border border-brand-indigo/10 bg-brand-surface/30 p-6 text-center transition-all duration-300 md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:border-brand-cyan/50 md:hover:bg-brand-surface/60 md:hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] active:scale-95"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-magenta font-display text-xl font-bold text-white shadow-neon-magenta transition-all duration-300 md:group-hover:scale-110 md:group-hover:bg-brand-cyan md:group-hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] md:group-hover:text-black">
                  {step.step}
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white transition-colors duration-300 md:group-hover:text-brand-cyan">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400 transition-colors duration-300 md:group-hover:text-gray-200">
                  {step.description}
                </p>
              </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
