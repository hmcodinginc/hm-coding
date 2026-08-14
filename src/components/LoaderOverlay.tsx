import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HMLogoSVG from "./shared/HMLogoSVG";

export default function LoaderOverlay({ visible }: { visible: boolean }) {
  const [phase, setPhase] = useState<"draw" | "pulse" | "done">("draw");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) {
      setPhase("draw");
      return;
    }

    // Phase timeline (matching LogoLoader)
    const t1 = setTimeout(() => setPhase("pulse"), 900);
    const t2 = setTimeout(() => setPhase("done"), 2000);

    const rafId = rafRef.current;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(62,195,202,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(62,195,202,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />

          {/* Radial ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="h-96 w-96 rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(62,195,202,0.18) 0%, transparent 70%)",
                animation: "loader-glow-breathe 1.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* ── Logo fully visible layer (fixed V issue) ─────────────────────────────────── */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // Sped up from 0.5 to 0.3
              className="relative z-10"
            >
              <HMLogoSVG
                uid="loader"
                className="h-32 w-32"
                glowClass="drop-shadow-[0_0_32px_rgba(0,240,255,0.6)]"
              />
            </motion.div>

            {/* ── Energy pulse rings (Infinite Loop) ───────────────────────────── */}
            <>
              {[0, 1, 2, 3].map((i) => {
                const colors = [
                  "rgba(0, 240, 255, 0.8)", // cyan
                  "rgba(225, 0, 255, 0.8)", // purple
                  "rgba(0, 180, 200, 0.8)", // dark cyan
                  "rgba(0, 240, 255, 0.8)", // cyan
                ];
                return (
                  <motion.div
                    key={`pulse-${i}`}
                    className="pointer-events-none absolute rounded-full border-[1.5px]"
                    style={{
                      borderColor: colors[i],
                      width: "32px", // Start small, behind the center of the M
                      height: "32px",
                      boxShadow: `0 0 12px ${colors[i]}, inset 0 0 8px ${colors[i]}`,
                    }}
                    initial={{ scale: 0.5, opacity: 1, borderWidth: "2px" }}
                    animate={{ scale: 8 + (i * 0.5), opacity: 0, borderWidth: "0px" }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.6,
                      ease: "easeOut",
                      repeat: Infinity,
                    }}
                  />
                );
              })}
            </>
          </div>

          {/* ── Progress text ─────────────────────────────────── */}
          <motion.p
            className="absolute bottom-16 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "draw" ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
