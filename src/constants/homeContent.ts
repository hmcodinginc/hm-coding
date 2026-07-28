export const heroContent = {
  badge: "Digital Solutions That Drive Growth",
  headline: "",
  headlineAccent: "HM Coding",
  subtext:
    "We craft websites, web apps, mobile apps, and intelligent solutions that empower your business to innovate and scale.",
  since: "Since 2025",
  primaryCta: "Start Your Project",
  secondaryCta: "Book a Demo",
  socialProof: {
    count: "50+",
    label: "Happy Clients worldwide",
    avatars: ["AK", "PS", "MR", "JL"],
  },
};

export const whyChooseUsContent = {
  eyebrow: "WHY CHOOSE US",
  title: "We Build Solutions That Drive Results",
  description:
    "From concept to launch, we deliver high-performance digital products tailored to your business goals.",
  features: [
    {
      icon: "rocket",
      title: "Faster Delivery",
      description:
        "Agile workflows and modern tooling help us ship production-ready products on tight timelines without sacrificing quality.",
    },
    {
      icon: "shield",
      title: "Scalable & Secure",
      description:
        "Every project meets high standards of reliability, performance, and security — built to grow with your business.",
    },
    {
      icon: "diamond",
      title: "User-Centered Design",
      description:
        "We think beyond code — designing intuitive experiences that solve real-world problems and delight end users.",
    },
  ],
};

export const processContent = {
  eyebrow: "OUR PROCESS",
  title: "Simple, Transparent, Effective",
  steps: [
    {
      step: 1,
      title: "Discover",
      description:
        "We learn your goals, audience, and constraints through collaborative workshops and requirement mapping.",
    },
    {
      step: 2,
      title: "Design",
      description:
        "Wireframes, prototypes, and visual systems shaped around your brand and user needs before a single line of code.",
    },
    {
      step: 3,
      title: "Build",
      description:
        "Iterative development with regular demos, testing, and deployment — delivering a polished product ready to launch.",
    },
  ],
};

export const featuredProjectsContent = {
  eyebrow: "FEATURED PROJECTS",
  title: "Some of Our Recent Work",
  description:
    "Interactive demos and product-style builds — CRM, POS, and operations dashboards crafted like we ship for clients.",
  ctaLabel: "Full showcase",
};

export const stats = [
  { icon: "👥", value: "50+", label: "Happy Clients" },
  { icon: "📦", value: "100+", label: "Projects Delivered" },
  { icon: "📅", value: "2025", label: "Founded" },
  { icon: "⭐", value: "98%", label: "Client Satisfaction" },
];

export const faqContent = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "How long does a typical project take?",
      answer:
        "Timelines vary by scope. Websites typically take 4–6 weeks, web apps 8–12 weeks, and mobile apps 8–12 weeks. We provide a detailed timeline during the discovery phase.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We build with React, TypeScript, Tailwind CSS, Node.js, and modern cloud infrastructure. For mobile, we use cross-platform and native approaches depending on your needs.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes. We offer maintenance packages, feature updates, and dedicated support plans to keep your product running smoothly after launch.",
    },
    {
      question: "How do we get started?",
      answer:
        "Book a free consultation through our contact form. We'll discuss your goals, scope, and timeline — then provide a tailored proposal within a few business days.",
    },
  ],
};

export const finalCtaContent = {
  title: "Ready to Scale Your Business?",
  description: "Let's build something amazing together. Book a free consultation today.",
  buttonLabel: "Book Free Consultation",
};

export const landingFooterContent = {
  tagline:
    "HM Coding delivers modern, efficient, and scalable software solutions — from web and mobile apps to smart integrations.",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/hm-coding/posts/?feedView=all",icon: "linkedin" },
     { label: "Twitter", href: "https://x.com/HM_Coding" ,icon: "twitter" },
     { label: "Instagram", href: "https://www.instagram.com/hm_coding?igsh=Y3VxOTlyd3phNjR2" ,icon: "instagram" },
  ],
  quickLinks: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Careers", to: "/careers" },
  ],
  companyLinks: [
    { label: "About", to: "/about" as const },
    { label: "Book Demo", action: "contact" as const },
    { label: "Terms & Conditions", to: "/terms" as const },
    { label: "Privacy Policy", to: "/privacy" as const },
  ] as const,
};
