import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./ui/Container";

interface FooterProps {
    openContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ openContact }) => {
  return (
    <footer className="w-full bg-brand-surface/80 text-gray-400 py-6 sm:py-8 border-t border-brand-indigo/10 backdrop-blur-sm z-40">
      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Copyright */}
        <p className="text-xs text-center sm:text-left">
          &copy; {new Date().getFullYear()} HM Coding. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
          <Link
            to="/services"
            className="hover:text-brand-cyan transition-colors"
          >
            Services
          </Link>
          <Link
            to="/careers"
            className="hover:text-brand-cyan transition-colors"
          >
            Careers
          </Link>
          <Link to="/projects" className="hover:text-brand-cyan transition-colors">
            Projects
          </Link>
          <Link to="/about" className="hover:text-brand-cyan transition-colors">About</Link>
          <button
                onClick={openContact}
                className="hover:text-brand-cyan transition-colors"
            >
          Contact
        </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
