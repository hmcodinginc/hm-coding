import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewForm } from "../home/ReviewForm";
import type { Review } from "../../types/review";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
};

type TestimonialCarouselProps = {
  items: TestimonialItem[];
  onAddReview?: (review: Omit<Review, 'id' | 'timestamp'>) => void;
};

export function TestimonialCarousel({ items, onAddReview }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  if (items.length === 0) return null;

  const totalSlides = items.length + 1; // +1 for the "Add Review" slide

  const prev = () => {
    setIsAdding(false);
    setIndex((i) => (i === 0 ? totalSlides - 1 : i - 1));
  };
  const next = () => {
    setIsAdding(false);
    setIndex((i) => (i === totalSlides - 1 ? 0 : i + 1));
  };

  const handleReviewAdded = (review: Omit<Review, 'id' | 'timestamp'>) => {
    if (onAddReview) {
      onAddReview(review);
    }
    // Navigate back to the newly added review (which will be at index 0 because it prepends in TestimonialsSection, wait no, 
    // actually just reset view)
    setIsAdding(false);
    setIndex(0);
  };

  return (
    <div className="relative mx-auto max-w-2xl px-4 sm:px-0">
      <button
        type="button"
        onClick={prev}
        className="hidden lg:flex absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-indigo/30 bg-brand-surface text-brand-cyan transition hover:border-brand-cyan md:-left-14"
        aria-label="Previous testimonial"
      >
        ←
      </button>

      <button
        type="button"
        onClick={next}
        className="hidden lg:flex absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-indigo/30 bg-brand-surface text-brand-cyan transition hover:border-brand-cyan md:-right-14"
        aria-label="Next testimonial"
      >
        →
      </button>

      <AnimatePresence mode="wait">
        {index < items.length ? (
          <motion.div
            key={index}
            className="card-surface p-6 sm:p-8 text-center md:p-10 min-h-[300px] flex flex-col justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) next();
              else if (swipe > 50) prev();
            }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-center gap-1 text-yellow-400" aria-label={`${items[index].rating} stars`}>
              {Array.from({ length: items[index].rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <blockquote className="mt-6 text-lg italic leading-relaxed text-gray-300">
              &ldquo;{items[index].quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-indigo font-semibold text-brand-cyan">
                {items[index].initials}
              </span>
              <div className="text-left">
                <p className="font-semibold text-white">{items[index].name}</p>
                <p className="text-sm text-gray-400">{items[index].role}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="add-review"
            className={`card-surface p-4 sm:p-8 text-center md:p-10 min-h-[300px] flex flex-col items-center ${!isAdding ? 'justify-center' : 'justify-start pt-8'} w-full overflow-y-auto max-h-[85vh] sm:max-h-none ${!isAdding ? 'cursor-grab active:cursor-grabbing' : ''}`}
            drag={!isAdding ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset }) => {
              if (isAdding) return;
              const swipe = offset.x;
              if (swipe < -50) next();
              else if (swipe > 50) prev();
            }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {!isAdding ? (
              <div className="flex flex-col items-center justify-center h-full">
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-brand-cyan/50 bg-brand-cyan/10 text-4xl text-brand-cyan transition hover:scale-105 hover:bg-brand-cyan/20 hover:border-brand-cyan"
                  aria-label="Add your review"
                >
                  +
                </button>
                <p className="mt-6 text-lg font-medium text-white">Share Your Experience</p>
                <p className="text-sm text-gray-400 mt-2">Click to leave a review</p>
              </div>
            ) : (
              <div className="w-full text-left">
                <ReviewForm onAddReview={handleReviewAdded} />
                <button 
                  onClick={() => setIsAdding(false)} 
                  className="mt-4 text-sm text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 hidden sm:flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIsAdding(false);
              setIndex(i);
            }}
            className={`h-2 rounded-full transition-all ${
              index === i ? "w-6 bg-brand-cyan" : "w-2 bg-brand-indigo/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {!isAdding && index < items.length && (
        <div className="mt-6 flex sm:hidden items-center justify-between w-full px-2">
          <button
            onClick={next}
            className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-6 py-2.5 text-sm font-semibold text-brand-cyan transition hover:bg-brand-cyan/20"
          >
            Next
          </button>
          <button
            onClick={() => {
              setIsAdding(true);
              setIndex(totalSlides - 1);
            }}
            className="rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-6 py-2.5 text-sm font-semibold text-brand-magenta transition hover:bg-brand-magenta/20"
          >
            Add Review
          </button>
        </div>
      )}
    </div>
  );
}
