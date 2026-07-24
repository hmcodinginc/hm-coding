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

      {/* ── BG Layer 2: Gradient orbs removed for uniform background ── */}

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

      {/* ── BG Layer 4: Radar sweep removed ────── */}
    </div>
  );
}
