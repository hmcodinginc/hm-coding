import { motion } from "framer-motion";
import type { ServiceItemType } from "../../constants/services";

type ServiceDetailPanelProps = {
  service: ServiceItemType;
  onEnquiry: () => void;
};

export function ServiceDetailPanel({ service, onEnquiry }: ServiceDetailPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card-surface relative overflow-hidden rounded-[2rem] p-5 sm:p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-brand-indigo/40 bg-brand-surface group"
    >
      <div className="absolute top-0 right-0 w-[150%] sm:w-[80%] max-w-[500px] aspect-square bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/20 via-brand-magenta/10 to-transparent blur-[100px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-70" />
      
      <div className="relative z-10 flex flex-col gap-8">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col gap-5 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-cyan w-fit hover:bg-brand-cyan/20 transition-colors cursor-default">
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse"></span> OUR SERVICE
            </div>
            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight break-words">
              {service.title} <span className="bg-gradient-to-r from-brand-cyan to-brand-magenta bg-clip-text text-transparent break-words">{service.highlightTitle}</span>
            </h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
              {service.description}
            </p>
          </div>
          <div className="hidden md:flex h-56 w-80 items-center justify-center relative overflow-hidden rounded-2xl group/image">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/30 to-brand-magenta/30 blur-[20px] rounded-full mix-blend-screen transition-all duration-700 group-hover/image:scale-110" />
           <img
  src={service.imageUrl}
  alt={service.title}
  loading="lazy"
  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
/>
          </div>
        </div>

        {/* Row 1: Timeframe & What You Get */}
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex-1 rounded-[1.5rem] border border-brand-indigo/20 bg-brand-black/50 p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start lg:items-center hover:border-brand-cyan/40 hover:bg-brand-black/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(62,195,202,0.15)]">
            
            <div className="flex items-center gap-4 sm:gap-6 lg:pr-8 lg:border-r border-white/10 w-full lg:w-auto">
              <div className="flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_20px_rgba(62,195,202,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-widest text-brand-mint mb-1.5">Project Timeframe</span>
                <span className="text-xl sm:text-3xl font-bold text-white mb-1.5 leading-tight">{service.avgTime}</span>
                <span className="text-xs text-gray-500 font-medium">Subject to project requirements</span>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-auto">
              <span className="text-[12px] font-bold uppercase tracking-widest text-brand-magenta mb-5 block">What You Get</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {service.whatYouGet?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item cursor-default">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-magenta/10 text-brand-magenta text-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:bg-brand-magenta/20">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover/item:text-brand-magenta transition-colors">{item.title}</span>
                      <span className="text-[11px] text-gray-400">{item.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Row 2: What We Provide & Variants */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 rounded-[1.5rem] border border-brand-indigo/20 bg-brand-black/50 p-5 sm:p-6 md:p-8 hover:border-brand-cyan/40 hover:bg-brand-black/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(62,195,202,0.15)]">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-brand-cyan mb-6">What We Provide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {service.whatWeProvide?.map((item, i) => (
                <div key={i} className="flex items-start gap-4 sm:gap-5 group/feature cursor-default">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-surface border border-white/5 text-xl sm:text-2xl shadow-inner transition-transform duration-300 group-hover/feature:scale-110 group-hover/feature:rotate-3 group-hover/feature:border-brand-cyan/30">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <span className="text-[15px] font-bold text-white group-hover/feature:text-brand-cyan transition-colors">{item.title}</span>
                    <span className="text-xs text-gray-400 leading-relaxed font-medium">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-brand-indigo/20 bg-brand-black/50 p-5 sm:p-6 md:p-8 hover:border-brand-magenta/40 hover:bg-brand-black/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(140,67,123,0.15)]">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-brand-magenta mb-6">Our Variants</h4>
            <div className="flex flex-wrap gap-3">
              {service.variations.map((variation) => (
                <span
                  key={variation}
                  className="rounded-full border border-brand-indigo/30 bg-brand-surface px-5 py-2.5 text-xs font-bold text-gray-300 transition-all duration-300 hover:border-brand-magenta hover:bg-brand-magenta/10 hover:text-white cursor-default shadow-sm hover:scale-105 hover:-translate-y-0.5"
                >
                  {variation}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Row 3: Call to Action */}
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[1.5rem] border border-brand-cyan/30 bg-gradient-to-r from-brand-cyan/10 to-brand-magenta/10 p-5 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(62,195,202,0.15)] hover:shadow-[0_0_40px_rgba(62,195,202,0.25)] transition-all duration-300 group/cta">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan/20 text-brand-cyan transition-transform duration-300 group-hover/cta:scale-110 group-hover/cta:rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                </svg>
             </div>
             <div className="flex flex-col gap-0.5">
               <span className="text-[15px] font-bold text-brand-mint">Have a project in mind?</span>
               <span className="text-xs text-gray-400 font-medium">Let's build something amazing together.</span>
             </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnquiry}
            className="group/btn flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-indigo to-brand-magenta px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-[15px] font-bold text-white shadow-lg transition-all hover:shadow-[0_0_25px_rgba(140,67,123,0.6)] w-full sm:w-auto justify-center break-words"
          >
            <span>Get a Custom Quote</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover/btn:translate-x-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
}
