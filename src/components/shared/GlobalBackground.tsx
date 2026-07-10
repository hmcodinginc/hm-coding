import React from "react";

const DOTS = [
  { x: "12%", y: "18%", dur: "4.2s", delay: "0s",    opacity: 0.6, size: 3, color: "#00F0FF" },
  { x: "78%", y: "25%", dur: "5.1s", delay: "-1.2s", opacity: 0.5, size: 2, color: "#E100FF" },
  { x: "35%", y: "72%", dur: "3.8s", delay: "-0.5s", opacity: 0.7, size: 4, color: "#3ec3ca" },
  { x: "88%", y: "60%", dur: "6.0s", delay: "-2.1s", opacity: 0.4, size: 2, color: "#A294C5" },
  { x: "55%", y: "85%", dur: "4.5s", delay: "-1.8s", opacity: 0.6, size: 3, color: "#00F0FF" },
  { x: "22%", y: "45%", dur: "5.5s", delay: "-0.9s", opacity: 0.5, size: 2, color: "#8c437b" },
  { x: "67%", y: "15%", dur: "3.6s", delay: "-3.0s", opacity: 0.7, size: 3, color: "#E100FF" },
  { x: "44%", y: "55%", dur: "4.8s", delay: "-1.5s", opacity: 0.4, size: 2, color: "#3ec3ca" },
  { x: "8%",  y: "65%", dur: "5.8s", delay: "-2.4s", opacity: 0.6, size: 4, color: "#00F0FF" },
  { x: "92%", y: "42%", dur: "4.1s", delay: "-0.3s", opacity: 0.5, size: 2, color: "#A294C5" },
  { x: "30%", y: "30%", dur: "6.2s", delay: "-1.1s", opacity: 0.7, size: 3, color: "#E100FF" },
  { x: "70%", y: "78%", dur: "3.9s", delay: "-2.7s", opacity: 0.5, size: 2, color: "#8c437b" },
] as const;

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-brand-black bg-hero-glow">
      {/* ── BG Layer 1: Animated drifting grid ──────────────── */}
      <div
        className="absolute inset-0 animate-grid-drift opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(62,195,202,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(62,195,202,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      {/* ── BG Layer 2: Gradient orbs ────────────────────────── */}
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute animate-float-orb-slow"
          style={{
            top: "5%", left: "5%",
            width: "500px", height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,240,255,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute animate-float-orb-delayed"
          style={{
            bottom: "5%", right: "5%",
            width: "420px", height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(225,0,255,0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute animate-float-orb-slow"
          style={{
            top: "30%", left: "40%",
            width: "300px", height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(53,67,138,0.10) 0%, transparent 70%)",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* ── BG Layer 3: Floating particles ───────────────────── */}
      <div className="absolute inset-0" aria-hidden>
        {DOTS.map((d, i) => (
          <span
            key={i}
            className="float-dot absolute rounded-full"
            style={{
              left: d.x,
              top:  d.y,
              width:  `${d.size}px`,
              height: `${d.size}px`,
              background: d.color,
              boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
              "--dot-dur":     d.dur,
              "--dot-delay":   d.delay,
              "--dot-opacity": d.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── BG Layer 4: Radar sweep – bottom-right corner ────── */}
      <div
        className="absolute"
        style={{ bottom: "-20%", right: "-10%", width: "400px", height: "400px" }}
        aria-hidden
      >
        <div className="relative h-full w-full animate-radar">
          <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
            {[40, 70, 100].map((r) => (
              <circle key={r} cx="100" cy="100" r={r}
                stroke="rgba(62,195,202,0.12)" strokeWidth="1" />
            ))}
            <path
              d="M 100 100 L 100 0"
              stroke="rgba(0,240,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 100 100 L 100 0 A 100 100 0 0 1 170 170 Z"
              fill="url(#radar-fill)"
              opacity="0.07"
            />
            <defs>
              <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#00F0FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0"   />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
