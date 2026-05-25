import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "general" | "career" | "startup"; // 👈 updated
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

  // 🔥 Subject logic
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

  // 🔥 Dynamic text
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
      ? "Have an idea? Let’s discuss how we can build it together."
      : "Reach out to us using the options below.";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-5 text-sm leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col gap-3">

              {/* Email */}
              <motion.a
                href={mailtoLink}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                📧 {email}
              </motion.a>

              {/* Phone (only general) */}
              {type === "general" && (
                <motion.a
                  href={`tel:${phone}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  📞 {phone}
                </motion.a>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactCard;