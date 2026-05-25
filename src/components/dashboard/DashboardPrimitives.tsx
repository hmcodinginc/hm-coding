import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cardHover, kpiGlowHover } from "../../animations/motion";

type DashboardCardProps = {
  className: string;
  children: ReactNode;
  /** Adds default stat-style hover motion (pairs with Framer Motion host). */
  interactive?: boolean;
  /** Soft gradient shadow on hover (KPI / stat tiles). */
  glowOnHover?: boolean;
  /** When false, renders a plain div (nested tiles, static shells). */
  motion?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function DashboardCard({
  className,
  children,
  interactive = false,
  glowOnHover = false,
  motion: useMotion = true,
  ...motionProps
}: DashboardCardProps) {
  const surfaceClass = [
    className,
    interactive && glowOnHover ? kpiGlowHover : "",
    interactive && !glowOnHover ? "transition-shadow duration-300 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-slate-950/40" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!useMotion) {
    return <div className={surfaceClass}>{children}</div>;
  }

  const hoverProps = interactive
    ? { whileHover: cardHover.whileHover, transition: { type: "spring" as const, stiffness: 300 } }
    : {};

  return (
    <motion.div className={surfaceClass} {...hoverProps} {...motionProps}>
      {children}
    </motion.div>
  );
}

export type SectionHeaderLayout = "bordered" | "row";

export type SectionHeaderProps = {
  eyebrow: string;
  eyebrowClassName: string;
  title: string;
  titleClassName: string;
  titleAs?: "h2" | "h3" | "p";
  layout: SectionHeaderLayout;
  trailing?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  titleAs: TitleTag = "h3",
  layout,
  trailing,
}: SectionHeaderProps) {
  const stack = (
    <>
      <p className={eyebrowClassName}>{eyebrow}</p>
      <TitleTag className={titleClassName}>{title}</TitleTag>
    </>
  );

  if (layout === "bordered") {
    return <div className="border-b border-slate-200/70 px-6 py-5 dark:border-slate-700">{stack}</div>;
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">{stack}</div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}

const statusBadgeBase = "inline-flex rounded-full px-3 py-1 text-xs font-semibold";

type StatusBadgeProps = ComponentPropsWithoutRef<"span"> & {
  toneClassName: string;
};

export function StatusBadge({ toneClassName, className = "", children, ...rest }: StatusBadgeProps) {
  return (
    <span className={`${statusBadgeBase} ${toneClassName} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}

type GradientIconProps = {
  children: ReactNode;
  className?: string;
};

export function GradientIcon({
  children,
  className = "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 text-2xl text-white shadow-md shadow-cyan-500/20",
}: GradientIconProps) {
  return <div className={className}>{children}</div>;
}

type InfoRowProps = {
  start: ReactNode;
  end: ReactNode;
  className?: string;
};

export function InfoRow({ start, end, className = "flex items-start justify-between gap-4" }: InfoRowProps) {
  return (
    <div className={className}>
      <div>{start}</div>
      <div>{end}</div>
    </div>
  );
}

export type CTASectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  sectionClassName?: string;
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  sectionClassName = "rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-cyan-900 p-10 text-white shadow-2xl shadow-cyan-500/10",
}: CTASectionProps) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm text-cyan-100/80 sm:text-base">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20">
            {primaryCta}
          </button>
          <button className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
            {secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
