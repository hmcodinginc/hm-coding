import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HMLogoSVG from "./shared/HMLogoSVG";
import { useLogoAnim } from "../context/LogoAnimationContext";

interface HeaderProps {
  openContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ openContact }) => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { navLogoRef } = useLogoAnim();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? "bg-black/90 backdrop-blur-md border-b border-brand-indigo/35 shadow-card-md py-1"
      : "bg-black/60 backdrop-blur-sm border-b border-brand-indigo/15 py-3"
  }`;

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Careers",  path: "/careers"  },
    { name: "Projects", path: "/projects" },
    { name: "About",    path: "/about"    },
  ];

  return (
    <header className={headerClass}>
      <div className="mx-4 flex items-center h-20 px-4 sm:px-6 lg:px-8 transition-all duration-300">

        {/* ── Logo – magnetic glow + scale on hover ─────────── */}
        <div className="flex-shrink-0" ref={navLogoRef}>
          <Link to="/" className="group flex items-center gap-2" aria-label="HM Coding home">
            <div
              className="cursor-pointer transition-transform duration-300 md:group-hover:scale-110 md:group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.8)]"
            >
              <HMLogoSVG
                uid="nav"
                className="h-10 w-auto"
              />
            </div>HM Coding
          </Link>
        </div>

        <div className="flex-1" />

        {/* ── Desktop nav ───────────────────────────────────── */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  nav-link-hover relative text-gray-300 hover:text-brand-cyan
                  transition-colors font-medium py-2
                  ${isActive ? "active text-brand-cyan font-semibold" : ""}
                `}
              >
                {link.name}

                {/* Animated underline (layoutId for shared spring between links) */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #00F0FF, #E100FF)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Book Demo CTA */}
          <motion.button
            type="button"
            onClick={openContact}
            className="rounded-full bg-brand-magenta px-5 py-2 text-sm font-semibold text-white btn-shimmer"
            whileHover={{ scale: 1.06, boxShadow: "0 0 20px rgba(140,67,123,0.6)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            Book Demo
          </motion.button>
        </nav>

        {/* ── Mobile hamburger ──────────────────────────────── */}
        <div className="md:hidden h-[24px]">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-brand-cyan transition-colors focus:outline-none p-0 m-0"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-black/95 border-t border-brand-indigo/20 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-1 text-base ${isActive ? "text-brand-cyan font-semibold" : "text-gray-300 hover:text-brand-cyan"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => { openContact(); setIsOpen(false); }}
              className="block w-full rounded-lg bg-brand-magenta py-2 text-center text-sm font-semibold text-white shadow-neon-magenta/25"
            >
              Book Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
