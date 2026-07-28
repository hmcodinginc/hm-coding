import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  portfolioStatusBadgeClass,
  portfolioStatusLabel,
} from "../../constants/projects";
import type { PortfolioProject } from "../../types/projects";
import { StatusBadge } from "../dashboard";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";

type ProjectShowcaseCardProps = {
  project: PortfolioProject;
};

export function ProjectShowcaseCard({ project }: ProjectShowcaseCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="h-full group hover:shadow-[0_0_20px_rgba(62,195,202,0.2)]">
        <div className={`relative aspect-video max-h-[220px] sm:max-h-[280px] md:max-h-[220px] w-full shrink-0 overflow-hidden ${project.accentGradient}`}>
        {project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={project.imageAlt ?? `${project.title} preview`}
            loading="lazy"
            className={`h-full w-full object-cover transition duration-500 ${project.imageClassName || "group-hover:scale-[1.04]"}`}
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

      <CardContent className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brand-magenta">
            {project.category}
          </p>
          <StatusBadge
            toneClassName={portfolioStatusBadgeClass[project.status]}
            className="shrink-0 border border-brand-indigo/20 bg-brand-black/80"
          >
            {project.badgeLabelOverride ?? portfolioStatusLabel[project.status]}
          </StatusBadge>
        </div>

        <h2 className="mt-2 font-display text-lg sm:text-xl font-bold text-white transition-colors group-hover:text-brand-cyan">
          {project.title}
        </h2>
        <p className="mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-gray-400">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-indigo/30 bg-brand-black px-2 py-1 text-[10px] sm:text-xs font-medium text-gray-300 transition-all duration-300 group-hover:border-brand-cyan/25 group-hover:text-gray-200 hover:!border-brand-cyan hover:!bg-brand-cyan/10 hover:!text-white hover:-translate-y-0.5 cursor-default shadow-sm hover:shadow-[0_0_10px_rgba(62,195,202,0.2)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-3">
        {project.directLink ? (
          <a href={project.directLink} target="_blank" rel="noopener noreferrer" className="w-auto sm:w-auto">
            <Button variant="primary" size="sm" className="w-auto sm:w-auto">
              View project
              <span aria-hidden className="shrink-0">→</span>
            </Button>
          </a>
        ) : (
          <Link to={`/projects/${project.slug}`} className="w-auto sm:w-auto">
            <Button variant="primary" size="sm" className="w-auto sm:w-auto">
              View project
              <span aria-hidden className="shrink-0">→</span>
            </Button>
          </Link>
        )}
        {project.externalDemoUrl ? (
          <a
            href={project.externalDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-brand-cyan transition hover:underline"
          >
            Live demo ↗
          </a>
        ) : null}
        {project.caseStudyUrl ? (
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-gray-400 transition hover:text-brand-cyan"
          >
            Case study ↗
          </a>
        ) : null}
      </CardFooter>
      </Card>
    </motion.article>
  );
}
