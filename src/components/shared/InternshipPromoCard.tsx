import { motion } from "framer-motion";
import { Heading, Text } from "../ui/Typography";
import { Button } from "../ui/Button";

type InternshipPromoCardProps = {
  title: React.ReactNode;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  buttonClassName?: string;
  className?: string;
};

export function InternshipPromoCard({
  title,
  description,
  buttonLabel,
  onButtonClick,
  buttonClassName = "w-max mx-auto sm:w-auto",
  className = "",
}: InternshipPromoCardProps) {
  return (
    <div className={`w-full text-center flex justify-center relative z-10 ${className}`}>
      <motion.div 
        className="w-[90%] max-w-4xl mx-auto"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="card-surface group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-cyan/20 bg-brand-gradient/10 p-6 sm:p-10 md:p-14 shadow-card-md">
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          <Heading level={2} className="relative z-10 mb-4 sm:mb-6">
            {title}
          </Heading>

          <Text variant="lead" className="relative z-10 mx-auto mb-6 sm:mb-10 max-w-3xl">
            {description}
          </Text>

          <Button
            variant="primary"
            size="lg"
            onClick={onButtonClick}
            className={`relative z-50 btn-shimmer ${buttonClassName}`}
          >
            {buttonLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
