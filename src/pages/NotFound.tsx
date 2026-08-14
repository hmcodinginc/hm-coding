import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.section
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">404</p>
      <h1 className="mt-4 max-w-xl text-4xl font-display font-bold text-white md:text-5xl">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-lg text-gray-400">
        The URL may be outdated or mistyped. Head back to the homepage or browse our work.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 text-sm font-semibold text-white"
        >
          Return home
        </Link>
        <Link
          to="/projects"
          className="rounded-full border border-brand-cyan/30 bg-brand-surface px-6 py-3 text-sm font-semibold text-white"
        >
          View projects
        </Link>
        <Link
          to="/services"
          className="rounded-full border border-brand-cyan/30 bg-brand-surface px-6 py-3 text-sm font-semibold text-white"
        >
          Services
        </Link>
      </div>
    </motion.section>
  );
}
