export type PortfolioProjectStatus = "live" | "coming_soon" | "case_study";

export type PortfolioProject = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: readonly string[];
  status: PortfolioProjectStatus;
  /** Tailwind classes for the card header strip (gradient or solid). */
  accentGradient: string;
  /** Short visual: emoji, icon glyph, or single character. */
  visual: string;
  /** Responsive preview image from public/project-images or an external URL. */
  imageSrc?: string;
  imageAlt?: string;
  /** Extra CSS classes for the image (e.g. for scaling or positioning) */
  imageClassName?: string;
  /** Optional public demo (external). */
  externalDemoUrl?: string;
  /** Optional direct external link to override the View Project button. */
  directLink?: string;
  /** Optional case study or article (future). */
  caseStudyUrl?: string;
};
