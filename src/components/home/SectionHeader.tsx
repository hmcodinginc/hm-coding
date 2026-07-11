import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-3xl mb-14 ${alignClass} ${className}`}
    >
      <motion.p 
        className="section-eyebrow text-brand-magenta"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {eyebrow}
      </motion.p>
      
      <div className="relative inline-block mt-3 pb-3">
        <motion.h2 
          className="font-display text-3xl font-extrabold text-white md:text-4xl tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.span 
          className={`absolute bottom-0 h-1 bg-gradient-to-r from-brand-cyan/60 to-brand-magenta/60 rounded-full w-12 ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          }`} 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: align === "center" ? "center" : "left" }}
        />
      </div>

      {description ? (
        <motion.p 
          className="mt-4 text-gray-400 leading-relaxed text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
