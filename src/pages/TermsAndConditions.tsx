import { motion } from "framer-motion";

export default function TermsAndConditions() {
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
            <h1 className="text-4xl font-extrabold text-white font-display mb-8">Terms & Conditions</h1>
          </motion.div>
          
          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Overview</h2>
            <p className="leading-relaxed">
              HM Coding provides custom software development services, including website development, mobile applications, Windows desktop applications, and custom AI integrations. By using our services or engaging us for a project, you enter a binding agreement with HM Coding ("we," "us," or "our").
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old and capable of forming a binding contract under applicable law. If you engage HM Coding on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Acceptable Use</h2>
            <p className="leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Request the development of software intended for unlawful, harmful, or abusive purposes.</li>
              <li>Provide us with proprietary code, APIs, or assets that you do not own or lack explicit permission to use.</li>
              <li>Attempt unauthorized access, scraping, or interference with HM Coding's internal systems or client portals.</li>
              <li>Reverse engineer, resell, or misrepresent the pre-existing frameworks we use to build your software.</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Accounts & Security</h2>
            <p className="leading-relaxed">
              If provided with access to a client portal or development environment, you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us promptly if you suspect unauthorized access to your project files or accounts.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Project Payments & Billing</h2>
            <p className="leading-relaxed">
              Project costs, payment schedules, and milestones are described in your specific Statement of Work (SOW) or formal proposal. Unless otherwise stated, a deposit is required before development begins. Invoices for completed milestones are due as specified in your agreement. Taxes may apply based on your jurisdiction.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Refund Policy</h2>
            <p className="leading-relaxed">
              Due to the custom nature of software development, deposits and payments for completed milestones are generally non-refundable once work has commenced. Refund requests for unstarted milestones or exceptional circumstances are reviewed on a case-by-case basis. Contact us with your project details to discuss any billing concerns.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Intellectual Property</h2>
            <p className="leading-relaxed">
              Upon receipt of full payment, you retain ownership of the custom source code, designs, and data created specifically for your project. HM Coding retains ownership of our pre-existing code libraries, proprietary frameworks, and background technology. We grant you a limited, perpetual, non-exclusive license to use these pre-existing materials solely as they are integrated into your final software product.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Limitation of Liability</h2>
            <p className="leading-relaxed">
              Our software development services are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, HM Coding is not liable for indirect, incidental, special, or consequential damages, including lost revenue, lost profits, or data loss arising from the use of the software we develop or our AI integrations.
            </p>
            <p className="leading-relaxed">
              We are not responsible for errors or deprecations caused by third-party APIs or external services integrated into your project. You are responsible for validating the software during the User Acceptance Testing (UAT) phase before deploying it to production.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Termination</h2>
            <p className="leading-relaxed">
              Either party may terminate the project engagement according to the terms specified in the SOW. We may suspend development or terminate access to our portals if you violate these terms or fail to meet payment obligations. Upon termination, your right to ongoing development ceases, and you will be invoiced for all work completed up to the termination date.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Governing Law</h2>
            <p className="leading-relaxed">
              These terms are governed by the laws of India, without regard to conflict-of-law principles. Disputes shall be subject to the exclusive jurisdiction of courts located in India, unless otherwise required by mandatory consumer protection law.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-display">Contact</h2>
            <p className="leading-relaxed">
              Questions about these terms? Email contact@hmcoding.com or write to HM Coding, India.
            </p>
          </motion.div>

        </motion.div>
      </section>
    </motion.div>
  );
}
