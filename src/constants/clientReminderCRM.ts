import type {
  ClientReminderStat,
  CustomerReminder,
  LiveActivityStat,
  NotificationPreview,
  PaymentReminder,
  ReminderStatus,
} from "../types/clientReminderCRMTypes";
import type { DemoHeroContent, DemoHeroInsight, DemoHeroWorkflowRow } from "../types/demoHeroTypes";

export const clientReminderStats: ClientReminderStat[] = [
  { label: "Active Clients", value: "128", detail: "+18% this month", icon: "👥" },
  { label: "Pending Reminders", value: "42", detail: "2 overdue", icon: "⏰" },
  { label: "Open Tickets", value: "8", detail: "All high-priority", icon: "📩" },
  { label: "Revenue Impact", value: "$42.1K", detail: "Forecast +12%", icon: "💜" },
];

export const clientReminderCustomers: CustomerReminder[] = [
  { name: "Ivy Gradient", company: "Aurora Events", reminder: "Send campaign follow-up", due: "Apr 28", status: "Pending" },
  { name: "Noah Patel", company: "Nova Fit Studio", reminder: "Review renewal terms", due: "Apr 30", status: "Confirmed" },
  { name: "Maya Lin", company: "Vivid Properties", reminder: "Schedule onboarding call", due: "May 2", status: "Overdue" },
  { name: "Ezra Brooks", company: "Luna Labs", reminder: "Prepare invoice draft", due: "May 5", status: "Pending" },
];

export const clientReminderUpcomingPayments: PaymentReminder[] = [
  { client: "Harper & Co.", amount: "$1,200", due: "May 6", type: "Subscription" },
  { client: "Pinnacle Media", amount: "$3,400", due: "May 9", type: "Annual renewal" },
  { client: "Blue Ridge", amount: "$620", due: "May 11", type: "Consulting" },
];

export const clientReminderNotifications: NotificationPreview[] = [
  { title: "Reminder sent", description: "A follow-up reminder was delivered to Aurora Events.", time: "Just now" },
  { title: "Payment alert", description: "Pinnacle Media payment is due in 3 days.", time: "1h ago" },
  { title: "Client onboarding", description: "New onboarding checklist ready for Luna Labs.", time: "3h ago" },
];

export const clientReminderHeroContent: DemoHeroContent = {
  badgeLead: "Demo SaaS product",
  badgeTag: "CRM",
  title: "ClientReminder CRM",
  description:
    "A polished client engagement dashboard for modern teams. Track reminders, payments, and activity with a vibrant purple-cyan workflow.",
  primaryCta: "Explore demo",
  secondaryCta: "Request a walkthrough",
};

export const clientReminderHeroInsights: DemoHeroInsight[] = [
  { label: "Reminder rate", value: "92%", detail: "Client interaction rate across campaigns." },
  { label: "Pipeline health", value: "+24%", detail: "Reminder completion improving week over week." },
];

export const clientReminderHeroWorkflow: DemoHeroWorkflowRow[] = [
  { id: "RM-104", primary: "Aurora Events", secondary: "Campaign follow-up", meta: "Due Apr 28", status: "Pending" },
  { id: "RM-108", primary: "Vivid Properties", secondary: "Onboarding call", meta: "Due May 2", status: "Overdue" },
  { id: "RM-111", primary: "Pinnacle Media", secondary: "Annual renewal", meta: "Due May 9", status: "Confirmed" },
];

export const clientReminderLiveActivityContent = {
  eyebrow: "Live activity",
  title: "Realtime reminders",
  nextReminderEyebrow: "Next reminder",
  nextReminderTitle: "Send invoice follow-up",
  nextReminderDetail: "Due in 20 minutes for Aurora Events.",
  activeLabel: "Active",
};

export const clientReminderLiveActivityStats: LiveActivityStat[] = [
  { value: "7", label: "Reminders delivered today" },
  { value: "92%", label: "Reminder interaction" },
];

export const clientReminderCustomerRemindersSection = {
  eyebrow: "Customer reminders",
  title: "Upcoming follow-ups",
};

export const clientReminderUpcomingPaymentsSection = {
  eyebrow: "Upcoming payments",
  title: "Due this week",
  countLabel: "3 items",
};

export const clientReminderNotificationsSection = {
  eyebrow: "Notification preview",
  title: "Recent alerts",
  badge: "Live stream",
};

export const clientReminderTableColumns = ["Client", "Reminder", "Due", "Status"] as const;

export const clientReminderCtaContent = {
  eyebrow: "Power your client workflow",
  title: "Stay ahead of every client reminder.",
  description:
    "ClientReminder CRM makes it effortless to manage follow-ups, payments, and notifications for your most valuable accounts.",
  primaryCta: "Request demo access",
  secondaryCta: "View product details",
};

export const clientReminderProductDetails = {
  title: "ClientReminder CRM",
  intro:
    "A client engagement platform for teams that manage reminders, payments, and ongoing account activity in one operational workspace.",
  whatItDoes:
    "Tracks follow-up reminders, payment due dates, and client notifications with live status—replacing scattered inbox threads and manual spreadsheets.",
  workflowBenefits: [
    "Automated reminder queues with clear Pending, Confirmed, and Overdue states",
    "Payment visibility tied to each client record and renewal cycle",
    "Live activity stream for deliveries, escalations, and onboarding checkpoints",
  ],
  businessAdvantages: [
    "Fewer missed follow-ups and faster response to at-risk accounts",
    "Better cash-flow predictability from upcoming payment visibility",
    "Single source of truth for client-facing teams and managers",
  ],
  targetUsage:
    "Agencies, B2B service firms, and boutique operators with recurring client relationships and high-touch communication.",
  implementationNote:
    "HM Coding can customize reminder rules, integrations, and branding for your production rollout.",
} as const;

export const clientReminderStatusBadgeClasses: Record<ReminderStatus, string> = {
  Overdue: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
};
