// src/components/home/ReviewForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Review } from "../../types/review";
import { supabase } from "../../lib/supabase";
interface ReviewFormProps {
  onAddReview?: (review: Omit<Review, 'id' | 'timestamp'>) => void;
}

export function ReviewForm({ onAddReview }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalRole = role === "Other" ? otherRole : role;
    if (!name || !email || !finalRole || !text) return;
    
    const nameParts = name.trim().split(/\s+/);
    let generatedInitials = "";
    if (nameParts.length > 1) {
      generatedInitials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
      generatedInitials = name.substring(0, 2).toUpperCase();
    }
    
    const reviewData = {
      name,
      email,
      role: finalRole,
      initials: generatedInitials,
      rating,
      review_text: text,
      approved: false,
    };

    const { error } = await supabase
      .from("reviews")
      .insert([reviewData]);

    if (error) {
      console.error(error);
      alert("Failed to submit review: " + error.message);
      return;
    }

    // Call the callback if provided
    if (onAddReview) {
      onAddReview({
        name,
        email,
        role: finalRole,
        initials: generatedInitials,
        rating,
        text,
      });
    }

    alert("Review submitted successfully");
    setName("");
    setEmail("");
    setRole("");
    setOtherRole("");
    setRating(5);
    setText("");
  };

  return (
    <form className="mb-4 sm:mb-8 w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <h3 className="mb-4 text-xl font-semibold text-white">Add Your Review</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="Owner">Owner</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="CTO">CTO</option>
          <option value="CEO">CEO</option>
          <option value="Other">Other</option>
        </select>
        {role === "Other" && (
          <input
            type="text"
            placeholder="Specify your role"
            value={otherRole}
            onChange={(e) => setOtherRole(e.target.value)}
            className="rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            required
          />
        )}
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Your testimonial..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-4 w-full rounded border border-gray-600 bg-brand-surface px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        rows={4}
        required
      />
      <button
        type="submit"
        className="mt-4 rounded bg-brand-cyan px-5 py-2 font-semibold text-black transition hover:bg-brand-cyan/80"
      >
        Submit Review
      </button>
    </form>
  );
}
