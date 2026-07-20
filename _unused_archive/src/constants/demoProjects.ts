export interface DemoProject {
  id: number;
  title: string;
  image: string;
  link: string;
}

export const demoProjects: DemoProject[] = [
  {
    id: 1,
    title: "Portfolio Website",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    link: "https://webflow.com/made-in-webflow/portfolio",
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80",
    link: "https://vercel.com/templates/next.js/nextjs-ecommerce",
  },
  {
  id: 3,
  title: "Restaurant Website",
  image:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
  link: "https://react-restaurant-website.vercel.app/",
  },
  {
    id: 4,
    title: "SaaS Web App",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80",
    link: "https://vercel.com/templates/saas",
  },
];
