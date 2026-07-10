import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { faqContent } from "../../constants/homeContent";
import { AnimatedLogo } from "../shared/AnimatedLogo";

type FaqSectionProps = {
  openContact: () => void;
};

export function FaqSection({ openContact }: FaqSectionProps) {
  const { eyebrow, title, items } = faqContent;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-brand-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.question}
                  className={`card-surface overflow-hidden ${isOpen ? "border-brand-cyan/30" : ""}`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white">{item.question}</span>
                    <span className="ml-4 shrink-0 text-brand-cyan">{isOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-brand-indigo/20 px-6 pb-4"
                      >
                        <p className="pt-3 text-sm leading-relaxed text-gray-400">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 lg:sticky lg:top-24">
            <AnimatedLogo variant="faq" />
            <button
              type="button"
              onClick={openContact}
              className="rounded-full border border-brand-magenta/30 bg-brand-surface px-6 py-3 text-sm text-brand-lavender transition hover:border-brand-magenta"
            >
              We&apos;re here to help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
