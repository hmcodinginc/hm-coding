import React from "react";
import { motion } from "framer-motion";
import type { Job } from "../types/jobs";
import { TiltCard } from "./shared/TiltCard";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <TiltCard className="h-full preserve-3d" maxRotation={10}>
      <div className="group relative h-full card-surface p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden preserve-3d">
        {/* Glowing neon outline that tracks card edges */}
        <div className="absolute inset-0 border border-transparent group-hover:border-brand-magenta/40 rounded-2xl transition-colors duration-300 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm border border-brand-magenta/60 rounded-2xl pointer-events-none" />

        <div className="preserve-3d">
          <h3 className="text-xl font-bold text-white mb-3 font-display relative z-10" style={{ transform: "translateZ(20px)" }}>
            {job.title}
          </h3>

          <div className="text-xs text-brand-lavender space-y-1.5 mb-4 relative z-20 font-semibold uppercase tracking-wider" style={{ transform: "translateZ(15px)" }}>
            <p>📍 {job.location}</p>
            {job.experience && <p>💼 {job.experience}</p>}
            <p>⏱ {job.type}</p>
            {job.time && <p>⏰ {job.time}</p>}
            {job.salary && <p>💰 {job.salary}</p>}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed relative z-10" style={{ transform: "translateZ(10px)" }}>
            {job.description}
          </p>
        </div>

        <motion.a
          href={job.applyUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-center px-6 py-3 bg-brand-cyan text-brand-black rounded-full font-bold relative z-30 shadow-neon-cyan btn-shimmer cursor-pointer pointer-events-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          style={{ transform: "translateZ(20px)" }}
        >
          Apply Now
        </motion.a>
      </div>
    </TiltCard>
  );
};

export default JobCard;
