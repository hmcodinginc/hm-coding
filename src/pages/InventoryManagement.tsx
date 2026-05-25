import { motion } from "framer-motion";
import { pageTransition } from "../animations/motion";
import {
  DashboardCard,
  DemoCtaSection,
  DemoPageFooter,
  DemoProductHero,
  DemoTableRow,
  InventoryHeroPreview,
  MetricReveal,
  SectionHeader,
  StaggerItem,
  StaggerReveal,
  StatusBadge,
  dashboardShell,
  demoPageLayout,
} from "../components/dashboard";
import {
  inventoryActivityTimeline,
  inventoryCtaContent,
  inventoryDemoHero,
  inventoryProductDetails,
  inventoryHeroInsights,
  inventoryHeroWorkflow,
  inventoryLowStockAlerts,
  inventoryMetrics,
  inventoryShipments,
  inventorySkuAnalytics,
  inventoryVendors,
  inventoryWarehouseZones,
} from "../constants/inventoryManagement";
import type {
  InventoryShipment,
  InventoryVendor,
  LowStockAlert,
  WarehouseZone,
} from "../types/inventoryManagementTypes";

const zoneStatusClass: Record<WarehouseZone["status"], string> = {
  optimal: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  congested: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  receiving: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
};

const alertSeverityClass: Record<LowStockAlert["severity"], string> = {
  critical: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  watch: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
};

const vendorStatusClass: Record<InventoryVendor["status"], string> = {
  preferred: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  review: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
};

const shipmentStatusClass: Record<InventoryShipment["status"], string> = {
  "in-transit": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  customs: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  delayed: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

const activityKindIcon: Record<(typeof inventoryActivityTimeline)[number]["kind"], string> = {
  receive: "📥",
  pick: "📤",
  adjust: "⚖️",
  alert: "⚠️",
  ship: "🚛",
};

function utilizationPercent(zone: WarehouseZone) {
  return Math.round((zone.unitsOnHand / zone.capacity) * 100);
}

export default function InventoryManagement() {
  return (
    <motion.div
      className={demoPageLayout}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <DemoProductHero
        gradientClassName="bg-gradient-to-r from-slate-600 via-indigo-600 to-blue-700"
        shadowClassName="shadow-xl shadow-indigo-500/25"
        descriptionClassName="text-indigo-50/95"
        insightLabelClassName="text-indigo-100/80"
        insightDetailClassName="text-blue-50/85"
        badgeTagClassName="text-blue-100"
        content={inventoryDemoHero}
        insights={inventoryHeroInsights}
        previewEyebrow="Stock exceptions"
        preview={<InventoryHeroPreview rows={inventoryHeroWorkflow} />}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {inventoryMetrics.map((m) => (
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

      <section className="grid gap-4 lg:grid-cols-3">
        {inventoryWarehouseZones.map((zone, index) => {
          const pct = utilizationPercent(zone);
          return (
            <DashboardCard
              key={zone.id}
              interactive
              glowOnHover
              className={dashboardShell.glassInteractive}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    {zone.id}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{zone.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{zone.location}</p>
                </div>
                <StatusBadge toneClassName={zoneStatusClass[zone.status]} className="capitalize shrink-0">
                  {zone.status}
                </StatusBadge>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Utilization</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 95 ? "bg-amber-500" : pct >= 80 ? "bg-indigo-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">SKUs</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">{zone.skus.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400">On hand</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">{zone.unitsOnHand.toLocaleString()}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-500 dark:text-slate-400">Throughput</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">{zone.pickRate}</dd>
                </div>
              </dl>
            </DashboardCard>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
        <DashboardCard
          className={dashboardShell.glassRaised}
          interactive={false}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            layout="row"
            eyebrow="Alerts"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-rose-600 dark:text-rose-400"
            title="Low stock"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
            trailing={
              <span className="rounded-2xl bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">
                {inventoryLowStockAlerts.length} active
              </span>
            }
          />
          <ul className="mt-6 space-y-3">
            {inventoryLowStockAlerts.map((alert) => (
              <li
                key={alert.id}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{alert.product}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {alert.sku} · {alert.vendor}
                    </p>
                  </div>
                  <StatusBadge toneClassName={alertSeverityClass[alert.severity]} className="capitalize shrink-0">
                    {alert.severity}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">{alert.onHand}</span> on hand · reorder
                  at {alert.reorderPoint}
                </p>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard
          className={dashboardShell.dataTable}
          interactive={false}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          <SectionHeader
            layout="bordered"
            eyebrow="Procurement"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Vendor management"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <div className="-mx-px overflow-x-auto px-2 pb-4 pt-2">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Vendor</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Lead time</th>
                  <th className="px-4 py-3 font-medium text-right">Open POs</th>
                  <th className="px-4 py-3 font-medium text-right">On-time</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {inventoryVendors.map((v) => (
                  <DemoTableRow key={v.id}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {v.name}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{v.id}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{v.category}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{v.leadTime}</td>
                    <td className="px-4 py-3 text-right text-slate-900 dark:text-white">{v.openPOs}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{v.onTimeRate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge toneClassName={vendorStatusClass[v.status]} className="capitalize">
                        {v.status}
                      </StatusBadge>
                    </td>
                  </DemoTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </section>

      <section>
        <SectionHeader
          layout="row"
          eyebrow="Logistics"
          eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500 px-0"
          title="Shipment tracking"
          titleAs="h2"
          titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {inventoryShipments.map((ship, index) => (
            <DashboardCard
              key={ship.id}
              interactive
              className={`${dashboardShell.glassInteractive} relative overflow-hidden`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-blue-600" aria-hidden />
              <div className="pl-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">{ship.id}</p>
                  <StatusBadge toneClassName={shipmentStatusClass[ship.status]} className="capitalize">
                    {ship.status.replace("-", " ")}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{ship.carrier}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {ship.origin} → {ship.destination}
                </p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-2 border-t border-slate-200/70 pt-3 dark:border-slate-700">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{ship.eta}</span>
                  <span className="text-sm text-slate-500">{ship.units.toLocaleString()} units</span>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </section>

      <DashboardCard
        className={dashboardShell.glassRaised}
        interactive={false}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader
          layout="row"
          eyebrow="Performance"
          eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
          title="SKU analytics"
          titleAs="h2"
          titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          trailing={
            <span className="rounded-2xl bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200">
              Top movers
            </span>
          }
        />
        <div className="mt-6 space-y-4">
          {inventorySkuAnalytics.map((sku) => {
            const turnoverWidth = Math.min(100, Math.round((60 / sku.turnoverDays) * 100));
            return (
              <div key={sku.sku} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{sku.sku}</p>
                    <p className="text-xs text-slate-500">{sku.category}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>
                      Fill <strong className="text-slate-900 dark:text-white">{sku.fillRate}</strong>
                    </span>
                    <span>
                      Margin <strong className="text-slate-900 dark:text-white">{sku.margin}</strong>
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Turnover velocity</span>
                    <span>{sku.turnoverDays} day cycle</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600" style={{ width: `${turnoverWidth}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>

      <DashboardCard
        className={dashboardShell.glassRaised}
        interactive={false}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader
          layout="bordered"
          eyebrow="Operations log"
          eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
          title="Activity timeline"
          titleAs="h2"
          titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
        />
        <StaggerReveal as="ol" className="space-y-0 px-4 py-4 sm:px-6">
          {inventoryActivityTimeline.map((item, index) => (
            <StaggerItem as="li" key={item.id} className="relative flex gap-4 pb-8 last:pb-2">
              {index < inventoryActivityTimeline.length - 1 ? (
                <span
                  className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-200 bg-white text-lg dark:border-indigo-800 dark:bg-slate-900">
                {activityKindIcon[item.kind]}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {item.actor}
                    <span className="font-normal text-slate-500 dark:text-slate-400"> · {item.action}</span>
                  </p>
                  <time className="text-xs text-slate-500">{item.time}</time>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </DashboardCard>

      <DemoCtaSection band={inventoryCtaContent} details={inventoryProductDetails} />

      <DemoPageFooter projectLabel="Inventory Management demo" />
    </motion.div>
  );
}
