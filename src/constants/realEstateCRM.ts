import type {
  EstateAnalyticsMetric,
  EstateListing,
  EstatePipelineStage,
  EstateShowing,
} from "../types/realEstateCRMTypes";
import type { DemoHeroContent, DemoHeroInsight, DemoHeroWorkflowRow } from "../types/demoHeroTypes";

export const estateDemoHero: DemoHeroContent = {
  badgeLead: "Demo product",
  badgeTag: "Brokerage CRM",
  title: "Harborline Realty OS",
  description:
    "Pipeline stages, showings, offers, and client follow-ups in one workspace—built for brokers who need velocity without losing context.",
  primaryCta: "Open pipeline board",
  secondaryCta: "Schedule showing",
};

export const estateHeroInsights: DemoHeroInsight[] = [
  { label: "Active deals", value: "47", detail: "12 offers in review this week" },
  { label: "GCI forecast", value: "$2.1M", detail: "Q2 weighted pipeline" },
];

export const estateHeroPipelineStages: EstatePipelineStage[] = [
  { label: "Leads", count: 28, value: "$4.2M vol." },
  { label: "Showings", count: 14, value: "$2.8M vol." },
  { label: "Offers", count: 9, value: "$1.6M vol." },
  { label: "Closed", count: 6, value: "$980k vol." },
];

export const estateHeroWorkflow: DemoHeroWorkflowRow[] = [
  { id: "LST-204", primary: "1840 Bayview Terrace", secondary: "M. Alvarez · buyer tour", meta: "Today 2:00 PM", status: "showing" },
  { id: "LST-198", primary: "902 Ridgeway Lane", secondary: "Offer review · dual agency", meta: "$1.24M", status: "offer" },
  { id: "LST-211", primary: "55 Harbor Court #12", secondary: "New lead · condo", meta: "Assigned", status: "lead" },
];

export const estateAnalyticsMetrics: EstateAnalyticsMetric[] = [
  { label: "Listings active", value: "86", delta: "+6 new this month", icon: "🏠" },
  { label: "Showings (7d)", value: "34", delta: "8 pending confirmation", icon: "📅" },
  { label: "Avg. days on market", value: "22", delta: "-3 vs market avg", icon: "⏱️" },
  { label: "Close rate", value: "31%", delta: "Offer-to-close · 90d", icon: "✅" },
];

export const estateListings: EstateListing[] = [
  {
    id: "LST-204",
    address: "1840 Bayview Terrace",
    agent: "M. Alvarez",
    price: "$1.48M",
    stage: "showing",
    daysOnMarket: 12,
  },
  {
    id: "LST-198",
    address: "902 Ridgeway Lane",
    agent: "J. Kim",
    price: "$1.24M",
    stage: "offer",
    daysOnMarket: 19,
  },
  {
    id: "LST-211",
    address: "55 Harbor Court #12",
    agent: "S. Ortiz",
    price: "$685k",
    stage: "lead",
    daysOnMarket: 4,
  },
  {
    id: "LST-187",
    address: "310 Willow Park Dr",
    agent: "M. Alvarez",
    price: "$2.05M",
    stage: "closed",
    daysOnMarket: 31,
  },
];

export const estateShowings: EstateShowing[] = [
  { id: "SH-881", property: "1840 Bayview Terrace", client: "Chen family", time: "Today · 2:00 PM", agent: "M. Alvarez" },
  { id: "SH-882", property: "902 Ridgeway Lane", client: "Patel trust", time: "Today · 4:30 PM", agent: "J. Kim" },
  { id: "SH-883", property: "1200 Lakeview Blvd", client: "Nguyen LLC", time: "Tomorrow · 10:00 AM", agent: "S. Ortiz" },
];

export const estateCtaContent = {
  eyebrow: "Brokerage workflow",
  title: "Move listings from lead to close with clarity.",
  description:
    "Harborline Realty OS keeps pipeline stages, showings, and offers organized for agents and team leads.",
  primaryCta: "Request demo access",
  secondaryCta: "View product details",
};

export const estateProductDetails = {
  title: "Harborline Realty OS",
  intro:
    "A real estate CRM for brokerages coordinating listings, showings, offers, and client follow-through.",
  whatItDoes:
    "Tracks active listings by stage, upcoming showings, pipeline volume, and days-on-market metrics for each property.",
  workflowBenefits: [
    "Pipeline board from leads through showings, offers, and closed deals",
    "Showing calendar tied to agents and client context",
    "Listing table with price, DOM, and stage for quick prioritization",
  ],
  businessAdvantages: [
    "Agents spend less time chasing status across email and spreadsheets",
    "Brokers forecast GCI from weighted pipeline by stage",
    "Teams coordinate dual-agency and offer reviews with shared visibility",
  ],
  targetUsage:
    "Residential brokerages, boutique agencies, and team leads managing high-volume listing pipelines.",
  implementationNote:
    "HM Coding can customize MLS integrations, commission workflows, and branded client portals for your brokerage.",
} as const;
