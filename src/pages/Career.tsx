import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import type { Job } from "../types/jobs";
import InternshipHero from "../components/InternshipHero";
import InternshipDetails from "../components/InternshipDetails";
import { Scroll3DWrapper } from "../components/shared/Scroll3DWrapper";
import { supabase } from "../lib/supabase";
interface CareersProps {
  openContact: () => void;
  openStartupContact: () => void;
}

const Careers: React.FC<CareersProps> = ({
  openContact,
  openStartupContact,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const res = await fetch("https://hm-coding.onrender.com/jobs");
        // const data = await res.json();
        // setJobs(data);
   const { data, error } = await supabase
  .from("jobs")
  .select("*")
  .eq("active", true);

if (error) {
  console.error(error);
  return;
}

const formattedJobs: Job[] = (data || []).map((job) => ({
  _id: job.id,
  title: job.title,
  location: job.location || "",
  experience: job.experience || "",
  type: job.job_type || "",
  salary: job.salary || "",
  time: job.time || "",
  description: job.description || "",
  applyUrl: job.apply_url || "",
}));

setJobs(formattedJobs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <motion.div 
      className="w-full flex flex-col bg-brand-black pb-24 min-h-screen relative overflow-hidden perspective-3d preserve-3d"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-grid-faint pointer-events-none" />

      {/* HERO */}
      <section className="relative overflow-hidden py-10 sm:py-24 border-b border-brand-indigo/10 perspective-3d preserve-3d">
        {/* 3D Glassmorphic Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none animate-float-orb-slow" style={{ transform: "translateZ(-40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-magenta/5 blur-3xl pointer-events-none animate-float-orb-delayed" style={{ transform: "translateZ(-60px)" }} />

        <div className="max-w-6xl mx-auto px-6 text-center preserve-3d">
          <span className="section-eyebrow mb-3 block">Join Our Team</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-display tracking-tight text-white relative z-10" style={{ transform: "translateZ(25px)" }}>
            Careers at <span className="text-gradient-brand">HM Coding</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed relative z-10" style={{ transform: "translateZ(15px)" }}>
            Join us to work on real-world projects, build impactful products,
            and grow with hands-on experience.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
            <button
              onClick={openContact}
              className="inline-flex w-max mx-auto sm:mx-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(62,195,202,0.3)] transition hover:opacity-95 hover:shadow-[0_0_30px_rgba(62,195,202,0.5)]"
            >
              Internship
            </button>
            <button
              onClick={openStartupContact}
              className="inline-flex w-max mx-auto sm:mx-0 items-center justify-center rounded-full bg-brand-surface border border-brand-cyan/30 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-cyan/10"
            >
              Startup Idea
            </button>
          </div>
        </div>
      </section>

      {/* INTERNSHIP */}
      <Scroll3DWrapper>
        <InternshipHero onApplyNow={openContact} />
      </Scroll3DWrapper>

      <Scroll3DWrapper>
        <InternshipDetails onSendIdea={openStartupContact} />
      </Scroll3DWrapper>

      {/* JOBS */}
      <Scroll3DWrapper>
        <section className="py-10 sm:py-24 bg-brand-black/40 border-t border-brand-indigo/10">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-16 font-display tracking-tight">
              Current <span className="text-gradient-brand">Openings</span>
            </h2>

            {loading && (
              <p className="text-center text-gray-400 font-semibold font-display">
                Loading openings...
              </p>
            )}

            {!loading && jobs.length === 0 && (
              <p className="text-center text-gray-400 font-semibold font-display">
                No active openings right now.
              </p>
            )}

            {!loading && jobs.length > 0 && (
              <motion.div 
                className="mx-auto w-full max-w-[380px] md:max-w-none grid grid-cols-1 md:grid-cols-2 gap-8 preserve-3d"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={{
                      hidden: { opacity: 0, rotateX: 20, y: 40, scale: 0.95 },
                      visible: { opacity: 1, rotateX: 0, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                    className="preserve-3d"
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </Scroll3DWrapper>

    </motion.div>
  );
};

export default Careers;