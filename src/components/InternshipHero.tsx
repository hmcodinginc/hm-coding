import React from "react";
import { InternshipPromoCard } from "./shared/InternshipPromoCard";

interface Props {
  onApplyNow: () => void;
}

const InternshipHero: React.FC<Props> = ({ onApplyNow }) => {
  return (
    <section className="relative overflow-hidden border-y border-brand-indigo/10 bg-brand-black py-24 perspective-3d preserve-3d">
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
            Campus <span className="text-gradient-brand">Internship Program</span>
          </>
        }
        description="Build real-world digital products, work with actual clients, and earn based on your impact — not fixed limits."
        buttonLabel="Apply Now"
        onButtonClick={onApplyNow}
      />
    </section>
  );
};

export default InternshipHero;
