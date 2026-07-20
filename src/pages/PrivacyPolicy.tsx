import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      className="w-full flex flex-col bg-brand-black min-h-screen text-gray-300"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="py-16 md:py-24 relative mt-12">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto px-6 relative z-10 space-y-12"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl font-extrabold text-white font-display mb-8">Privacy Policy</h1>
          </motion.div>
          
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Overview</h2>
            <p className="leading-relaxed">
              HM Coding processes contact information, technical requirements, and project data to deliver custom software solutions. We do not sell personal data.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Information We Collect</h2>
            <p className="leading-relaxed"><strong>Account & Contact Data</strong></p>
            <p className="leading-relaxed">
              Name, email address, phone number, and company details you provide during inquiries, consultations, or when requesting a quote.
            </p>
            <p className="leading-relaxed mt-4"><strong>Usage Data</strong></p>
            <p className="leading-relaxed">
              Interactions with our website, portfolio views, and diagnostic logs needed to operate and improve our online presence.
            </p>
            <p className="leading-relaxed mt-4"><strong>Project Data</strong></p>
            <p className="leading-relaxed">
              When we engage in a project, we collect technical documentation, API keys, source code, and assets you provide to facilitate development. You should only share data you are authorized to provide.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Your Responsibility</h2>
            <p className="leading-relaxed">
              Do not submit highly sensitive personal data (such as health records or full credit card numbers) through our standard contact forms. Share credentials and API keys only through the secure channels we specify during project onboarding.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Billing Information</h2>
            <p className="leading-relaxed">
              Payments for our services are processed through our payment providers. HM Coding stores invoice status, milestone records, and billing references — we do not store full payment card numbers on our servers.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Cookies & Analytics</h2>
            <p className="leading-relaxed">
              We use essential cookies and local storage to operate our website. Optional analytics help us understand user engagement and improve our site's reliability. You can control non-essential cookies through your browser settings.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Third-party Services</h2>
            <p className="leading-relaxed">
              HM Coding relies on infrastructure partners to develop and host your software, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Cloud hosting and database providers (e.g. AWS, Vercel, Supabase)</li>
              <li>Version control systems (e.g. GitHub, GitLab)</li>
              <li>Payment processors for invoicing</li>
              <li>Email delivery for project notifications</li>
            </ul>
            <p className="leading-relaxed mt-2">
              These providers process data only as needed to perform their function and under contractual security obligations.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Data Retention</h2>
            <p className="leading-relaxed">
              Project data and communication history are retained while your engagement is active. Upon project completion, we securely hand over the deliverables. We may retain certain accounting records and contracts as required for legal and tax compliance purposes.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Security Practices</h2>
            <p className="leading-relaxed">
              We apply industry-standard safeguards including encrypted transport (HTTPS), access controls, and secure credential handling during development. No system is perfectly secure — report suspected vulnerabilities to contact@hmcoding.com.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your jurisdiction, you may have rights to access, correct, export, or restrict processing of your personal data. Contact us to submit a request — we respond within a reasonable timeframe.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Delete Data</h2>
            <p className="leading-relaxed">
              You can request the deletion of your personal contact information from our marketing records. Upon your written request at the end of a project, we will securely wipe your proprietary data and environment variables from our local development machines, except where retention is required for legal purposes.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Contact</h2>
            <p className="leading-relaxed">
              Privacy questions or data requests: contact@hmcoding.com
            </p>
          </motion.div>

        </motion.div>
      </section>
    </motion.div>
  );
}
