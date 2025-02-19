"use client";

import { useState, useEffect } from "react";
import { fetchReviewsByProductId, calculateAverageRating } from "@/lib/data";
import AddReviewForm from "@/ui/products/add-review-form";
import { Review } from "@/lib/definitions";

export default function ReviewsWrapper({
  productId,
  initialReviews,
  initialAverageRating,
}: {
  productId: string;
  initialReviews: Review[];
  initialAverageRating: number | null;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [averageRating, setAverageRating] = useState<number | null>(initialAverageRating);
  const [isFetching, setIsFetching] = useState(false);

  // Function to refresh reviews and ensure the state updates correctly
  const refreshReviews = async () => {
    console.log("🔄 Fetching latest reviews...");
    setIsFetching(true);
    try {
      const updatedReviews = await fetchReviewsByProductId(productId);
      const updatedRating = await calculateAverageRating(productId);

      // Ensure the new reviews are properly set
      setReviews([...updatedReviews]);
      setAverageRating(updatedRating);
    } catch (error) {
      console.error("Error fetching updated reviews:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Function to handle newly submitted review
  const handleReviewAdded = async (newReview: Review) => {
    console.log("✨ Adding new review to UI...");

    // Optimistically add new review to UI first
    setReviews((prevReviews) => [newReview, ...prevReviews]);

    // Refresh the latest reviews
    await refreshReviews();
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Average Rating */}
      <div className="border rounded-md p-4 shadow-md bg-white">
        <h3 className="text-lg font-bold">Average Rating</h3>
        <div className="flex items-center mt-2">
          <span className="text-xl font-semibold">
            {averageRating !== null ? averageRating.toFixed(1) : "No ratings yet"}
          </span>
          <div className="ml-2 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (averageRating ?? 0) ? "text-yellow-500" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <p className="ml-2 text-gray-600">({reviews.length} reviews)</p>
        </div>
      </div>

      {/* Customer Reviews & Review Form */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Customer Reviews */}
        <div className="w-full md:w-1/2 p-4 border rounded-md shadow-md bg-white">
          <h3 className="text-lg font-bold">Customer Reviews</h3>

          {isFetching ? (
            <p className="text-gray-500 mt-2">Updating reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="space-y-4 mt-4">
              {reviews.map((review, index) => (
                <div key={`${review.date}-${index}`} className="border p-4 rounded shadow-sm">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.stars ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <p className="ml-2 text-sm text-gray-600">{review.stars} / 5</p>
                  </div>
                  <p className="italic mt-1">{review.review}</p>
                  <p className="text-gray-500 text-sm">Posted on {new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Write a Review Form */}
        <div className="w-full md:w-1/2">
          <AddReviewForm productId={productId} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
}
