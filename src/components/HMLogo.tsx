/**
 * HMLogo – thin wrapper around HMLogoSVG for backward-compatible usage.
 * Replaces the old PNG <img> so the inline SVG is used everywhere.
 */
import type { FC } from "react";
import HMLogoSVG from "./shared/HMLogoSVG";

export type HMLogoProps = {
  className?: string;
  variant?: "responsive" | "hero" | "faq";
};

const sizeByVariant: Record<string, string> = {
  responsive: "h-10 w-auto max-w-[120px] sm:h-12 sm:max-w-[140px]",
  hero:       "w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto",
  faq:        "w-full max-w-[240px] sm:max-w-[280px] h-auto",
};

const glowByVariant: Record<string, string> = {
  responsive: "",
  hero:       "drop-shadow-[0_0_40px_rgba(0,240,255,0.45)] drop-shadow-[0_0_60px_rgba(225,0,255,0.25)]",
  faq:        "drop-shadow-[0_0_24px_rgba(0,240,255,0.35)]",
};

const HMLogo: FC<HMLogoProps> = ({ className, variant = "responsive" }) => {
  const sizeClass = className?.trim() ? className : sizeByVariant[variant];
  const glowClass = glowByVariant[variant] ?? "";

  return (
    <HMLogoSVG 
      uid={variant}
      className={sizeClass}
      glowClass={glowClass}
    />
  );
};

export default HMLogo;
