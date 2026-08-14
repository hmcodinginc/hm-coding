import React from "react";
import { motion } from "framer-motion";
import type { Job } from "../types/jobs";
import { TiltCard } from "./shared/TiltCard";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Heading, Text } from "./ui/Typography";
import { Button } from "./ui/Button";
import { isSafeHttpUrl } from "../lib/validation";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <TiltCard className="h-full preserve-3d" maxRotation={10}>
      <Card className="h-full group hover:border-brand-magenta/40 hover:shadow-[0_0_15px_rgba(225,0,255,0.3)]">

        <CardContent className="preserve-3d flex flex-col">
          <Heading level={3} className="text-white mb-2 line-clamp-2" style={{ transform: "translateZ(30px)" } as React.CSSProperties}>
            {job.title}
          </Heading>

          <div className="text-[10px] sm:text-xs text-brand-lavender space-y-1.5 mb-4 relative z-20 font-semibold uppercase tracking-wider" style={{ transform: "translateZ(15px)" }}>
            <p>📍 {job.location}</p>
            {job.experience && <p>💼 {job.experience}</p>}
            <p>⏱ {job.type}</p>
            {job.time && <p>⏰ {job.time}</p>}
            {job.salary && <p>💰 {job.salary}</p>}
          </div>

          <Text className="text-gray-400 text-sm mb-4 line-clamp-3" style={{ transform: "translateZ(20px)" } as React.CSSProperties}>
            {job.description}
          </Text>
        </CardContent>

        <CardFooter className="pt-2">
            {job.applyUrl && isSafeHttpUrl(job.applyUrl) ? (
          <motion.a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full relative z-30 pointer-events-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ transform: "translateZ(20px)" }}
          >
            <Button variant="primary" size="sm" className="w-auto bg-brand-cyan text-brand-black shadow-neon-cyan btn-shimmer">
              Apply Now
            </Button>
          </motion.a>
            ) : (
              <p className="text-sm text-gray-400">Application link unavailable. Use the internship form or contact us.</p>
            )}
        </CardFooter>
      </Card>
    </TiltCard>
  );
};

export default JobCard;
