import type { ReactNode } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  isActive: boolean;
  onSelect: () => void;
};

export function ServiceCard({
  title,
  description,
  icon,
  isActive,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-full w-full flex-col items-center justify-center rounded-2xl p-8 text-center transition-all duration-300 ${
        isActive
          ? "border-2 border-brand-cyan bg-brand-surface shadow-neon-cyan/30 scale-[1.02]"
          : "card-surface-hover border border-brand-indigo/10 hover:border-brand-cyan/50"
      }`}
      aria-pressed={isActive}
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-indigo/20 bg-brand-black/50 shadow-inner">
        {icon}
      </div>
      <h3 className="mb-3 font-display text-2xl font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400 w-full max-w-[240px] sm:max-w-[280px]">{description}</p>
    </button>
  );
}
