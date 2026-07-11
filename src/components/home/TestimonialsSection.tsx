import { SectionHeader } from "./SectionHeader";
import { TestimonialCarousel } from "../shared/TestimonialCarousel";
// import { useJsonData } from "../../hooks/useJsonData";
import { supabase } from "../../lib/supabase";
import type { Review } from "../../types/review";
import { useEffect, useState } from "react";

// type TestimonialsData = {
//   eyebrow: string;
//   title: string;
//   items: {
//     quote: string;
//     name: string;
//     role: string;
//     initials: string;
//     rating: number;
//   }[];
// };

// const TESTIMONIALS_FALLBACK: TestimonialsData = {
//   eyebrow: "TESTIMONIALS",
//   title: "What Our Clients Say",
//   items: [
//     {
//       quote:
//         "HM Coding transformed our operations with a custom CRM that our team actually enjoys using.",
//       name: "Sarah Johnson",
//       role: "CEO, HealthPlus",
//       initials: "SJ",
//       rating: 5,
//     },
//   ],
// };

export function TestimonialsSection() {
 const [loading, setLoading] = useState(true);
const [userReviews, setUserReviews] = useState<Review[]>([]);

useEffect(() => {
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
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
}, []);

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
    <section className="bg-brand-black py-20">
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
