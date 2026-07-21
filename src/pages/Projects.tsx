import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pageTransition } from "../animations/motion";
import { ProjectShowcaseCard } from "../components/projects/ProjectShowcaseCard";
import { portfolioProjects } from "../constants/projects";

export default function Projects() {
  return (
    <motion.div
      className="w-full flex flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <section className="relative overflow-hidden bg-brand-black text-white min-h-[450px] flex items-center border-b border-brand-indigo/20">
        <div className="absolute top-0 right-0 h-[80vw] max-h-[600px] w-[80vw] max-w-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/20 via-brand-magenta/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[60vw] max-h-[400px] w-[60vw] max-w-[400px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-indigo/20 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-28 md:px-10 lg:px-16 z-10 w-full">
          <motion.div
             className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-cyan mb-8"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
          >
             <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse"></span> HM CODING PORTFOLIO
          </motion.div>
          
          <motion.h1
            className="max-w-4xl text-3xl font-display font-bold tracking-wide md:text-6xl lg:text-7xl mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Projects <span className="bg-gradient-to-r from-brand-cyan to-brand-magenta bg-clip-text text-transparent">Showcase</span>
          </motion.h1>
          
          <motion.p
            className="max-w-2xl text-lg text-gray-400 md:text-xl font-medium leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Product-style demos and case studies: CRM, POS, operations dashboards, and vertical SaaS—built the way we ship for clients.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-surface border border-brand-indigo/40 px-4 py-2.5 min-h-[48px] text-sm font-bold text-white transition-all hover:bg-brand-surface/80 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(62,195,202,0.2)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 text-brand-cyan">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-black py-10 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vw] max-h-[800px] w-[90vw] max-w-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-brand-indigo/5 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-white md:text-4xl">Selected work & demos</h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              Explore interactive prototypes and narrative case studies. More client launches are added here as we publish them.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-[380px] md:max-w-none grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {portfolioProjects.map((project) => (
              <ProjectShowcaseCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
