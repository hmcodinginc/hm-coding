import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HMLogo from "../HMLogo";
import { services } from "../../constants/services";
import { landingFooterContent } from "../../constants/homeContent";

type LandingFooterProps = {
  openContact: () => void;
};

export function LandingFooter({ openContact }: LandingFooterProps) {
  const { tagline, social, quickLinks, companyLinks } = landingFooterContent;

  return (
    <motion.footer
      className="border-t border-brand-indigo/20 bg-brand-black py-14 sm:py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div className="flex flex-wrap gap-x-10 gap-y-12 sm:justify-between">
          {/* Logo + tagline */}
          <motion.div
            className="w-full sm:w-auto sm:max-w-[260px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center gap-2 sm:h-12">
              <HMLogo  className="h-5 sm:h-8" />
              <span className="text-lg font-semibold text-white">HM Coding</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {social.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-400 transition hover:text-brand-cyan"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            aria-label="Footer quick links"
            className="w-[45%] sm:w-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center sm:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Quick Links</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            aria-label="Footer services"
            className="w-[45%] sm:w-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center sm:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Services</h3>
            </div>
            <ul className="mt-4 space-y-3">
            {services.map((service, index) => (
  <li key={service.title}>
    <Link
      to="/services"
      state={{ initialIndex: index }}
      className="text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
    >
      {service.title === "Smart"
        ? "Smart Integrations"
        : service.title}
    </Link>
  </li>
))}
            </ul>
          </motion.nav>

          {/* Company */}
          <motion.nav
            aria-label="Footer company links"
            className="w-[45%] sm:w-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center sm:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Company</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {"to" in link && link.to ? (
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={openContact}
                      className="text-left text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Let's Talk */}
          <motion.div
            className="w-full sm:w-auto sm:max-w-[280px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center sm:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Let's Talk</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Ready to build the future? Reach out to us for a free
              consultation or project estimation.
            </p>
            <motion.button
              type="button"
              onClick={openContact}
              className="btn-shimmer mt-5 w-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-neon-magenta/25 transition-all duration-300 hover:opacity-95 sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 border-t border-brand-indigo/20 pt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
          &copy; 2025-{new Date().getFullYear()} HM Coding. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}