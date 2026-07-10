import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cardHover } from "../../animations/motion";
import {
  portfolioStatusBadgeClass,
  portfolioStatusLabel,
} from "../../constants/projects";
import type { PortfolioProject } from "../../types/projects";
import { StatusBadge } from "../dashboard";

type ProjectShowcaseCardProps = {
  project: PortfolioProject;
};

export function ProjectShowcaseCard({ project }: ProjectShowcaseCardProps) {
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-indigo/20 bg-brand-surface transition-all duration-300 hover:border-brand-cyan/35 hover:shadow-neon-cyan/20"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={cardHover.whileHover}
      transition={{ type: "spring" as const, stiffness: 300 }}
    >
      <div className={`relative h-48 w-full shrink-0 overflow-hidden ${project.accentGradient}`}>
        {project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={project.imageAlt ?? `${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-brand-black/20 text-5xl"
            aria-hidden
          >
            {project.visual}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-magenta">
            {project.category}
          </p>
          <StatusBadge
            toneClassName={portfolioStatusBadgeClass[project.status]}
            className="shrink-0 border border-brand-indigo/20 bg-brand-black/80"
          >
            {portfolioStatusLabel[project.status]}
          </StatusBadge>
        </div>

        <h2 className="mt-2 font-display text-xl font-bold text-white transition-colors group-hover:text-brand-cyan">
          {project.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-indigo/30 bg-brand-black px-3 py-1 text-xs font-medium text-gray-300 transition-colors group-hover:border-brand-cyan/25 group-hover:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-brand-indigo/20 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 btn-shimmer"
          >
            View project
            <span aria-hidden>→</span>
          </Link>
          {project.externalDemoUrl ? (
            <a
              href={project.externalDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-cyan transition hover:underline"
            >
              Live demo ↗
            </a>
          ) : null}
          {project.caseStudyUrl ? (
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-400 transition hover:text-brand-cyan"
            >
              Case study ↗
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
