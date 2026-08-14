/* eslint-disable react-refresh/only-export-components */
/**
 * LogoAnimationContext
 * ────────────────────
 * Shared state for the 5 logo animation modes so every consumer
 * (AnimatedLogo, Header, LogoPageTransition, LogoLoader) stays in sync.
 *
 * Modes:
 *  'idle'        – orbit + particles + glow + micro-rotation always running
 *  'burst'       – attention burst every 10 s (short override)
 *  'transitioning' – page-change portal sequence is active
 *  'loading'     – first-visit logo-draw sequence is active
 */
import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

export type LogoAnimMode = "idle" | "burst" | "transitioning" | "loading";

interface LogoAnimContextValue {
  mode: LogoAnimMode;
  setMode: (m: LogoAnimMode) => void;
  /** Navbar logo DOM ref – LogoPageTransition reads its position */
  navLogoRef: React.RefObject<HTMLDivElement | null>;
  /** Signal an attention burst (resets to idle after 1.2 s) */
  triggerBurst: () => void;
}

const LogoAnimContext = createContext<LogoAnimContextValue | null>(null);

export function LogoAnimationProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeRaw] = useState<LogoAnimMode>("loading");
  const navLogoRef = useRef<HTMLDivElement | null>(null);
  const burstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setMode = useCallback((m: LogoAnimMode) => setModeRaw(m), []);

  const triggerBurst = useCallback(() => {
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    setModeRaw("burst");
    burstTimerRef.current = setTimeout(() => setModeRaw("idle"), 1200);
  }, []);

  // Attention burst every 10 s (only while idle)
  useEffect(() => {
    const id = setInterval(() => {
      setModeRaw((prev) => {
        if (prev === "idle") {
          // Auto-reset after burst duration
          setTimeout(() => setModeRaw("idle"), 1200);
          return "burst";
        }
        return prev;
      });
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <LogoAnimContext.Provider value={{ mode, setMode, navLogoRef, triggerBurst }}>
      {children}
    </LogoAnimContext.Provider>
  );
}

export function useLogoAnim() {
  const ctx = useContext(LogoAnimContext);
  if (!ctx) throw new Error("useLogoAnim must be used inside LogoAnimationProvider");
  return ctx;
}
