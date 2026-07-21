import { motion } from "framer-motion";
import { MessageSquare, Rocket, Headphones, Bell } from "lucide-react";

export function FaqAiAssistant() {
  const features = [
    {
      icon: MessageSquare,
      title: "Instant Answers",
      description: "Get quick replies to your questions",
      color: "text-brand-magenta",
    },
    {
      icon: Rocket,
      title: "Project Guidance",
      description: "Find the right solution for your needs",
      color: "text-brand-cyan",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here whenever you need us",
      color: "text-blue-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-brand-indigo/20 bg-brand-surface/40 p-5 sm:p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-surface shadow-[0_0_30px_rgba(62,195,202,0.15)] overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-cyan/10 to-brand-magenta/10" />
          <img 
            src="/assets/ai_bot_icon.jpg" 
            alt="AI Assistant Bot" 
            className="relative z-10 h-full w-full object-cover mix-blend-screen scale-110"
          />
        </div>

        <span className="mb-2 rounded-full bg-brand-indigo/10 px-3 py-0.5 text-[10px] font-bold tracking-wider text-brand-lavender">
          COMING SOON
        </span>

        <h3 className="mb-1 bg-gradient-to-r from-brand-magenta to-brand-cyan bg-clip-text text-xl font-bold text-transparent">
          AI Assistant
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-gray-400">
          Get instant answers, project guidance, and support directly on our website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              className="group flex flex-col items-center text-center gap-2 cursor-default"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-black/50 transition-colors group-hover:bg-brand-surface shadow-md shadow-black/20">
                <Icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white transition-colors group-hover:text-brand-cyan">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 pt-2">
        <button
          type="button"
          disabled
          className="group relative flex w-full items-center justify-center gap-2 rounded-full border border-brand-lavender/30 bg-brand-black/50 px-5 py-2 text-xs font-semibold text-brand-lavender transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {/* We use an absolute inset overlay for the hover effect so disabled state doesn't block it on some browsers */}
          <div className="absolute inset-0 rounded-full transition-colors duration-300 group-hover:border group-hover:border-brand-magenta group-hover:bg-brand-magenta/10" />
          <Bell className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-cyan" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-cyan">
            Launching Soon
          </span>
        </button>
      </div>
    </motion.div>
  );
}
