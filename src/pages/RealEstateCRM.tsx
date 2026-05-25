import { motion } from "framer-motion";
import { pageTransition } from "../animations/motion";
import {
  DashboardCard,
  DemoCtaSection,
  DemoPageFooter,
  DemoProductHero,
  DemoTableRow,
  MetricReveal,
  PipelineStagePreview,
  RealEstateHeroPreview,
  SectionHeader,
  StatusBadge,
  dashboardShell,
  demoPageLayout,
} from "../components/dashboard";
import {
  estateAnalyticsMetrics,
  estateCtaContent,
  estateDemoHero,
  estateProductDetails,
  estateHeroInsights,
  estateHeroPipelineStages,
  estateHeroWorkflow,
  estateListings,
  estateShowings,
} from "../constants/realEstateCRM";
import type { EstateListing } from "../types/realEstateCRMTypes";

const listingStageClass: Record<EstateListing["stage"], string> = {
  lead: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  showing: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  offer: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  closed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
};

export default function RealEstateCRM() {
  return (
    <motion.div
      className={demoPageLayout}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <DemoProductHero
        gradientClassName="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600"
        shadowClassName="shadow-xl shadow-orange-500/25"
        descriptionClassName="text-amber-50/95"
        insightLabelClassName="text-amber-100/80"
        insightDetailClassName="text-orange-50/85"
        badgeTagClassName="text-amber-100"
        content={estateDemoHero}
        insights={estateHeroInsights}
        previewEyebrow="Pipeline & showings"
        preview={
          <div className="space-y-3">
            <PipelineStagePreview stages={estateHeroPipelineStages} />
            <RealEstateHeroPreview rows={estateHeroWorkflow} />
          </div>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {estateAnalyticsMetrics.map((m) => (
          <DashboardCard key={m.label} interactive glowOnHover className={dashboardShell.glassInteractive}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{m.label}</p>
                <MetricReveal className="mt-3 block text-2xl font-semibold text-slate-900 dark:text-white">{m.value}</MetricReveal>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{m.delta}</p>
              </div>
              <span className="text-2xl" aria-hidden>
                {m.icon}
              </span>
            </div>
          </DashboardCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <DashboardCard
          className={dashboardShell.dataTable}
          interactive={false}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            layout="bordered"
            eyebrow="Listings"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Active properties"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <div className="-mx-px overflow-x-auto px-2 pb-4 pt-2">
            <table className="min-w-[600px] w-full text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Agent</th>
                  <th className="px-4 py-3 font-medium text-right">Price</th>
                  <th className="px-4 py-3 font-medium text-right">DOM</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {estateListings.map((listing) => (
                  <DemoTableRow key={listing.id}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {listing.address}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{listing.id}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{listing.agent}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{listing.price}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">{listing.daysOnMarket}d</td>
                    <td className="px-4 py-3">
                      <StatusBadge toneClassName={listingStageClass[listing.stage]} className="capitalize">
                        {listing.stage}
                      </StatusBadge>
                    </td>
                  </DemoTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard
          className={`${dashboardShell.dataTable} flex flex-col p-0`}
          interactive={false}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          <SectionHeader
            layout="bordered"
            eyebrow="Calendar"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Upcoming showings"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {estateShowings.map((showing) => (
              <li key={showing.id} className="px-6 py-4">
                <p className="font-semibold text-slate-900 dark:text-white">{showing.property}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {showing.client} · {showing.agent}
                </p>
                <p className="mt-2 text-xs font-medium text-orange-600 dark:text-orange-400">{showing.time}</p>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </section>

      <DemoCtaSection band={estateCtaContent} details={estateProductDetails} />

      <DemoPageFooter projectLabel="Real Estate CRM demo" />
    </motion.div>
  );
}
