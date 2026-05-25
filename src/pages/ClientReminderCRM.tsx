import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "../animations/motion";
import {
  clientReminderNotifications,
  clientReminderNotificationsSection,
  clientReminderStats,
  clientReminderUpcomingPayments,
  clientReminderUpcomingPaymentsSection,
} from "../constants/clientReminderCRM";
import {
  DemoCtaSection,
  DemoPageFooter,
  SectionHeader,
  StaggerItem,
  StaggerReveal,
  dashboardShell,
  demoPageLayout,
} from "../components/dashboard";
import {
  clientReminderCtaContent,
  clientReminderProductDetails,
} from "../constants/clientReminderCRM";
import {
  ClientReminderHero,
  CustomerRemindersTable,
  LiveActivityPanel,
  NotificationCard,
  PaymentCard,
  StatCard,
} from "../components/projects/client-reminder-crm";

const ClientReminderCRM: React.FC = () => (
  <motion.div
    className={`${demoPageLayout} gap-12`}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
  >
    <ClientReminderHero />

    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
        {clientReminderStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <LiveActivityPanel />
    </section>

    <section className="grid gap-6 lg:grid-cols-[1fr_0.42fr] xl:grid-cols-[0.75fr_0.25fr]">
      <CustomerRemindersTable />

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        <div className={dashboardShell.glassRaised}>
          <SectionHeader
            layout="row"
            eyebrow={clientReminderUpcomingPaymentsSection.eyebrow}
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-slate-500"
            title={clientReminderUpcomingPaymentsSection.title}
            titleAs="h3"
            titleClassName="mt-3 text-xl font-semibold text-slate-900 dark:text-white"
            trailing={
              <div className="rounded-2xl bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                {clientReminderUpcomingPaymentsSection.countLabel}
              </div>
            }
          />
          <div className="mt-6 space-y-4">
            {clientReminderUpcomingPayments.map((payment) => (
              <PaymentCard key={payment.client} item={payment} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-900 p-6 shadow-lg shadow-cyan-500/10 text-white dark:border-slate-700">
          <SectionHeader
            layout="row"
            eyebrow={clientReminderNotificationsSection.eyebrow}
            eyebrowClassName="text-sm uppercase tracking-[0.22em] text-cyan-200/70"
            title={clientReminderNotificationsSection.title}
            titleAs="h3"
            titleClassName="mt-3 text-xl font-semibold"
            trailing={
              <span className="rounded-2xl bg-white/10 px-3 py-1 text-xs text-cyan-100/90">{clientReminderNotificationsSection.badge}</span>
            }
          />
          <StaggerReveal className="mt-6 space-y-4">
            {clientReminderNotifications.map((item) => (
              <StaggerItem key={item.title}>
                <NotificationCard item={item} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </motion.div>
    </section>

    <DemoCtaSection band={clientReminderCtaContent} details={clientReminderProductDetails} />

    <DemoPageFooter projectLabel="Client Reminder CRM demo" />
  </motion.div>
);

export default ClientReminderCRM;
