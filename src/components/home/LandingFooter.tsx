import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HMLogo from "../HMLogo";
import { services } from "../../constants/services";
import { landingFooterContent } from "../../constants/homeContent";

type LandingFooterProps = {
  openContact: () => void;
  openDemo?: () => void;
};

export function LandingFooter({ openContact, openDemo }: LandingFooterProps) {
  const { tagline, social, quickLinks, companyLinks } = landingFooterContent;

  return (
    <motion.footer
      className="border-t border-brand-indigo/20 bg-brand-black py-10 sm:py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute top-0 left-1/4 w-[150%] sm:w-96 aspect-square max-w-[384px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[150%] sm:w-96 aspect-square max-w-[384px] bg-brand-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div className="grid grid-cols-1 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-6 md:gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] lg:gap-x-8 xl:gap-x-12">
          {/* Logo + tagline */}
          <motion.div
            className="w-full flex flex-col md:max-w-[280px] lg:max-w-[360px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center gap-2 md:h-12">
              <HMLogo  className="h-5 md:h-8" />
              <span className="text-lg font-semibold text-white">HM Coding</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 lg:pr-6">
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
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon === "linkedin" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="inline-block"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ) : (
                    item.label
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            aria-label="Footer quick links"
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center md:h-12">
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
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center md:h-12">
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
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center md:h-12">
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
                      onClick={link.label === "Book Demo" ? (openDemo || openContact) : openContact}
                      className="text-left text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="w-full md:col-span-full lg:col-span-1 flex flex-col items-start md:items-center lg:items-start text-left md:text-center lg:text-left md:pt-6 lg:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center md:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Let's Talk</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 md:max-w-md lg:max-w-none">
              Ready to build the future? Reach out to us for a free
              consultation or project estimation.
            </p>
            <motion.button
              type="button"
              onClick={openContact}
              className="btn-shimmer mt-5 w-full md:w-[160px] flex items-center justify-center text-center rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 h-[48px] text-sm font-semibold text-white shadow-neon-magenta/25 transition-all duration-300 hover:opacity-95"
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