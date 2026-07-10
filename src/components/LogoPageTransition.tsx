/**
 * LogoPageTransition  –  PAGE CHANGE animation
 * ──────────────────────────────────────────────
 * Sequence on every route change:
 *
 *   0.00 s  Navbar logo "clones" itself and flies to viewport centre
 *   0.25 s  Portal ring expands from the clone
 *   0.55 s  Ring grows to cover full screen (black fill)
 *   0.85 s  New page mounts behind the cover
 *   1.10 s  Cover shrinks / fades back; logo returns to navbar
 *   1.40 s  Done – back to IDLE
 *
 * Implementation notes:
 *   - We read the navbar logo's bounding rect (via navLogoRef from context)
 *     to compute the starting position of the flying clone.
 *   - The cover is a circle that scales from 0 → viewport diagonal.
 *   - AnimatePresence in App.tsx keys on pathname; this component
 *     renders on every key change and self-destructs when done.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogoAnim } from "../context/LogoAnimationContext";
import HMLogoSVG from "./shared/HMLogoSVG";

interface LogoPageTransitionProps {
  /** Trigger key – typically the current pathname */
  routeKey: string;
}

/* diagonal = max possible cover radius */
function viewportDiagonal() {
  return Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2;
}

type Phase =
  | "fly"       // clone flying to centre
  | "expand"    // portal ring expanding
  | "cover"     // full-screen cover active
  | "reveal"    // cover shrinking
  | "done";     // everything gone

export default function LogoPageTransition({ routeKey }: LogoPageTransitionProps) {
  const { navLogoRef, setMode } = useLogoAnim();
  const [phase, setPhase] = useState<Phase>("fly");
  const [active, setActive] = useState(true);

  /* Starting rect of the navbar logo */
  const startRect = useRef<DOMRect | null>(null);
  useEffect(() => {
    if (navLogoRef.current) {
      startRect.current = navLogoRef.current.getBoundingClientRect();
    }
  }, [navLogoRef]);

  /* Phase timeline */
  useEffect(() => {
    setMode("transitioning");
    const t1 = setTimeout(() => setPhase("expand"),  250);
    const t2 = setTimeout(() => setPhase("cover"),   550);
    const t3 = setTimeout(() => setPhase("reveal"),  850);
    const t4 = setTimeout(() => setPhase("done"),   1300);
    const t5 = setTimeout(() => {
      setActive(false);
      setMode("idle");
    }, 1500);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  if (!active) return null;

  const sr = startRect.current;
  /* Centre of navbar logo in viewport coords */
  const startX = sr ? sr.left + sr.width  / 2 : window.innerWidth  / 2;
  const startY = sr ? sr.top  + sr.height / 2 : 40;
  const centreX = window.innerWidth  / 2;
  const centreY = window.innerHeight / 2;

  const diagonal = viewportDiagonal();

  return (
    <AnimatePresence>
      {active && (
        <div
          className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
          aria-hidden
        >
          {/* ── Cover circle: expands from centre to fill screen ── */}
          {(phase === "expand" || phase === "cover" || phase === "reveal") && (
            <motion.div
              className="absolute rounded-full bg-black"
              style={{
                width:     80,
                height:    80,
                top:       centreY - 40,
                left:      centreX - 40,
                originX:   "50%",
                originY:   "50%",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === "expand" ? { scale: 1,   opacity: 1 } :
                phase === "cover"  ? { scale: diagonal / 80, opacity: 1 } :
                                     { scale: 0,   opacity: 0 }
              }
              transition={
                phase === "expand" ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] } :
                phase === "cover"  ? { duration: 0.32, ease: [0.4, 0, 0.2, 1]   } :
                                     { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
            />
          )}

          {/* ── Portal ring: radiates outward ─────────────────── */}
          {phase === "expand" && (
            <>
              {[0, 1].map((i) => (
                <motion.div
                  key={`portal-${i}`}
                  className="absolute rounded-full border-2"
                  style={{
                    borderColor: i === 0 ? "rgba(0,240,255,0.8)" : "rgba(225,0,255,0.8)",
                    width:  80, height: 80,
                    top:    centreY - 40,
                    left:   centreX - 40,
                  }}
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 3 + i * 1.5, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                />
              ))}
            </>
          )}

          {/* ── Flying logo clone: navbar → centre ────────────── */}
          {(phase === "fly" || phase === "expand") && (
            <motion.div
              className="absolute z-10 flex items-center justify-center"
              style={{ width: 64, height: 64 }}
              initial={{
                x: startX - 32,
                y: startY - 32,
                scale: 1,
                opacity: 1,
              }}
              animate={
                phase === "fly"
                  ? { x: centreX - 32, y: centreY - 32, scale: 1.4, opacity: 1 }
                  : { x: centreX - 32, y: centreY - 32, scale: 2,   opacity: 0 }
              }
              transition={
                phase === "fly"
                  ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.25, ease: "easeIn" }
              }
            >
              <HMLogoSVG
                uid="transition"
                className="h-full w-full"
                glowClass="drop-shadow-[0_0_24px_rgba(0,240,255,0.9)]"
              />
            </motion.div>
          )}

          {/* ── Logo on cover (centre) during full-cover phase ── */}
          {phase === "cover" && (
            <motion.div
              className="absolute z-10 flex items-center justify-center"
              style={{
                width:  120,
                height: 120,
                top:    centreY - 60,
                left:   centreX - 60,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeIn" }}
            >
              <HMLogoSVG
                uid="cover"
                className="h-full w-full"
                glowClass="drop-shadow-[0_0_40px_rgba(0,240,255,0.8)] drop-shadow-[0_0_60px_rgba(225,0,255,0.5)]"
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
