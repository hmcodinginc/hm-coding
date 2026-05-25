import type {
  KitchenTicket,
  PosAnalyticsMetric,
  PosOrderLine,
  PosRevenueSummary,
  PosTransaction,
} from "../types/restaurantPOSTypes";
import type { DemoHeroContent, DemoHeroInsight, DemoHeroWorkflowRow } from "../types/demoHeroTypes";

export const posDemoHero: DemoHeroContent = {
  badgeLead: "Demo product",
  badgeTag: "POS",
  title: "Harbor & Hearth POS",
  description:
    "Counter, floor, and kitchen in sync—tickets, payments, and shift clarity for busy service teams.",
  primaryCta: "Open register view",
  secondaryCta: "Manager summary",
};

export const posHeroInsights: DemoHeroInsight[] = [
  { label: "Open tickets", value: "24", detail: "Floor + bar · updated live" },
  { label: "Kitchen pace", value: "14m", detail: "Avg. ticket-to-table tonight" },
];

export const posHeroWorkflow: DemoHeroWorkflowRow[] = [
  { id: "#4821", primary: "Table 12 · 2 covers", secondary: "Sea bass, seasonal veg", meta: "$72.50", status: "fired" },
  { id: "#4822", primary: "Bar 3 · walk-in", secondary: "Smash burger, fries", meta: "$34.00", status: "open" },
  { id: "#4823", primary: "Patio 8 · family", secondary: "Pasta, kids meals", meta: "$89.00", status: "ready" },
];

export const posAnalyticsMetrics: PosAnalyticsMetric[] = [
  { label: "Covers (today)", value: "186", delta: "+12% vs last Sat", icon: "👥" },
  { label: "Avg. ticket", value: "$48.20", delta: "Net of comps", icon: "🧾" },
  { label: "Order time", value: "14m", delta: "Kitchen to table", icon: "⏱️" },
  { label: "Card share", value: "82%", delta: "Tap + chip", icon: "💳" },
];

export const posOrdersOverview: PosOrderLine[] = [
  { id: "#4821", table: "Bar 3", items: "2× Smash burger, fries", total: "$34.00", status: "open" },
  { id: "#4822", table: "12", items: "Sea bass, seasonal veg", total: "$72.50", status: "fired" },
  { id: "#4823", table: "Walk-in", items: "Soup, Caesar, espresso", total: "$41.25", status: "ready" },
  { id: "#4824", table: "8", items: "Family pasta, 2 kids meals", total: "$89.00", status: "open" },
];

export const posKitchenQueue: KitchenTicket[] = [
  { id: "K-109", course: "Mains", items: "2× Ribeye medium, sides", time: "6m", station: "grill" },
  { id: "K-110", course: "Starters", items: "Oysters, calamari", time: "3m", station: "fry" },
  { id: "K-111", course: "Dessert", items: "Crème brûlée ×3", time: "2m", station: "dessert" },
  { id: "K-112", course: "Cold", items: "Caesar mod, salmon poke", time: "4m", station: "cold" },
];

export const posRevenueSummary: PosRevenueSummary[] = [
  { label: "Net sales", value: "$8,942", sub: "Since open • excludes tips" },
  { label: "Tips pooled", value: "$1,204", sub: "Auto-settlement nightly" },
  { label: "Voids / comps", value: "$118", sub: "Manager approval trail" },
];

export const posRecentTransactions: PosTransaction[] = [
  { id: "TX-9102", method: "Amex ••4242", amount: "$126.40", time: "2m ago" },
  { id: "TX-9101", method: "Apple Pay", amount: "$54.00", time: "8m ago" },
  { id: "TX-9100", method: "Cash", amount: "$38.50", time: "14m ago" },
  { id: "TX-9099", method: "Visa ••8811", amount: "$210.00", time: "22m ago" },
];

export const posCtaContent = {
  eyebrow: "Built for service teams",
  title: "Run the floor and kitchen from one calm surface.",
  description:
    "Harbor & Hearth POS keeps tickets, payments, and kitchen routing aligned during peak service—without counter clutter.",
  primaryCta: "Request demo access",
  secondaryCta: "View product details",
};

export const posProductDetails = {
  title: "Harbor & Hearth POS",
  intro:
    "A point-of-sale operations dashboard for restaurants that need fast ticketing, kitchen coordination, and shift-level clarity.",
  whatItDoes:
    "Manages open tickets, kitchen queue routing, payment capture, and same-day revenue reporting across floor and bar stations.",
  workflowBenefits: [
    "Ticket-to-kitchen routing with station-aware queue visibility",
    "Real-time order status from open through fired and ready",
    "Settlement view for recent transactions and shift totals",
  ],
  businessAdvantages: [
    "Shorter ticket times and fewer misrouted courses during rush",
    "Managers see void/comp patterns and card mix without end-of-night exports",
    "Staff work from one touch-friendly workflow instead of fragmented tools",
  ],
  targetUsage:
    "Full-service restaurants, busy counters, and multi-station kitchens that need reliable POS operations during service.",
  implementationNote:
    "HM Coding can tailor menu flows, KDS integrations, and reporting for your venue or multi-location group.",
} as const;
