import {
  getPortfolioProjectBySlug,
  isKnownPortfolioSlug,
  portfolioProjects,
} from "./projects";

export const SITE_URL = "https://hmcoding.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_NAME = "HM Coding";

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

const routes: Record<string, Omit<SeoMeta, "path">> = {
  "/": {
    title: "HM Coding | Custom Software, Web Apps & AI Solutions",
    description:
      "HM Coding builds websites, web apps, mobile apps, and AI-powered systems for startups and growing businesses.",
  },
  "/about": {
    title: "About HM Coding | Software Studio",
    description:
      "Learn how HM Coding designs and ships production software with a focus on craft, performance, and practical results.",
  },
  "/services": {
    title: "Services | Web, Mobile, AI & Business Systems",
    description:
      "Explore HM Coding services: modern websites, web applications, mobile apps, AI integrations, and CRM systems.",
  },
  "/projects": {
    title: "Projects | HM Coding Portfolio",
    description:
      "See HM Coding product demos and live work across CRM, operations, POS, inventory, and conversion analytics.",
  },
  "/careers": {
    title: "Careers | Join HM Coding",
    description:
      "View current openings and internship opportunities at HM Coding. Apply through listed job links or our internship form.",
  },
  "/terms": {
    title: "Terms & Conditions | HM Coding",
    description: "Terms governing HM Coding custom software development services and project engagements.",
  },
  "/privacy": {
    title: "Privacy Policy | HM Coding",
    description:
      "How HM Coding collects and uses contact, review, and project information submitted through this website.",
  },
};

export function resolveSeo(pathname: string): SeoMeta {
  if (pathname.startsWith("/hm-portal-admin-dashboard")) {
    return {
      title: "Admin | HM Coding",
      description: "HM Coding admin portal.",
      path: pathname,
      noindex: true,
    };
  }

  const exact = routes[pathname];
  if (exact) {
    return { ...exact, path: pathname };
  }

  if (pathname.startsWith("/projects/")) {
    const slug = pathname.replace("/projects/", "").replace(/\/$/, "");
    if (isKnownPortfolioSlug(slug)) {
      const project = getPortfolioProjectBySlug(slug);
      if (project) {
        return {
          title: `${project.title} | HM Coding Projects`,
          description: project.shortDescription,
          path: `/projects/${slug}`,
          image: project.imageSrc ? `${SITE_URL}${project.imageSrc}` : DEFAULT_OG_IMAGE,
        };
      }
    }
  }

  return {
    title: "Page not found | HM Coding",
    description: "The page you requested does not exist on the HM Coding website.",
    path: pathname,
    noindex: true,
  };
}

export function getPublicSitemapPaths(): string[] {
  const staticPaths = ["/", "/about", "/services", "/projects", "/careers", "/terms", "/privacy"];
  const projectPaths = portfolioProjects.map((project) => `/projects/${project.slug}`);
  return [...staticPaths, ...projectPaths];
}
