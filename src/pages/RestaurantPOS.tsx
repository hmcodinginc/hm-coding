import { motion } from "framer-motion";
import { pageTransition } from "../animations/motion";
import {
  DashboardCard,
  DemoCtaSection,
  DemoPageFooter,
  DemoProductHero,
  DemoTableRow,
  MetricReveal,
  PosHeroPreview,
  SectionHeader,
  StaggerItem,
  StaggerReveal,
  StatusBadge,
  dashboardShell,
  demoPageLayout,
} from "../components/dashboard";
import {
  posAnalyticsMetrics,
  posDemoHero,
  posHeroInsights,
  posHeroWorkflow,
  posKitchenQueue,
  posOrdersOverview,
  posRecentTransactions,
  posCtaContent,
  posProductDetails,
  posRevenueSummary,
} from "../constants/restaurantPOS";
import type { PosOrderLine } from "../types/restaurantPOSTypes";

const orderStatusClass: Record<PosOrderLine["status"], string> = {
  open: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  fired: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  ready: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
};

const stationLabel: Record<(typeof posKitchenQueue)[number]["station"], string> = {
  grill: "Grill",
  fry: "Fry",
  cold: "Cold",
  dessert: "Dessert",
};

export default function RestaurantPOS() {
  return (
    <motion.div
      className={demoPageLayout}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <DemoProductHero
        gradientClassName="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-600"
        shadowClassName="shadow-xl shadow-orange-500/20"
        descriptionClassName="text-amber-50/95"
        insightLabelClassName="text-amber-100/80"
        insightDetailClassName="text-amber-50/85"
        badgeTagClassName="text-amber-100"
        content={posDemoHero}
        insights={posHeroInsights}
        previewEyebrow="Floor & kitchen"
        preview={<PosHeroPreview rows={posHeroWorkflow} />}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {posAnalyticsMetrics.map((m) => (
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

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
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
            eyebrow="Floor"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Orders overview"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <div className="-mx-px overflow-x-auto px-2 pb-4 pt-2">
            <table className="min-w-[560px] w-full text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticket</th>
                  <th className="px-4 py-3 font-medium">Table</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {posOrdersOverview.map((o) => (
                  <DemoTableRow key={o.id}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{o.id}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{o.table}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-slate-600 dark:text-slate-300">{o.items}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{o.total}</td>
                    <td className="px-4 py-3">
                      <StatusBadge toneClassName={orderStatusClass[o.status]} className="capitalize">
                        {o.status}
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
            eyebrow="Kitchen"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Queue preview"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <StaggerReveal as="ul" className="divide-y divide-slate-200 dark:divide-slate-700">
            {posKitchenQueue.map((t) => (
              <StaggerItem
                as="li"
                key={t.id}
                className="flex flex-wrap items-start justify-between gap-3 px-4 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 sm:px-6"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {t.id}{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">— {t.course}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.items}</p>
                </div>
                <div className="text-right">
                  <StatusBadge toneClassName="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {stationLabel[t.station]}
                  </StatusBadge>
                  <p className="mt-2 text-xs text-slate-500">{t.time}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </DashboardCard>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posRevenueSummary.map((r) => (
          <DashboardCard key={r.label} interactive glowOnHover className={dashboardShell.glassInteractive}>
            <p className="text-xs uppercase tracking-wide text-slate-500">{r.label}</p>
            <MetricReveal className="mt-3 block text-3xl font-semibold text-slate-900 dark:text-white">{r.value}</MetricReveal>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{r.sub}</p>
          </DashboardCard>
        ))}
      </section>

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
          eyebrow="Settlement"
          eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
          title="Recent transactions"
          titleAs="h2"
          titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
        />
        <div className="overflow-x-auto px-2 pb-4 pt-2">
          <table className="min-w-[520px] w-full text-left text-sm">
            <thead className="text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Ref</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {posRecentTransactions.map((tx) => (
                <DemoTableRow key={tx.id}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{tx.id}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{tx.method}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{tx.amount}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{tx.time}</td>
                </DemoTableRow>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <DemoCtaSection band={posCtaContent} details={posProductDetails} />

      <DemoPageFooter projectLabel="Restaurant POS demo" />
    </motion.div>
  );
}
