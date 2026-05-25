import type {
  GymAnalyticsMetric,
  GymAttendanceDay,
  GymMemberActivity,
  GymMembershipTier,
  GymRevenueSummary,
  GymTrainerBlock,
  GymUpcomingClass,
} from "../types/gymManagementTypes";
import type { DemoHeroContent, DemoHeroInsight, DemoHeroWorkflowRow } from "../types/demoHeroTypes";

export const gymDemoHero: DemoHeroContent = {
  badgeLead: "Demo product",
  badgeTag: "Fitness ops",
  title: "PulseFit Studio OS",
  description:
    "Memberships, class capacity, trainer calendars, and retention signals in one operational command center.",
  primaryCta: "Open floor dashboard",
  secondaryCta: "Export weekly report",
};

export const gymHeroInsights: DemoHeroInsight[] = [
  { label: "Check-ins", value: "412", detail: "Today across 3 studios" },
  { label: "Class fill", value: "87%", detail: "Evening peak · Mon–Thu" },
];

export const gymHeroWorkflow: DemoHeroWorkflowRow[] = [
  { id: "CLS-401", primary: "HIIT Burn 45", secondary: "Maya Chen · Studio A", meta: "5:30 PM", status: "open" },
  { id: "CLS-402", primary: "Powerlifting", secondary: "Jordan Ellis · Iron Floor", meta: "6:00 PM", status: "full" },
  { id: "CLS-404", primary: "Spin Endurance", secondary: "Alex Kim · Cycle Lab", meta: "7:00 PM", status: "waitlist" },
];

export const gymAnalyticsMetrics: GymAnalyticsMetric[] = [
  { label: "Active members", value: "1,284", delta: "+38 net this month", icon: "🏋️" },
  { label: "Class fill rate", value: "87%", delta: "Peak evenings · Mon–Thu", icon: "📅" },
  { label: "Check-ins today", value: "412", delta: "+9% vs 30-day avg", icon: "✅" },
  { label: "Retention (90d)", value: "94.2%", delta: "Churn watch: 18 accounts", icon: "💚" },
];

export const gymUpcomingClasses: GymUpcomingClass[] = [
  {
    id: "CLS-401",
    name: "HIIT Burn 45",
    trainer: "Maya Chen",
    room: "Studio A",
    time: "5:30 PM",
    enrolled: 18,
    capacity: 20,
    status: "open",
  },
  {
    id: "CLS-402",
    name: "Powerlifting Fundamentals",
    trainer: "Jordan Ellis",
    room: "Iron Floor",
    time: "6:00 PM",
    enrolled: 12,
    capacity: 12,
    status: "full",
  },
  {
    id: "CLS-403",
    name: "Vinyasa Flow",
    trainer: "Sofia Ruiz",
    room: "Studio B",
    time: "6:15 PM",
    enrolled: 22,
    capacity: 24,
    status: "open",
  },
  {
    id: "CLS-404",
    name: "Spin Endurance",
    trainer: "Alex Kim",
    room: "Cycle Lab",
    time: "7:00 PM",
    enrolled: 28,
    capacity: 30,
    status: "waitlist",
  },
];

export const gymTrainerSchedules: GymTrainerBlock[] = [
  {
    id: "TR-01",
    trainer: "Maya Chen",
    specialty: "HIIT · conditioning",
    slots: "5:30–8:00 PM",
    clientsToday: 14,
    nextSession: "HIIT Burn 45 · Studio A",
  },
  {
    id: "TR-02",
    trainer: "Jordan Ellis",
    specialty: "Strength · Olympic",
    slots: "4:00–7:30 PM",
    clientsToday: 9,
    nextSession: "PT · Riley M. · Rack 3",
  },
  {
    id: "TR-03",
    trainer: "Sofia Ruiz",
    specialty: "Yoga · mobility",
    slots: "6:00–9:00 PM",
    clientsToday: 11,
    nextSession: "Vinyasa Flow · Studio B",
  },
  {
    id: "TR-04",
    trainer: "Alex Kim",
    specialty: "Cycling · endurance",
    slots: "5:00–8:30 PM",
    clientsToday: 16,
    nextSession: "Spin Endurance · Cycle Lab",
  },
];

export const gymMembershipTiers: GymMembershipTier[] = [
  { tier: "Unlimited+", members: 486, share: "38%", churnRisk: "low", mrr: "$48.2k" },
  { tier: "Standard", members: 612, share: "48%", churnRisk: "medium", mrr: "$31.8k" },
  { tier: "Class packs", members: 142, share: "11%", churnRisk: "medium", mrr: "$8.4k" },
  { tier: "Corporate", members: 44, share: "3%", churnRisk: "low", mrr: "$6.1k" },
];

export const gymAttendanceWeek: GymAttendanceDay[] = [
  { day: "Mon", checkIns: 398, peakHour: "6–8 PM", vsAvg: "+4%" },
  { day: "Tue", checkIns: 421, peakHour: "6–8 PM", vsAvg: "+8%" },
  { day: "Wed", checkIns: 405, peakHour: "12–1 PM", vsAvg: "+5%" },
  { day: "Thu", checkIns: 412, peakHour: "6–8 PM", vsAvg: "+9%" },
  { day: "Fri", checkIns: 356, peakHour: "5–7 PM", vsAvg: "-2%" },
  { day: "Sat", checkIns: 289, peakHour: "9–11 AM", vsAvg: "-6%" },
  { day: "Sun", checkIns: 214, peakHour: "10 AM–12 PM", vsAvg: "-11%" },
];

export const gymRevenueSummary: GymRevenueSummary[] = [
  { label: "MRR (all locations)", value: "$94.5k", sub: "3 studios · recurring billing" },
  { label: "PT & retail (MTD)", value: "$18.2k", sub: "Sessions + apparel · net of refunds" },
  { label: "Failed renewals", value: "$1.4k", sub: "12 accounts · dunning in progress" },
];

export const gymMemberActivity: GymMemberActivity[] = [
  {
    id: "ACT-881",
    member: "Riley M.",
    action: "PT session checked in",
    detail: "Jordan Ellis · Rack 3",
    time: "4m ago",
    kind: "pt",
  },
  {
    id: "ACT-880",
    member: "Priya N.",
    action: "Class booking",
    detail: "Spin Endurance · waitlist #2",
    time: "11m ago",
    kind: "booking",
  },
  {
    id: "ACT-879",
    member: "Marcus T.",
    action: "Membership renewed",
    detail: "Unlimited+ · annual",
    time: "28m ago",
    kind: "renewal",
  },
  {
    id: "ACT-878",
    member: "Elena V.",
    action: "Floor check-in",
    detail: "Main entrance · NFC",
    time: "35m ago",
    kind: "check-in",
  },
  {
    id: "ACT-877",
    member: "Sam K.",
    action: "Freeze requested",
    detail: "30 days · travel hold",
    time: "1h ago",
    kind: "freeze",
  },
];

export const gymCtaContent = {
  eyebrow: "Fitness operations",
  title: "Run memberships, classes, and coaching in sync.",
  description:
    "PulseFit Studio OS gives operators one command center for capacity, retention, and floor activity across locations.",
  primaryCta: "Request demo access",
  secondaryCta: "View product details",
};

export const gymProductDetails = {
  title: "PulseFit Studio OS",
  intro:
    "A gym and studio management platform for fitness brands managing memberships, class schedules, and trainer operations.",
  whatItDoes:
    "Tracks member check-ins, class fill rates, trainer calendars, tier retention, and revenue signals in one operational dashboard.",
  workflowBenefits: [
    "Class capacity and waitlist visibility for evening peak scheduling",
    "Trainer schedule blocks tied to live sessions and client load",
    "Membership tier analytics with churn-risk indicators",
  ],
  businessAdvantages: [
    "Higher class utilization and fewer scheduling conflicts",
    "Retention teams spot at-risk tiers before cancellations spike",
    "Multi-studio operators compare attendance and MRR in one place",
  ],
  targetUsage:
    "Boutique fitness studios, multi-location gyms, and hybrid operators running classes plus personal training.",
  implementationNote:
    "HM Coding can customize billing integrations, member apps, and location rollouts for your brand.",
} as const;
