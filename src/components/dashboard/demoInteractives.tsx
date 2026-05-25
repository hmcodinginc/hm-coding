import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem } from "../../animations/motion";

export function LivePulseIndicator({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`.trim()} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
    </span>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

export function StaggerReveal({ children, className, as = "div" }: StaggerRevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-32px" }}
      variants={staggerContainer}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Tag = motion[as];
  return (
    <Tag variants={staggerItem} className={className}>
      {children}
    </Tag>
  );
}

type MetricRevealProps = {
  children: ReactNode;
  className?: string;
};

export function MetricReveal({ children, className }: MetricRevealProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

type DemoTableRowProps = {
  children: ReactNode;
  className?: string;
};

export function DemoTableRow({ children, className = "" }: DemoTableRowProps) {
  return (
    <motion.tr
      className={`transition-colors hover:bg-slate-50/90 dark:hover:bg-slate-800/50 ${className}`.trim()}
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.tr>
  );
}
