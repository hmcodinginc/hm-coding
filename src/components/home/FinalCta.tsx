import { motion } from "framer-motion";
import { finalCtaContent } from "../../constants/homeContent";

type FinalCtaProps = {
  openContact: () => void;
};

export function FinalCta({ openContact }: FinalCtaProps) {
  const { title, description, buttonLabel } = finalCtaContent;

  return (
    <section className="bg-brand-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-4xl rounded-2xl bg-brand-gradient p-10 text-center md:p-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/85">{description}</p>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-magenta transition hover:opacity-95"
            onClick={openContact}
          >
            {buttonLabel}
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
