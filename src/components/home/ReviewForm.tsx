import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import { getUserErrorMessage } from "../../lib/errors";
import { isValidEmail, trimToLength } from "../../lib/validation";

interface ReviewFormProps {
  onSubmitted?: () => void;
}

export function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const finalRole = trimToLength(role === "Other" ? otherRole : role, 40);
    const trimmedName = trimToLength(name, 80);
    const trimmedEmail = trimToLength(email, 120);
    const trimmedText = trimToLength(text, 1000);

    if (website.trim()) {
      setSuccess(true);
      return;
    }

    if (trimmedName.length < 2 || !isValidEmail(trimmedEmail) || !finalRole || trimmedText.length < 8) {
      setError("Please complete all fields with a valid email and a review of at least 8 characters.");
      return;
    }

    const nameParts = trimmedName.split(/\s+/);
    const generatedInitials =
      nameParts.length > 1
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : trimmedName.substring(0, 2).toUpperCase();

    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("reviews").insert([
      {
        name: trimmedName,
        email: trimmedEmail,
        role: finalRole,
        initials: generatedInitials,
        rating,
        review_text: trimmedText,
        approved: false,
      },
    ]);

    setSubmitting(false);

    if (insertError) {
      setError(getUserErrorMessage(insertError, "Unable to submit your review. Please try again."));
      return;
    }

    setSuccess(true);
    setName("");
    setEmail("");
    setRole("");
    setOtherRole("");
    setRating(5);
    setText("");
    onSubmitted?.();
  };

  if (success) {
    return (
      <div className="mb-4 w-full max-w-2xl rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300" role="status">
        Thank you. Your review was submitted and will appear publicly after it is approved.
      </div>
    );
  }

  return (
    <form className="mx-auto mb-4 w-full max-w-2xl sm:mb-8" onSubmit={handleSubmit} noValidate>
      <h3 className="mb-4 text-xl font-semibold text-white">Add Your Review</h3>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-gray-300">
          Your name
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-600 bg-brand-surface px-4 py-2.5 min-h-[48px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            required
            maxLength={80}
          />
        </label>
        <label className="grid gap-1 text-sm text-gray-300">
          Your email
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-600 bg-brand-surface px-4 py-2.5 min-h-[48px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            required
            maxLength={120}
          />
        </label>
        <label className="grid gap-1 text-sm text-gray-300">
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded border border-gray-600 bg-brand-surface px-4 py-2.5 min-h-[48px] text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
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
        </label>
        {role === "Other" && (
          <label className="grid gap-1 text-sm text-gray-300">
            Specify your role
            <input
              type="text"
              placeholder="Specify your role"
              value={otherRole}
              onChange={(e) => setOtherRole(e.target.value)}
              className="w-full rounded border border-gray-600 bg-brand-surface px-4 py-2.5 min-h-[48px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              required
              maxLength={40}
            />
          </label>
        )}
        <label className="grid gap-1 text-sm text-gray-300">
          Rating
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded border border-gray-600 bg-brand-surface px-4 py-2.5 min-h-[48px] text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 grid gap-1 text-sm text-gray-300">
        Your testimonial
        <textarea
          placeholder="Your testimonial..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] w-full rounded border border-gray-600 bg-brand-surface px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          rows={4}
          required
          maxLength={1000}
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 min-h-[48px] rounded bg-brand-cyan px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-cyan/80 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
