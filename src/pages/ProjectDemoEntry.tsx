import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { pageTransition } from "../animations/motion";
import {
  getPortfolioProjectBySlug,
  isKnownPortfolioSlug,
  isPortfolioFullDemoSlug,
  portfolioStatusBadgeClass,
  portfolioStatusLabel,
} from "../constants/projects";
import type { PortfolioProject } from "../types/projects";
import { StatusBadge } from "../components/dashboard";

/** Lazy-loaded so demo bundles stay isolated and runtime init order stays predictable */
const ClientReminderCRM = lazy(() => import("./ClientReminderCRM"));
const RestaurantPOS = lazy(() => import("./RestaurantPOS"));
const InventoryManagement = lazy(() => import("./InventoryManagement"));
const RealEstateCRM = lazy(() => import("./RealEstateCRM"));

const fullDemoRoutes: Record<string, ComponentType> = {
  "client-reminder-crm": ClientReminderCRM,
  "restaurant-pos": RestaurantPOS,
  "inventory-system": InventoryManagement,
  "real-estate-crm": RealEstateCRM,
};

const demoFallback = (
  <div className="flex min-h-[50vh] items-center justify-center px-6 text-sm text-gray-500 dark:text-gray-400">
    Loading demo…
  </div>
);

function ProjectPlaceholder({ project }: { project: PortfolioProject }) {
  return (
    <motion.div
      className="mx-auto w-full max-w-3xl px-6 py-12 md:px-10 lg:px-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Link
        to="/projects"
        className="text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400"
      >
        ← All projects
      </Link>

      <div className={`mt-8 h-3 rounded-full ${project.accentGradient}`} aria-hidden />
      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{project.title}</h1>
        </div>
        <StatusBadge toneClassName={portfolioStatusBadgeClass[project.status]} className="shrink-0">
          {portfolioStatusLabel[project.status]}
        </StatusBadge>
      </div>

      <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{project.shortDescription}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-700 dark:text-gray-300">
          {project.status === "coming_soon"
            ? "We’re preparing an interactive walkthrough for this project. Check back soon, or reach out if you’d like a private preview."
            : "Full write-up and assets for this case study are on the way."}
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow"
        >
          Browse more projects
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProjectDemoEntry() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isKnownPortfolioSlug(slug)) {
    return <Navigate to="/projects" replace />;
  }

  if (isPortfolioFullDemoSlug(slug)) {
    const Demo = fullDemoRoutes[slug];
    if (Demo) {
      return (
        <Suspense fallback={demoFallback}>
          <Demo />
        </Suspense>
      );
    }
  }

  const project = getPortfolioProjectBySlug(slug)!;
  return <ProjectPlaceholder project={project} />;
}
