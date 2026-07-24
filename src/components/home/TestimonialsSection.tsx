import { SectionHeader } from "./SectionHeader";
import { TestimonialCarousel } from "../shared/TestimonialCarousel";
import { supabase } from "../../lib/supabase";
import type { Review } from "../../types/review";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function TestimonialsSection() {
  const [loading, setLoading] = useState(true);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  useEffect(() => {
    if (!isInView) return;

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
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

    fetchReviews();
  }, [isInView]);

const handleAddReview = () => {
  // no-op for now
};
  // Merge fetched testimonials with user reviews
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
      <SectionHeader
  eyebrow="TESTIMONIALS"
  title="What Our Clients Say"
/>

        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading testimonials…</p>
        ) : (
          <TestimonialCarousel items={mergedItems} onAddReview={handleAddReview} />
        )}
      </div>
    </section>
  );
}
