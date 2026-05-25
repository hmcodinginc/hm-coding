import { useState } from "react";
import { useContactModal } from "../../context/useContactModal";
import type { DemoCtaBandContent, DemoProductDetailsContent } from "../../types/demoProductDetailsTypes";
import { DemoProductDetailsModal } from "./DemoProductDetailsModal";

export type DemoCtaSectionProps = {
  band: DemoCtaBandContent;
  details: DemoProductDetailsContent;
  sectionClassName?: string;
};

export function DemoCtaSection({
  band,
  details,
  sectionClassName = "rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-cyan-900 p-6 text-white shadow-2xl shadow-cyan-500/10 sm:p-8 md:p-10",
}: DemoCtaSectionProps) {
  const { openContact } = useContactModal();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleContactFromDetails = () => {
    setDetailsOpen(false);
    openContact();
  };

  return (
    <>
      <section className={sectionClassName}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80 sm:text-sm">{band.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">{band.title}</h2>
            <p className="mt-4 max-w-2xl text-sm text-cyan-100/85 sm:text-base">{band.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:max-w-xl lg:grid-cols-2 xl:max-w-none">
            <button
              type="button"
              onClick={openContact}
              className="w-full rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20"
            >
              {band.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="w-full rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {band.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <DemoProductDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        content={details}
        onContact={handleContactFromDetails}
      />
    </>
  );
}
