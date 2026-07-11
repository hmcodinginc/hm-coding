/**
 * LogoLoader  –  FIRST VISIT animation
 * ──────────────────────────────────────
 * Sequence (total ≈ 2.4 s):
 *   0.0 s  Logo SVG paths draw in (strokeDashoffset trick)
 *   0.9 s  Energy pulse rings radiate outward from centre
 *   1.6 s  Hero content fades in (handled by HeroSection via context)
 *   2.0 s  Loader overlay fades out & unmounts
 *
 * Only shown once per session (sessionStorage flag).
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLogoAnim } from "../context/LogoAnimationContext";
import HMLogoSVG from "./shared/HMLogoSVG";

/* ── helpers ─────────────────────────────────────────────────── */
const SKIP_KEY = "hm-loader-shown";

function shouldShow() {
  try {
    return !sessionStorage.getItem(SKIP_KEY);
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SKIP_KEY, "1");
  } catch { /* noop */ }
}

/* ── component ───────────────────────────────────────────────── */
export default function LogoLoader() {
  const { setMode } = useLogoAnim();
  const [visible, setVisible] = useState(() => shouldShow());
  const [phase, setPhase]     = useState<"draw" | "pulse" | "done">("draw");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) {
      // Not showing loader → go straight to idle
      setMode("idle");
      return;
    }

    markShown();

    // Phase timeline
    const t1 = setTimeout(() => setPhase("pulse"),  900);   // path draw complete
    const t2 = setTimeout(() => setPhase("done"),   2000);  // pulses fired
    const t3 = setTimeout(() => {
      setVisible(false);
      setMode("idle");
    }, 2400);                                                 // overlay unmounts

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, setMode]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="logo-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
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

          {/* ── Logo draw layer ─────────────────────────────────── */}
          <div className="relative flex items-center justify-center">
            {/* Draw-in SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              {/* SVG with path-draw animation via CSS */}
              <HMLogoSVG
                uid="loader"
                className="loader-draw-svg h-32 w-32"
                glowClass="drop-shadow-[0_0_32px_rgba(0,240,255,0.6)]"
              />
            </motion.div>

            {/* ── Energy pulse rings ───────────────────────────── */}
            <AnimatePresence>
              {phase === "pulse" && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`pulse-${i}`}
                      className="pointer-events-none absolute rounded-full border"
                      style={{
                        borderColor: i % 2 === 0
                          ? "rgba(0,240,255,0.7)"
                          : "rgba(225,0,255,0.7)",
                        width:  "80px",
                        height: "80px",
                      }}
                      initial={{ scale: 0.8, opacity: 0.9 }}
                      animate={{ scale: 4 + i * 1.2, opacity: 0 }}
                      transition={{
                        duration: 1.0,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* ── Progress text ─────────────────────────────────── */}
          <motion.p
            className="absolute bottom-16 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "draw" ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Initialising
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
