import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { heroPanelHover } from "../../animations/motion";
import { DashboardCard } from "./DashboardPrimitives";
import { dashboardShell } from "./dashboardShell";
import type { DemoHeroContent, DemoHeroInsight } from "../../types/demoHeroTypes";
import { Section } from "../ui/Section";
import { Heading, Text } from "../ui/Typography";
import { Button } from "../ui/Button";

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
    <Section paddingSpacing="sm" containerFluid className={`overflow-hidden rounded-b-3xl text-white ${gradientClassName} ${shadowClassName}`}>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 sm:space-y-6">
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] sm:text-xs font-semibold backdrop-blur sm:gap-2 sm:px-4 sm:py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/75">{content.badgeLead}</span>
            <span className={`rounded-full bg-white/20 px-2 py-1 ${badgeTagClassName}`}>{content.badgeTag}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }}>
            <Heading level={1} className="w-full">
              {content.title}
            </Heading>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.5 }}>
            <Text variant="lead" className={`w-full sm:max-w-xl ${descriptionClassName}`}>
              {content.description}
            </Text>
          </motion.div>

          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            <Button variant="primary" size="md" className="w-auto sm:w-56 text-slate-900 bg-white">
              {content.primaryCta}
            </Button>
            <Button variant="outline" size="md" className="w-auto sm:w-56 border-white/40 text-white bg-white/10 hover:bg-white/20">
              {content.secondaryCta}
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none lg:translate-y-1">
          <div
            className="pointer-events-none absolute -right-3 top-4 hidden h-[88%] w-full rounded-3xl border border-white/10 bg-white/5 lg:block"
            aria-hidden
          />
          <motion.div
            className={`relative overflow-hidden ${dashboardShell.heroGlassPanel} space-y-3 sm:space-y-4`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={heroPanelHover.whileHover}
          >
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {insights.map((insight) => (
                <DashboardCard key={insight.label} motion={false} className={dashboardShell.heroInsightTile}>
                  <p className={`text-xs uppercase tracking-[0.22em] ${insightLabelClassName}`}>{insight.label}</p>
                  <p className="mt-2 text-xl font-semibold sm:mt-3 sm:text-3xl">{insight.value}</p>
                  <p className={`mt-1.5 text-xs sm:mt-2 sm:text-sm ${insightDetailClassName}`}>{insight.detail}</p>
                </DashboardCard>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3 shadow-inner shadow-black/20 backdrop-blur-md sm:rounded-2xl sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{previewEyebrow}</p>
              <div className="mt-2.5 sm:mt-3">{preview}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
