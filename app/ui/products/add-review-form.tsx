"use client";

import { useState, useEffect } from "react";
import { fetchReviewsByProductId, addReview } from "@/lib/reviewAction"; // ✅ Correct import
import type { Review } from "@/lib/definitions";

export default function AddReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // ✅ Fetch latest reviews when component loads
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const latestReviews = await fetchReviewsByProductId(productId);
        setReviews(latestReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    loadReviews();
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    if (!reviewText.trim()) {
      setErrorMessage("Review text cannot be empty.");
      setSubmitting(false);
      return;
    }

    try {
      // ✅ Call `addReview` with the correct number of arguments
      const response = await addReview(productId, rating, reviewText.trim());

      if (response.success) {
        // ✅ Re-fetch latest reviews after submission
        const updatedReviews = await fetchReviewsByProductId(productId);
        setReviews(updatedReviews);

        setReviewText("");
        setRating(5);
      } else {
        setErrorMessage(response.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error while submitting review:", error);
      setErrorMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-lg font-bold">Write a Review</h3>

      {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating Selector */}
        <label className="block text-sm font-medium">Rating:</label>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text */}
        <label className="block text-sm font-medium">Your Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your review here..."
          rows={3}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#8A5D3D] transition w-full"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* ✅ Display Reviews (Auto-refreshes) */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <ul className="mt-2">
            {reviews.map((review, index) => (
              <li key={`${review.date}-${review.account_id ?? index}`} className="border p-2 rounded my-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.stars ? "text-yellow-500" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                  <p className="ml-2 text-sm text-gray-600">{review.stars} / 5</p>
                </div>
                <p>{review.review}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on {new Date(review.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
