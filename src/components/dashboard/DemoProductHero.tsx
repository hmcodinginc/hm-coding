import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { heroPanelHover } from "../../animations/motion";
import { DashboardCard } from "./DashboardPrimitives";
import { dashboardShell } from "./dashboardShell";
import type { DemoHeroContent, DemoHeroInsight } from "../../types/demoHeroTypes";

export type DemoProductHeroProps = {
  gradientClassName: string;
  shadowClassName: string;
  descriptionClassName: string;
  insightLabelClassName: string;
  insightDetailClassName: string;
  badgeTagClassName?: string;
  content: DemoHeroContent;
  insights: DemoHeroInsight[];
  preview: ReactNode;
  previewEyebrow?: string;
};

export function DemoProductHero({
  gradientClassName,
  shadowClassName,
  descriptionClassName,
  insightLabelClassName,
  insightDetailClassName,
  badgeTagClassName = "text-cyan-100",
  content,
  insights,
  preview,
  previewEyebrow = "Live workflow",
}: DemoProductHeroProps) {
  return (
    <section className={`overflow-hidden rounded-3xl p-6 text-white sm:p-8 ${gradientClassName} ${shadowClassName}`}>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/75">{content.badgeLead}</span>
            <span className={`rounded-full bg-white/20 px-2 py-1 ${badgeTagClassName}`}>{content.badgeTag}</span>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className={`max-w-xl text-lg sm:text-xl ${descriptionClassName}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="grid gap-3 sm:grid-cols-2 sm:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            <button
              type="button"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10"
            >
              {content.primaryCta}
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {content.secondaryCta}
            </button>
          </motion.div>
        </div>

        <div className="relative lg:translate-y-1">
          <div
            className="pointer-events-none absolute -right-3 top-4 hidden h-[88%] w-full rounded-3xl border border-white/10 bg-white/5 lg:block"
            aria-hidden
          />
          <motion.div
            className={`relative ${dashboardShell.heroGlassPanel} space-y-4`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={heroPanelHover.whileHover}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {insights.map((insight) => (
                <DashboardCard key={insight.label} motion={false} className={dashboardShell.heroInsightTile}>
                  <p className={`text-xs uppercase tracking-[0.22em] ${insightLabelClassName}`}>{insight.label}</p>
                  <p className="mt-3 text-2xl font-semibold sm:text-3xl">{insight.value}</p>
                  <p className={`mt-2 text-xs sm:text-sm ${insightDetailClassName}`}>{insight.detail}</p>
                </DashboardCard>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 shadow-inner shadow-black/20 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{previewEyebrow}</p>
              <div className="mt-3">{preview}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
