import React, { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "general" | "career" | "startup";
}

const ContactCard: React.FC<ContactCardProps> = ({
  isOpen,
  onClose,
  type = "general",
}) => {
  const email =
    type === "career" || type === "startup"
      ? "hmcoding.career@gmail.com"
      : "hmcoding.h@gmail.com";

  const phone = "+919106147748";

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const subject =
    type === "career"
      ? "Internship Application"
      : type === "startup"
      ? "Startup Idea"
      : "General Inquiry";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: subject,
      },
    ]);

  if (error) {
    console.error(error);
    alert("Failed to send message");
    return;
  }

  alert("Message sent successfully");

  setFormData({
    name: "",
    email: "",
    message: "",
  });

  onClose();
};
  const title =
    type === "career"
      ? "Apply for Internship"
      : type === "startup"
      ? "Share Your Idea"
      : "Contact Us";

  const description =
    type === "career"
      ? "Send us your details to apply for the internship program."
      : type === "startup"
      ? "Have an idea? Let's discuss how we can build it together."
      : "Reach out to us using the form below or our direct channels.";

  const fieldClass =
    "w-full rounded-xl border border-brand-indigo/30 bg-brand-surface px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-brand-black rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative border border-brand-indigo/30"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors shadow-sm"
              aria-label="Close contact card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Left Form Section */}
            <div className="flex-1 p-8 md:p-12 order-2 md:order-1 bg-brand-black relative">
              <div className="absolute top-0 left-0 w-full h-full bg-hero-glow opacity-30 pointer-events-none" />
              <h2 className="relative z-10 text-3xl font-bold text-white mb-3 font-display tracking-wide">
                {title}
              </h2>
              <p className="relative z-10 text-gray-400 mb-10 text-sm">
                {description}
              </p>

              <form className="relative z-10 grid gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="grid gap-2 text-sm font-semibold text-gray-300">
                    Your Name
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className={fieldClass}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-gray-300">
                    Your Email
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className={fieldClass}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-gray-300">
                  Your Message
                  <textarea
                    placeholder="How can we help you?"
                    className={`${fieldClass} min-h-[140px] resize-y`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </label>
                <motion.button
                  type="submit"
                  className="mt-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-4 text-[15px] font-bold text-white hover:opacity-95 transition-all w-full shadow-[0_0_20px_rgba(140,67,123,0.3)] hover:shadow-[0_0_30px_rgba(62,195,202,0.4)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>

            {/* Right Direct Contacts Section */}
            <div className="md:w-[40%] bg-brand-surface p-8 md:p-12 flex flex-col justify-center order-1 md:order-2 relative overflow-hidden border-l border-brand-indigo/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-magenta/10 blur-[80px] pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-white mb-10 relative z-10">Direct Connect</h3>
              
              <div className="flex flex-col gap-8 relative z-10">
                <a href={mailtoLink} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-0.5">Email Us</p>
                    <p className="text-[15px] font-semibold text-white break-all">{email}</p>
                  </div>
                </a>

                {type === "general" && (
                  <a href={`tel:${phone}`} className="group flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-magenta/20 text-brand-magenta group-hover:bg-brand-magenta group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-0.5">Call Us</p>
                      <p className="text-[15px] font-semibold text-white">{phone}</p>
                    </div>
                  </a>
                )}

                {/* <div className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-indigo/30 text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-0.5">Location</p>
                    <p className="text-[15px] font-semibold text-white">
                      HM Coding HQ<br />
                      India
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactCard;