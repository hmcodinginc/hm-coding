/**
 * AnimatedLogo  –  IDLE + BURST + MAGNETIC states
 * ─────────────────────────────────────────────────
 *
 * IDLE (always running while logo is visible):
 *   • Orbit ring rotating 360° / 24 s
 *   • 8 colour-coded particles orbiting at different radii + speeds
 *   • Dual glow pulse (cyan + magenta) breathing in counter-phase
 *   • Micro rotation ±2 ° on the logo body, period 6 s
 *
 * BURST (every 10 s, 1.2 s duration):
 *   • Three concentric rings flash outward and fade
 *   • Particles momentarily expand in radius
 *   • Logo scales up 1 → 1.12 → 1 with spring
 *
 * MAGNETIC (cursor within 200 px of logo centre):
 *   • Logo body softly follows cursor (max ±20 px displacement)
 *   • Glow intensity increases proportional to proximity
 *   • Returns to centre with spring easing when cursor leaves
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import HMLogoSVG from "./HMLogoSVG";
import { useLogoAnim } from "../../context/LogoAnimationContext";

/* ─── particle config ─────────────────────────────────────────── */
const PARTICLES = [
  { dur: "7s",  delay: "0s",    r: "88px",  color: "#00F0FF", size: 5 },
  { dur: "9s",  delay: "-2s",   r: "76px",  color: "#E100FF", size: 4 },
  { dur: "11s", delay: "-4s",   r: "96px",  color: "#7F00FF", size: 4 },
  { dur: "8s",  delay: "-1.5s", r: "68px",  color: "#00F0FF", size: 3 },
  { dur: "13s", delay: "-6s",   r: "104px", color: "#3ec3ca", size: 5 },
  { dur: "6s",  delay: "-3s",   r: "80px",  color: "#8c437b", size: 3 },
  { dur: "10s", delay: "-5s",   r: "112px", color: "#A294C5", size: 4 },
  { dur: "14s", delay: "-7s",   r: "60px",  color: "#00F0FF", size: 3 },
] as const;

/* ─── props ───────────────────────────────────────────────────── */
export type AnimatedLogoProps = {
  variant?: "responsive" | "hero" | "faq";
  className?: string;
};

/* ─── component ───────────────────────────────────────────────── */
export function AnimatedLogo({ variant = "hero", className }: AnimatedLogoProps) {
  const { mode } = useLogoAnim();
  const isBurst = mode === "burst";

  /* ── container sizing ─────────────────────────────────────── */
  const containerSize =
    variant === "faq"
      ? "max-w-[300px]"
      : variant === "responsive"
        ? "max-w-[160px]"
        : "max-w-[440px]";

  /* ── magnetic motion values ────────────────────────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring-smoothed so the movement feels fluid / physical
  const springX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 22 });

  const [magnetStrength, setMagnetStrength] = useState(0); // 0–1

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const MAX_DIST = 200;
    const MAX_PULL = 20; // px

    if (dist < MAX_DIST) {
      const strength = 1 - dist / MAX_DIST;
      setMagnetStrength(strength);
      rawX.set((dx / dist) * strength * MAX_PULL);
      rawY.set((dy / dist) * strength * MAX_PULL);
    } else {
      setMagnetStrength(0);
      rawX.set(0);
      rawY.set(0);
    }
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setMagnetStrength(0);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  /* ── glow intensity based on magnetic proximity ────────────── */
  const glowCyanOpacity  = 0.20 + magnetStrength * 0.45;
  const glowMagentaOpacity = 0.10 + magnetStrength * 0.30;

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex aspect-square w-full items-center justify-center ${containerSize} ${className ?? ""}`}
    >
      {/* ── Ambient glow – breathing + magnetic boost ─────────── */}
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full blur-3xl animate-logo-glow"
        style={{ background: `rgba(62,195,202,${glowCyanOpacity})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[20%] rounded-full blur-2xl animate-logo-glow-reverse"
        style={{ background: `rgba(140,67,123,${glowMagentaOpacity})` }}
        aria-hidden
      />

      {/* ── Orbit ring (primary, 24 s) ───────────────────────── */}
      <div className="pointer-events-none absolute inset-0 animate-orbit-spin" aria-hidden>
        <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="orbit-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#48CFCB" stopOpacity="0.85" />
              <stop offset="50%"  stopColor="#3E4491" stopOpacity="0.5"  />
              <stop offset="100%" stopColor="#B33086" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <circle
            cx="100" cy="100" r="88"
            stroke="url(#orbit-ring-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            opacity="0.75"
          />
          {/* Orbit markers */}
          <circle cx="100" cy="12"  r="3" fill="#48CFCB" opacity="0.9" />
          <circle cx="188" cy="100" r="2.5" fill="#B33086" opacity="0.8" />
          <circle cx="100" cy="188" r="2" fill="#A294C5" opacity="0.7" />
        </svg>
      </div>

      {/* ── Outer counter-rotating arc (30 s) ───────────────── */}
      <div
        className="pointer-events-none absolute inset-[-4%] animate-orbit-spin-reverse opacity-40"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
          <path d="M 100 8 A 92 92 0 0 1 192 100" stroke="#48CFCB" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
          <path d="M 192 100 A 92 92 0 0 1 100 192" stroke="#B33086" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        </svg>
      </div>

      {/* ── 8 Orbiting particles ─────────────────────────────── */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="orbit-particle pointer-events-none"
          style={{
            "--orbit-dur":   p.dur,
            "--orbit-delay": p.delay,
            "--orbit-r":     isBurst ? `${parseInt(p.r) * 1.4}px` : p.r,
            background:      p.color,
            width:           `${p.size}px`,
            height:          `${p.size}px`,
            boxShadow:       `0 0 ${p.size * 3}px ${p.color}`,
            transition:      "all 0.4s ease",
          } as React.CSSProperties}
          aria-hidden
        />
      ))}

      {/* ── Attention BURST rings ────────────────────────────── */}
      <AnimatePresence>
        {isBurst && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`burst-${i}`}
                className="pointer-events-none absolute rounded-full border-2"
                style={{
                  borderColor: i % 2 === 0
                    ? "rgba(0,240,255,0.8)"
                    : "rgba(225,0,255,0.8)",
                  width: "80px", height: "80px",
                  top: "50%", left: "50%",
                  marginTop: "-40px", marginLeft: "-40px",
                }}
                initial={{ scale: 0.8, opacity: 0.9 }}
                animate={{ scale: 4 + i * 1.0, opacity: 0 }}
                exit={{}}
                transition={{
                  duration: 1.0,
                  delay:    i * 0.18,
                  ease:     [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── Logo body: micro-rotate + magnetic pull + burst scale ── */}
      <motion.div
        className="relative z-10 flex items-center justify-center p-4"
        /* Vertical float (idle) */
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          /* Micro-rotation is pure CSS (animate-micro-rotate),
             but Framer Motion handles burst scale + magnetic XY */
          className="animate-micro-rotate logo-magnetic"
          style={{ x: springX, y: springY }}
          animate={isBurst ? { scale: [1, 1.13, 1] } : { scale: [1, 1.03, 1] }}
          transition={
            isBurst
              ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              : { duration: 4,   repeat: Infinity, ease: "easeInOut" }
          }
        >
          <HMLogoSVG
            uid="hero"
            className={
              variant === "faq"
                ? "w-full max-w-[240px] sm:max-w-[280px] h-auto"
                : variant === "responsive"
                  ? "h-10 w-auto max-w-[120px] sm:h-12 sm:max-w-[140px]"
                  : "w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto"
            }
            glowClass={
              variant !== "responsive"
                ? `drop-shadow-[0_0_40px_rgba(0,240,255,${0.35 + magnetStrength * 0.4})] drop-shadow-[0_0_60px_rgba(225,0,255,${0.2 + magnetStrength * 0.3})]`
                : ""
            }
          />
        </motion.div>
      </motion.div>

      {/* ── Pixel sparkle accents ─────────────────────────────── */}
      <span className="pointer-events-none absolute right-[18%] top-[22%] h-1.5 w-1.5 rounded-sm bg-brand-magenta/80 animate-pixel-float"  aria-hidden />
      <span className="pointer-events-none absolute right-[12%] top-[30%] h-1 w-1 rounded-sm bg-brand-cyan/70 animate-pixel-float-delayed"    aria-hidden />
      <span className="pointer-events-none absolute right-[22%] top-[35%] h-1 w-1 rounded-sm bg-brand-lavender/60 animate-pixel-float"         aria-hidden />
    </div>
  );
}
