export type ServiceItemType = {
  title: string;
  highlightTitle: string;
  description: string;
  avgTime: string;
  price: string;
  imageUrl:string;
  whatYouGet: { icon: string; title: string; subtitle: string }[];
  whatWeProvide: { icon: string; title: string; desc: string }[];
  variations: string[];
  
};

export const services: ServiceItemType[] = [
  {
    title: "Website",
    highlightTitle: "Details",
    description: "We craft high-performing websites that are modern, scalable, and tailored to your business goals.",
    avgTime: "4 - 6 Weeks",
    price: "20,000-30,000 (Subject to change, negotiable)",
    imageUrl: "/service/website.jpg",
    whatYouGet: [
      { icon: "✓", title: "Modern & Scalable", subtitle: "Solutions" },
      { icon: "🛡️", title: "Secure & Reliable", subtitle: "Development" },
      { icon: "🎧", title: "Dedicated", subtitle: "Support" },
    ],
    whatWeProvide: [
      { icon: "🖥️", title: "Custom UI/UX Design", desc: "Pixel-perfect, user-focused designs that engage." },
      { icon: "⚙️", title: "Full Development", desc: "Robust, clean & scalable code for your business." },
      { icon: "🔍", title: "SEO Setup", desc: "On-page optimization to help you rank higher." },
      { icon: "☁️", title: "Hosting Support", desc: "Reliable hosting & ongoing technical support." }
    ],
    variations: ["Business", "Portfolio", "E-commerce", "Landing Page", "Blog", "Custom Web"],
  },
  {
    title: "Web App",
    highlightTitle: "Details",
    description: "Powerful web applications with dynamic features built for complex workflows.",
    avgTime: "8 - 12 Weeks",
    price: "50,000-1,00,000 (Subject to change, negotiable)",
    imageUrl: "/service/mobile.png",
    whatYouGet: [
      { icon: "⚡", title: "High Performance", subtitle: "Architecture" },
      { icon: "🔒", title: "Enterprise Grade", subtitle: "Security" },
      { icon: "🔄", title: "Seamless", subtitle: "Integration" },
    ],
    whatWeProvide: [
      { icon: "📊", title: "Admin Dashboards", desc: "Comprehensive data visualization and management." },
      { icon: "🛠️", title: "Custom Logic", desc: "Complex business logic translated to code." },
      { icon: "🔌", title: "API Development", desc: "Robust backend APIs for your frontend." },
      { icon: "🧪", title: "QA Testing", desc: "Rigorous testing for bug-free deployment." }
    ],
    variations: ["Dashboard", "CRM", "SaaS", "ERP", "Portal", "PWA"],
  },
  {
    title: "Mobile App",
    highlightTitle: "Details",
    description: "Native and cross-platform mobile apps with smooth UX/UI for iOS and Android.",
    avgTime: "8 - 12 Weeks",
    price: "80,000 - 1,50,000 (Subject to change, negotiable)",
    imageUrl: "/service/app.jpg",
    whatYouGet: [
      { icon: "📱", title: "Native Experience", subtitle: "On all devices" },
      { icon: "🚀", title: "App Store", subtitle: "Deployment" },
      { icon: "🔔", title: "Push", subtitle: "Notifications" },
    ],
    whatWeProvide: [
      { icon: "🍏", title: "iOS Development", desc: "Swift-based native apps for Apple ecosystem." },
      { icon: "🤖", title: "Android Dev", desc: "Kotlin/Java apps optimized for Android." },
      { icon: "⚛️", title: "Cross-Platform", desc: "React Native apps for both platforms." },
      { icon: "🎨", title: "App UI/UX", desc: "Engaging and intuitive mobile interfaces." }
    ],
    variations: ["E-Commerce App", "Social Media", "Utility App", "On-Demand", "Booking", "Fintech"],
  },
  {
    title: "Smart",
    highlightTitle: "Integrations",
    description: "Future-ready intelligent solutions to automate and enhance your business operations.",
    avgTime: "12 - 16 Weeks",
    price: "1,00,000 (Starting price)",
    imageUrl: "/service/ai_integration.jpg",
    whatYouGet: [
      { icon: "🧠", title: "AI Powered", subtitle: "Algorithms" },
      { icon: "📈", title: "Data Driven", subtitle: "Insights" },
      { icon: "🤖", title: "Automated", subtitle: "Workflows" },
    ],
    whatWeProvide: [
      { icon: "💬", title: "Smart Chatbots", desc: "Conversational AI for customer support." },
      { icon: "🎯", title: "Recommendations", desc: "Personalized content and product engines." },
      { icon: "📊", title: "Predictive Analytics", desc: "Forecast trends using your data." },
      { icon: "🔗", title: "Third-party APIs", desc: "Connecting your app with external services." }
    ],
    variations: ["Chatbots", "Recommendation", "Analytics", "Automation", "NLP", "Computer Vision"],
  }
];