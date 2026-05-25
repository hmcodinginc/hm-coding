import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { modalAnimation } from "../../animations/motion";
import type { DemoProductDetailsContent } from "../../types/demoProductDetailsTypes";

export type DemoProductDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: DemoProductDetailsContent;
  onContact: () => void;
};

export function DemoProductDetailsModal({ isOpen, onClose, content, onContact }: DemoProductDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-product-details-title"
            className="relative max-h-[min(90vh,720px)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-purple-900/15 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/95 sm:p-8"
            initial={modalAnimation.initial}
            animate={modalAnimation.animate}
            exit={modalAnimation.exit}
            transition={modalAnimation.transition}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close product details"
            >
              ✕
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-400">
              Product overview
            </p>
            <h2
              id="demo-product-details-title"
              className="mt-2 pr-8 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
            >
              {content.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{content.intro}</p>

            <div className="mt-6 space-y-5">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  What it does
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{content.whatItDoes}</p>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Workflow benefits
                </h3>
                <ul className="mt-2 space-y-2">
                  {content.workflowBenefits.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Business advantages
                </h3>
                <ul className="mt-2 space-y-2">
                  {content.businessAdvantages.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Built for
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{content.targetUsage}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{content.implementationNote}</p>
              </section>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
              <button
                type="button"
                onClick={onContact}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:opacity-95"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
