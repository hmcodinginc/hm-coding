import React, { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { getUserErrorMessage } from "../lib/errors";
import { isValidEmail, trimToLength } from "../lib/validation";

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "general" | "career" | "startup" | "demo";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const subject =
    type === "career"
      ? "Internship Application"
      : type === "startup"
        ? "Startup Idea"
        : type === "demo"
          ? "Demo Request"
          : "General Inquiry";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen, type]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const name = trimToLength(formData.name, 80);
    const userEmail = trimToLength(formData.email, 120);
    const message = trimToLength(formData.message, 2000);

    if (formData.website.trim()) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
      return;
    }

    if (name.length < 2 || message.length < 8 || !isValidEmail(userEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid name, email, and a message of at least 8 characters.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email: userEmail,
        message,
        subject,
      },
    ]);

    setSubmitting(false);

    if (error) {
      setStatus("error");
      setErrorMessage(getUserErrorMessage(error, "Unable to send your message. Please try email instead."));
      return;
    }

    setStatus("success");
    setFormData({ name: "", email: "", message: "", website: "" });
  };

  const title =
    type === "career"
      ? "Apply for Internship"
      : type === "startup"
        ? "Share Your Idea"
        : type === "demo"
          ? "Book a Demo"
          : "Contact Us";

  const description =
    type === "career"
      ? "Send us your details to apply for the internship program."
      : type === "startup"
        ? "Have an idea? Let's discuss how we can build it together."
        : type === "demo"
          ? "Schedule a demonstration of our products and services tailored for your business."
          : "Reach out to us using the form below or our direct channels.";

  const fieldClass =
    "w-full rounded-xl border border-brand-indigo/30 bg-brand-surface px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <div className="flex min-h-full justify-center p-4 py-4 sm:py-10">
            <motion.div
              className="relative m-auto flex w-full max-w-5xl flex-col rounded-[2rem] border border-brand-indigo/30 bg-brand-black shadow-2xl lg:flex-row"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
            >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
              aria-label="Close contact card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="relative order-1 flex-1 shrink-0 overflow-hidden rounded-t-[2rem] bg-brand-black p-5 sm:p-6 lg:rounded-l-[2rem] lg:rounded-tr-none lg:p-12">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-hero-glow opacity-30" />
              <h2 id="contact-dialog-title" className="relative z-10 mb-2 pr-10 font-display text-2xl font-bold tracking-wide text-white sm:mb-3 sm:pr-0 sm:text-3xl">
                {title}
              </h2>
              <p className="relative z-10 mb-6 text-[13px] text-gray-400 sm:mb-10 sm:text-sm">
                {description}
              </p>

              {status === "success" ? (
                <div className="relative z-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300" role="status">
                  Message received. We will get back to you by email. You can also reach us directly using the contacts on the right.
                </div>
              ) : (
              <form className="relative z-10 grid gap-4 sm:gap-6" onSubmit={handleSubmit} noValidate>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <label className="grid gap-1.5 text-sm font-semibold text-gray-300 sm:gap-2">
                    Your Name
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className={fieldClass}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={80}
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold text-gray-300 sm:gap-2">
                    Your Email
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className={fieldClass}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={120}
                    />
                  </label>
                </div>
                <label className="grid gap-1.5 text-sm font-semibold text-gray-300 sm:gap-2">
                  Your Message
                  <textarea
                    placeholder="How can we help you?"
                    className={`${fieldClass} min-h-[100px] resize-y sm:min-h-[140px]`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    maxLength={2000}
                  />
                </label>
                {status === "error" && (
                  <p className="text-sm text-red-400" role="alert">{errorMessage}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-max rounded-xl bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 text-[14px] font-bold text-white shadow-[0_0_20px_rgba(140,67,123,0.3)] transition-all hover:opacity-95 hover:shadow-[0_0_30px_rgba(62,195,202,0.4)] disabled:opacity-60 sm:mt-4 sm:w-auto sm:py-4 sm:text-[15px]"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
              )}
            </div>

            <div className="relative order-2 flex shrink-0 flex-col justify-center overflow-hidden rounded-b-[2rem] border-t border-brand-indigo/30 bg-brand-surface p-6 lg:w-[40%] lg:rounded-bl-none lg:rounded-r-[2rem] lg:border-l lg:border-t-0 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-brand-cyan/10 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-brand-magenta/10 blur-[80px]" />

              <h3 className="relative z-10 mb-10 text-2xl font-bold text-white">Direct Connect</h3>

              <div className="relative z-10 flex flex-col gap-8">
                <a href={mailtoLink} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan transition-colors group-hover:bg-brand-cyan group-hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm text-gray-400">Email Us</p>
                    <p className="break-words break-all text-[13px] font-semibold text-white sm:break-normal sm:text-[15px]">{email}</p>
                  </div>
                </a>

                {type === "general" && (
                  <a href={`tel:${phone}`} className="group flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-magenta/20 text-brand-magenta transition-colors group-hover:bg-brand-magenta group-hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm text-gray-400">Call Us</p>
                      <p className="text-[15px] font-semibold text-white">{phone}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactCard;
