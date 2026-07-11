import type { FC, SVGProps } from "react";

/**
 * Inline SVG version of public/favicon.svg.
 * Using inline SVG (instead of <img>) lets Framer Motion and CSS
 * animate individual paths (draw, glow, colour-shift).
 *
 * Gradient IDs are namespaced with a `hms-` prefix to avoid conflicts
 * when multiple instances appear on the same page.
 */
export type HMLogoSVGProps = SVGProps<SVGSVGElement> & {
  /** Unique ID suffix to avoid duplicate gradient IDs in DOM */
  uid?: string;
  /** Extra filter / glow class forwarded to the root <svg> */
  glowClass?: string;
};

const HMLogoSVG: FC<HMLogoSVGProps> = ({
  uid = "a",
  glowClass = "",
  className = "",
  ...rest
}) => {
  const barId   = `hms-bar-${uid}`;
  const strokeId = `hms-stroke-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="35 35 80 90"
      role="img"
      aria-label="HM Coding"
      className={`${glowClass} ${className}`}
      {...rest}
    >
      <defs>
        {/* Cyan → Blue gradient for the two vertical bars */}
        <linearGradient id={barId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#0072FF" />
        </linearGradient>

        {/* Magenta → Purple gradient for the V-stroke */}
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#E100FF" />
          <stop offset="100%" stopColor="#7F00FF" />
        </linearGradient>
      </defs>

      {/* Left vertical bar */}
      <rect
        className="hm-bar-left"
        x="40" y="50" width="14" height="65" rx="5"
        fill={`url(#${barId})`}
      />

      {/* Right vertical bar */}
      <rect
        className="hm-bar-right"
        x="96" y="50" width="14" height="65" rx="5"
        fill={`url(#${barId})`}
      />

      {/* V / M chevron stroke */}
      <path
        className="hm-v-stroke"
        d="M 47 55 L 75 95 L 103 55"
        stroke={`url(#${strokeId})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default HMLogoSVG;
