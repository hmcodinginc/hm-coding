import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectShowcaseCard } from "../projects/ProjectShowcaseCard";
import { getHomeFeaturedProjects } from "../../constants/projects";
import { featuredProjectsContent } from "../../constants/homeContent";
import { SectionHeader } from "./SectionHeader";

const featuredProjects = getHomeFeaturedProjects();

export function FeaturedProjectsSection() {
  const { eyebrow, title, description, ctaLabel } = featuredProjectsContent;

  return (
    <section className="bg-brand-black py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            className="mb-0"
          />
          <Link
            to="/projects"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            {ctaLabel}
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95, rotateX: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { type: "spring", stiffness: 100, damping: 12 } 
                },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <ProjectShowcaseCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
