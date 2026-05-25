import {
  clientReminderCustomerRemindersSection,
  clientReminderCustomers,
  clientReminderHeroContent,
  clientReminderHeroInsights,
  clientReminderHeroWorkflow,
  clientReminderLiveActivityContent,
  clientReminderLiveActivityStats,
  clientReminderStatusBadgeClasses,
  clientReminderTableColumns,
} from "../../../constants/clientReminderCRM";
import {
  CrmHeroPreview,
  DashboardCard,
  DemoProductHero,
  DemoTableRow,
  GradientIcon,
  InfoRow,
  LivePulseIndicator,
  MetricReveal,
  SectionHeader,
  StatusBadge,
  dashboardShell,
} from "../../dashboard";
import type {
  ClientReminderStat,
  CustomerReminder,
  NotificationPreview,
  PaymentReminder,
} from "../../../types/clientReminderCRMTypes";

export function ClientReminderHero() {
  return (
    <DemoProductHero
      gradientClassName="bg-gradient-to-r from-cyan-500 via-purple-600 to-violet-800"
      shadowClassName="shadow-2xl shadow-cyan-500/20"
      descriptionClassName="text-cyan-100/90"
      insightLabelClassName="text-cyan-100/80"
      insightDetailClassName="text-cyan-50/85"
      badgeTagClassName="text-cyan-100"
      content={clientReminderHeroContent}
      insights={clientReminderHeroInsights}
      previewEyebrow="Reminder queue"
      preview={<CrmHeroPreview rows={clientReminderHeroWorkflow} />}
    />
  );
}

export function StatCard({ stat }: { stat: ClientReminderStat }) {
  return (
    <DashboardCard interactive glowOnHover className={dashboardShell.glassInteractive}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{stat.label}</p>
          <MetricReveal className="mt-4 block text-3xl font-semibold text-slate-900 dark:text-white">{stat.value}</MetricReveal>
        </div>
        <GradientIcon>{stat.icon}</GradientIcon>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{stat.detail}</p>
    </DashboardCard>
  );
}

function ReminderTableRow({ customer }: { customer: CustomerReminder }) {
  return (
    <DemoTableRow>
      <td className="px-4 py-4 sm:px-6">
        <div className="font-semibold text-slate-900 dark:text-white">{customer.name}</div>
        <div className="text-xs text-slate-500">{customer.company}</div>
      </td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300 sm:px-6">{customer.reminder}</td>
      <td className="px-4 py-4 text-slate-600 dark:text-slate-300 sm:px-6">{customer.due}</td>
      <td className="px-4 py-4 sm:px-6">
        <StatusBadge toneClassName={clientReminderStatusBadgeClasses[customer.status]}>{customer.status}</StatusBadge>
      </td>
    </DemoTableRow>
  );
}

export function CustomerRemindersTable() {
  return (
    <DashboardCard
      className={dashboardShell.dataTable}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        layout="bordered"
        eyebrow={clientReminderCustomerRemindersSection.eyebrow}
        eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
        title={clientReminderCustomerRemindersSection.title}
        titleAs="h2"
        titleClassName="mt-3 text-2xl font-semibold text-slate-900 dark:text-white"
      />
      <div className="-mx-px overflow-x-auto">
        <table className="min-w-[640px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-500 dark:bg-slate-900/90 dark:text-slate-400">
            <tr>
              {clientReminderTableColumns.map((col) => (
                <th key={col} className="px-4 py-4 sm:px-6">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {clientReminderCustomers.map((customer) => (
              <ReminderTableRow key={customer.name} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

export function LiveActivityPanel() {
  return (
    <DashboardCard interactive glowOnHover className={dashboardShell.glassInteractive}>
      <SectionHeader
        layout="row"
        eyebrow={clientReminderLiveActivityContent.eyebrow}
        eyebrowClassName="text-sm uppercase tracking-[0.24em] text-slate-500"
        title={clientReminderLiveActivityContent.title}
        titleAs="p"
        titleClassName="mt-4 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl"
        trailing={
          <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <LivePulseIndicator />
            {clientReminderLiveActivityContent.activeLabel}
          </div>
        }
      />
      <div className="mt-6 space-y-4">
        <DashboardCard motion={false} className={dashboardShell.liveHighlight}>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-100/80">{clientReminderLiveActivityContent.nextReminderEyebrow}</p>
          <p className="mt-3 text-xl font-semibold sm:text-2xl">{clientReminderLiveActivityContent.nextReminderTitle}</p>
          <p className="mt-2 text-sm text-cyan-100/80">{clientReminderLiveActivityContent.nextReminderDetail}</p>
        </DashboardCard>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
          {clientReminderLiveActivityStats.map((stat) => (
            <DashboardCard key={stat.label} motion={false} className={dashboardShell.nestedMutedStat}>
              <MetricReveal className="block font-semibold text-slate-900 dark:text-white">{stat.value}</MetricReveal>
              <p className="mt-1">{stat.label}</p>
            </DashboardCard>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

export function PaymentCard({ item }: { item: PaymentReminder }) {
  return (
    <DashboardCard
      motion={false}
      className={`${dashboardShell.nestedPayment} transition-colors hover:border-purple-200/80 dark:hover:border-purple-800/60`}
    >
      <InfoRow
        start={
          <>
            <p className="font-semibold text-slate-900 dark:text-white">{item.client}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.type}</p>
          </>
        }
        end={
          <div className="text-right">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.amount}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.due}</p>
          </div>
        }
      />
    </DashboardCard>
  );
}

export function NotificationCard({ item }: { item: NotificationPreview }) {
  return (
    <DashboardCard motion={false} className={`${dashboardShell.nestedNotification} transition-opacity hover:bg-white/15`}>
      <InfoRow
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        start={
          <>
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm text-slate-100/80">{item.description}</p>
          </>
        }
        end={<span className="shrink-0 text-xs text-slate-200">{item.time}</span>}
      />
    </DashboardCard>
  );
}
