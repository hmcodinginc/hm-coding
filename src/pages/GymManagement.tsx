import { motion } from "framer-motion";
import { pageTransition } from "../animations/motion";
import {
  DashboardCard,
  DemoCtaSection,
  DemoPageFooter,
  DemoProductHero,
  DemoTableRow,
  GymHeroPreview,
  MetricReveal,
  SectionHeader,
  StaggerItem,
  StaggerReveal,
  StatusBadge,
  dashboardShell,
  demoPageLayout,
} from "../components/dashboard";
import {
  gymAnalyticsMetrics,
  gymAttendanceWeek,
  gymCtaContent,
  gymDemoHero,
  gymHeroInsights,
  gymHeroWorkflow,
  gymProductDetails,
  gymMemberActivity,
  gymMembershipTiers,
  gymRevenueSummary,
  gymTrainerSchedules,
  gymUpcomingClasses,
} from "../constants/gymManagement";
import type { GymMemberActivity, GymMembershipTier, GymUpcomingClass } from "../types/gymManagementTypes";

const classStatusClass: Record<GymUpcomingClass["status"], string> = {
  open: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  waitlist: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  full: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
};

const churnRiskClass: Record<GymMembershipTier["churnRisk"], string> = {
  low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  high: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

const activityKindIcon: Record<GymMemberActivity["kind"], string> = {
  "check-in": "🚪",
  booking: "📅",
  renewal: "🔄",
  freeze: "⏸️",
  pt: "💪",
};

export default function GymManagement() {
  return (
    <motion.div
      className={demoPageLayout}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <DemoProductHero
        gradientClassName="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600"
        shadowClassName="shadow-xl shadow-emerald-500/20"
        descriptionClassName="text-emerald-50/95"
        insightLabelClassName="text-emerald-100/80"
        insightDetailClassName="text-teal-50/85"
        badgeTagClassName="text-cyan-100"
        content={gymDemoHero}
        insights={gymHeroInsights}
        previewEyebrow="Tonight's classes"
        preview={<GymHeroPreview rows={gymHeroWorkflow} />}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {gymAnalyticsMetrics.map((m) => (
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
            eyebrow="Schedule"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Upcoming classes"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <div className="-mx-px overflow-x-auto px-2 pb-4 pt-2">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Trainer</th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium text-right">Fill</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {gymUpcomingClasses.map((c) => (
                  <DemoTableRow key={c.id}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {c.name}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">{c.id}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{c.trainer}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{c.room}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{c.time}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">
                      {c.enrolled}/{c.capacity}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge toneClassName={classStatusClass[c.status]} className="capitalize">
                        {c.status}
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
            eyebrow="Coaching"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Trainer schedules"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {gymTrainerSchedules.map((t) => (
              <li key={t.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t.trainer}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.specialty}</p>
                  <p className="mt-2 text-xs text-teal-600 dark:text-teal-400">{t.nextSession}</p>
                </div>
                <div className="text-left sm:text-right">
                  <StatusBadge toneClassName="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
                    {t.slots}
                  </StatusBadge>
                  <p className="mt-2 text-xs text-slate-500">{t.clientsToday} clients today</p>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
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
            eyebrow="Memberships"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Tier insights & retention"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
          />
          <div className="-mx-px overflow-x-auto px-2 pb-4 pt-2">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium text-right">Members</th>
                  <th className="px-4 py-3 font-medium text-right">Share</th>
                  <th className="px-4 py-3 font-medium text-right">MRR</th>
                  <th className="px-4 py-3 font-medium">Churn risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {gymMembershipTiers.map((row) => (
                  <DemoTableRow key={row.tier}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.tier}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">{row.members}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">{row.share}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{row.mrr}</td>
                    <td className="px-4 py-3">
                      <StatusBadge toneClassName={churnRiskClass[row.churnRisk]} className="capitalize">
                        {row.churnRisk}
                      </StatusBadge>
                    </td>
                  </DemoTableRow>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard
          className={dashboardShell.glassRaised}
          interactive={false}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          <SectionHeader
            layout="row"
            eyebrow="Floor traffic"
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title="Attendance analytics"
            titleAs="h2"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
            trailing={
              <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                This week
              </span>
            }
          />
          <div className="mt-6 space-y-3">
            {gymAttendanceWeek.map((d) => (
              <div
                key={d.day}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 text-sm font-bold text-slate-900 dark:text-white">{d.day}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{d.checkIns} check-ins</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Peak · {d.peakHour}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    d.vsAvg.startsWith("+")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {d.vsAvg} vs avg
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {gymRevenueSummary.map((r) => (
          <DashboardCard key={r.label} interactive glowOnHover className={dashboardShell.glassInteractive}>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{r.label}</p>
            <MetricReveal className="mt-3 block text-3xl font-semibold text-slate-900 dark:text-white">{r.value}</MetricReveal>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{r.sub}</p>
          </DashboardCard>
        ))}
      </section>

      <DashboardCard
        className="overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-950 via-teal-950 to-cyan-900 shadow-lg shadow-cyan-500/10 dark:border-slate-700"
        interactive={false}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/70">Live feed</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Recent member activity</h2>
        </div>
        <StaggerReveal as="ul" className="divide-y divide-white/10">
          {gymMemberActivity.map((item) => (
            <StaggerItem
              as="li"
              key={item.id}
              className="flex flex-wrap items-start justify-between gap-3 px-4 py-4 transition-colors hover:bg-white/5 sm:px-6"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg" aria-hidden>
                  {activityKindIcon[item.kind]}
                </span>
                <div>
                  <p className="font-semibold text-white">
                    {item.member}{" "}
                    <span className="font-normal text-cyan-100/80">— {item.action}</span>
                  </p>
                  <p className="mt-1 text-sm text-cyan-100/70">{item.detail}</p>
                </div>
              </div>
              <p className="shrink-0 text-xs text-cyan-200/60">{item.time}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </DashboardCard>

      <DemoCtaSection band={gymCtaContent} details={gymProductDetails} />

      <DemoPageFooter projectLabel="Gym Management demo" />
    </motion.div>
  );
}
