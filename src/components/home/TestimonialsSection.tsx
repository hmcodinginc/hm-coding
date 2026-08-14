import { SectionHeader } from "./SectionHeader";
import { TestimonialCarousel } from "../shared/TestimonialCarousel";
import { supabase } from "../../lib/supabase";
import type { Review } from "../../types/review";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { getUserErrorMessage } from "../../lib/errors";

export function TestimonialsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(getUserErrorMessage(fetchError, "Unable to load testimonials right now."));
      setLoading(false);
      return;
    }

    const reviews: Review[] = (data || []).map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email || "",
      role: r.role || "",
      initials: r.initials || "",
      rating: r.rating || 5,
      text: r.review_text,
      timestamp: r.created_at,
    }));

    setUserReviews(reviews);
    setLoading(false);
  };

  useEffect(() => {
    if (!isInView) return;
    void fetchReviews();
  }, [isInView]);

  const mergedItems = userReviews.map((r) => ({
    quote: r.text,
    name: r.name,
    role: r.role,
    initials: r.initials,
    rating: r.rating,
  }));

  return (
    <section ref={ref} className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="TESTIMONIALS" title="What Our Clients Say" />

        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading testimonials…</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button
              type="button"
              onClick={() => void fetchReviews()}
              className="mt-3 text-sm font-semibold text-brand-cyan"
            >
              Retry
            </button>
          </div>
        ) : (
          <TestimonialCarousel items={mergedItems} />
        )}
      </div>
    </section>
  );
}
