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
      className="border-t border-brand-indigo/20 py-10 sm:py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div className="grid grid-cols-1 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-6 md:gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] lg:gap-x-8 xl:gap-x-12">
          {/* Logo + tagline */}
          <motion.div
            className="w-full flex flex-col items-center text-center md:items-start md:text-left md:max-w-[280px] lg:max-w-[360px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center justify-center md:justify-start gap-2 md:h-12">
              <HMLogo  className="h-5 md:h-8" />
              <span className="text-lg font-semibold text-white">HM Coding</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400 md:pr-6 lg:pr-6">
              {tagline}
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
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
                  ) : item.icon === "instagram" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="inline-block"
                    >
                      <path d="M12 2.163c3.204 0 3.584.006 4.85.071 3.27.15 4.938 1.819 5.089 5.089.065 1.266.071 1.646.071 4.85s-.006 3.584-.071 4.85c-.15 3.27-1.819 4.938-5.089 5.089-1.266.065-1.646.071-4.85.071s-3.584-.006-4.85-.071c-3.27-.15-4.938-1.819-5.089-5.089-.065-1.266-.071-1.646-.071-4.85s.006-3.584.071-4.85c.15-3.27 1.819-4.938 5.089-5.089 1.266-.065 1.646-.071 4.85-.071m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.644-1.44-1.44-1.44z" />
                    </svg>
                  ) : item.icon === "twitter" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="inline-block"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    item.label
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Middle Section Wrapper for Responsive Natural Wrapping */}
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 min-[500px]:grid-cols-3 md:contents">
            {/* Quick Links */}
            <motion.nav
              aria-label="Footer quick links"
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              <div className="flex h-10 items-center justify-center md:justify-start md:h-12">
                <h3 className="font-semibold text-white whitespace-nowrap">Quick Links</h3>
              </div>
              <ul className="mt-4 space-y-3 text-center md:text-left">
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
              <div className="flex h-10 items-center justify-center md:justify-start md:h-12">
                <h3 className="font-semibold text-white whitespace-nowrap">Services</h3>
              </div>
              <ul className="mt-4 space-y-3 text-center md:text-left">
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
              <div className="flex h-10 items-center justify-center md:justify-start md:h-12">
                <h3 className="font-semibold text-white whitespace-nowrap">Company</h3>
              </div>
              <ul className="mt-4 space-y-3 text-center md:text-left">
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
                        className="text-center md:text-left text-sm text-gray-400 transition hover:text-brand-cyan whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </div>

          <motion.div
            className="w-full md:col-span-full lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left md:pt-6 lg:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <div className="flex h-10 items-center justify-center lg:justify-start md:h-12">
              <h3 className="font-semibold text-white whitespace-nowrap">Let's Talk</h3>
            </div>
            <p className="mt-4 mx-auto lg:mx-0 max-w-xs text-sm leading-relaxed text-gray-400">
              Ready to build the future? Reach out to us for a free
              consultation or project estimation.
            </p>
            <motion.button
              type="button"
              onClick={openContact}
              className="btn-shimmer mt-5 w-[160px] flex items-center justify-center text-center rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 h-[48px] text-sm font-semibold text-white shadow-neon-magenta/25 transition-all duration-300 hover:opacity-95"
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