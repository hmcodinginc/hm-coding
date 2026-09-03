import type { PortfolioProject, PortfolioProjectStatus } from "../types/projects";

export const portfolioStatusLabel: Record<PortfolioProjectStatus, string> = {
  live: "Live demo",
  coming_soon: "Coming soon",
  case_study: "Case study",
};

export const portfolioStatusBadgeClass: Record<PortfolioProjectStatus, string> = {
  live: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  coming_soon: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  case_study: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    slug: "convertly",
    title: "Convertly",
    shortDescription:
      "An AI-powered Conversion Rate Optimization (CRO) platform providing intent-aware analysis, actionable reports, and website conversion insights.",
    category: "Analytics & Growth",
    tags: ["React", "TypeScript", "Tailwind", "Analytics","Reports", "CRO"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
    visual: "📈",
    imageSrc: "/project-images/Convertly_project.png",
    imageAlt: "Convertly Dashboard",
    directLink: "https://convertly.hmcoding.com/",
    badgeLabelOverride: "Live Product",

  },
  {
    slug: "corestack",
    title: "CoreStack",
    shortDescription:
      "CoreStack is a centralized practice management platform for CA firms, streamlining clients, tasks, billing, documents, and team workflows with role-based visibility.",
    category: "Management",
    tags: ["React", "TypeScript", "Tailwind", "CA Firm", "Management", "Platform"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600",
    visual: "🏢",
    imageSrc: "/project-images/CoreStack(1).png",
    imageAlt: "CoreStack Dashboard",
    directLink: "https://corestack.hmcoding.com/",
    badgeLabelOverride: "Live Project",
  },
  {
    slug: "tailor",
    title: "Tailor",
    shortDescription:
      "Tailor Management System is a full-stack web app that centralizes customer profiles, body measurements, garment orders, and delivery schedules for tailoring businesses.",
    category: "Management",
    tags: ["React", "TypeScript", "Tailwind", "Tailoring", "Orders", "Management"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-pink-500 via-rose-500 to-red-600",
    visual: "✂️",
    imageSrc: "/project-images/Tailor.jpg",
    imageAlt: "Tailor Dashboard",
    directLink: "https://tailorpro.hmcoding.com/",
    badgeLabelOverride: "Live Project"

  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS System",
    shortDescription:
      "Fast counter workflow: orders, kitchen routing, tabs, and shift reporting in one calm, touch-friendly surface.",
    category: "Point of sale",
    tags: ["React", "Real-time", "Payments", "Kitchen display"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-orange-500 via-rose-500 to-amber-600",
    visual: "🍽️",
    imageSrc: "/project-images/restaurant.png",
    imageAlt: "Restaurant POS System Dashboard",
    directLink: "https://dishdash.hmcoding.com/",
    badgeLabelOverride: "Live Project"
  },
  {
    slug: "gym-management",
    title: "Gym Management Dashboard",
    shortDescription:
      "Memberships, class bookings, trainer schedules, and retention signals for modern fitness operators.",
    category: "Operations",
    tags: ["Scheduling", "Memberships", "Analytics", "Mobile-first"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600",
    visual: "💼",
    imageSrc: "/project-images/gym.jpg",
    imageAlt: "Gym Management Dashboard",
    directLink: "https://fitflow.hmcoding.com/",
    badgeLabelOverride: "Live Project",
  },
  {
    slug: "client-reminder-crm",
    title: "Client Reminder CRM",
    shortDescription:
      "Engagement dashboard for reminders, payments, and client activity—built for teams who want clarity without clutter.",
    category: "CRM & automation",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-cyan-500 via-purple-600 to-violet-700",
    visual: "/project-images/client.jpg",
    imageSrc: "/project-images/client.jpg",
    imageAlt: "Client Reminder CRM Dashboard",
    directLink: "https://remindflow.hmcoding.com/",
    badgeLabelOverride: "Live Project",
  },
  {
    slug: "inventory-system",
    title: "Inventory Management System",
    shortDescription:
      "SKUs, vendors, stock levels, and low-stock alerts with a warehouse-ready control center.",
    category: "Supply chain",
    tags: ["Stock", "Vendors", "Alerts", "Reporting"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-slate-600 via-indigo-600 to-blue-700",
    visual: "📦",
    imageSrc: "/project-images/inventory.jpg",
    imageAlt: "Inventory Management Dashboard",
    badgeLabelOverride: "Live Demo",
  },
  {
    slug: "real-estate-crm",
    title: "Real Estate CRM",
    shortDescription:
      "Pipeline stages, showings, offers, and client follow-ups tailored for brokers and boutique agencies.",
    category: "CRM",
    tags: ["Pipeline", "Listings", "Clients", "Follow-ups"],
    status: "live",
    accentGradient: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-600",
    visual: "🏠",
    imageSrc: "/project-images/real-state.png",
    imageAlt: "Real Estate CRM Dashboard",
    badgeLabelOverride: "Live Demo",
  },
] as const;

const projectBySlug = new Map(portfolioProjects.map((p) => [p.slug, p]));

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return projectBySlug.get(slug);
}

export function isKnownPortfolioSlug(slug: string): boolean {
  return projectBySlug.has(slug);
}

/** Homepage spotlight — order defines card order (must exist on `portfolioProjects`). */

export const homeFeaturedProjectSlugs = ["convertly", "corestack", "tailor"] as const;


export function getHomeFeaturedProjects(): PortfolioProject[] {
  const bySlug = new Map(portfolioProjects.map((p) => [p.slug, p]));
  return homeFeaturedProjectSlugs.map((slug) => bySlug.get(slug)).filter((p): p is PortfolioProject => p != null);
}

/**
 * Slugs that mount a full in-app demo. Keep in sync with `fullDemoRoutes` in
 * `src/pages/ProjectDemoEntry.tsx` when adding interactive demos.
 */
export const portfolioFullDemoSlugs = [
  "client-reminder-crm",
  "restaurant-pos",
  "inventory-system",
  "real-estate-crm",
] as const;
export type PortfolioFullDemoSlug = (typeof portfolioFullDemoSlugs)[number];

export function isPortfolioFullDemoSlug(slug: string): slug is PortfolioFullDemoSlug {
  return (portfolioFullDemoSlugs as readonly string[]).includes(slug);
}
