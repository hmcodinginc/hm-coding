import { useId } from "react";

/** Where the logo sits — drives wordmark contrast only (mark gradients vary). */
export type HMCodingLogoTone = "nav-light" | "nav-dark" | "hero";

type HMCodingLogoProps = {
  className?: string;
  tone: HMCodingLogoTone;
  title?: string;
};

/**
 * HM Coding wordmark + mark — transparent presentation (no card backgrounds).
 * Gradient IDs are namespaced with `useId()` so multiple instances never clash.
 */
export function HMCodingLogo({ className, tone, title = "HM Coding" }: HMCodingLogoProps) {
  const sid = `hmc-${useId().replace(/:/g, "")}`;

  const svgProps = {
    className,
    width: "100%",
    height: "100%",
    viewBox: "0 0 450 160",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    "aria-label": title,
  } as const;

  const isHero = tone === "hero";
  const navLight = tone === "nav-light";

  /** Icon gradients: saturated on hero; tuned for light vs dark chrome elsewhere */
  const g1 = `${sid}-g1`;
  const g2 = `${sid}-g2`;

  const hmFill =
    tone === "hero"
      ? "#FFFFFF"
      : navLight
        ? "#1E293B"
        : "#F8FAFC";

  const codingFill =
    tone === "hero"
      ? "rgba(255,255,255,0.72)"
      : navLight
        ? "#64748B"
        : "#94A3B8";

  return (
    <svg {...svgProps}>
      <title>{title}</title>
      <defs>
        {isHero || !navLight ? (
          <>
            <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#0072FF" />
            </linearGradient>
            <linearGradient id={g2} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E100FF" />
              <stop offset="100%" stopColor="#7F00FF" />
            </linearGradient>
          </>
        ) : (
          <>
            <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B4DB" />
              <stop offset="100%" stopColor="#0083B0" />
            </linearGradient>
            <linearGradient id={g2} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" />
            </linearGradient>
          </>
        )}
      </defs>

      <g>
        <rect x={40} y={40} width={14} height={80} rx={5} fill={`url(#${g1})`} />
        <rect x={96} y={40} width={14} height={80} rx={5} fill={`url(#${g1})`} />
        <path
          d="M 47 55 L 75 95 L 103 55"
          stroke={`url(#${g2})`}
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <text
        x={135}
        y={100}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={52}
        fontWeight={800}
        fill={hmFill}
        letterSpacing={-0.5}
      >
        HM
        <tspan fill={codingFill} fontWeight={500} letterSpacing={0}>
          {" "}
          CODING
        </tspan>
      </text>
    </svg>
  );
}
