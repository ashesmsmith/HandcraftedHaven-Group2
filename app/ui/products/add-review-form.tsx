"use client";

import { useState } from "react";
import { addReview } from "@/lib/reviewAction";
import type { Review } from "@/lib/definitions";

export default function AddReviewForm({ productId, onReviewAdded }: { productId: string; onReviewAdded: (newReview: Review) => void }) {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!reviewText.trim()) {
      setErrorMessage("Review text cannot be empty.");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("stars", rating.toString());
      formData.append("review", reviewText.trim());

      console.log("Submitting review:", { productId, rating, reviewText });

      const response = await addReview({}, formData);

      console.log("API Response:", response);

      if (response?.success && response.review) {
        setSuccessMessage("Review submitted successfully!");
        setErrorMessage(null);
        setReviewText("");
        setRating(5);

        // Immediately update UI with the new review
        onReviewAdded(response.review);
      } else {
        console.error("Review submission failed:", response);
        setSuccessMessage(null);
        setErrorMessage(response?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setSuccessMessage(null);
      setErrorMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-lg font-bold">Write a Review</h3>

      {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium">Rating:</label>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`} onClick={() => setRating(i + 1)}>
              ★
            </span>
          ))}
        </div>

        <label className="block text-sm font-medium">Your Review:</label>
        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full p-2 border rounded" placeholder="Write your review here..." rows={3} />

        <button type="submit" disabled={submitting} className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#8A5D3D] transition w-full">
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
