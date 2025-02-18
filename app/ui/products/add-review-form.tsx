"use client";

import { useState } from "react";
import { addReview } from "@/lib/reviewAction";
import type { Review } from "@/lib/definitions";

export default function AddReviewForm({ 
    productId, 
    initialReviews 
}: { 
    productId: string; 
    initialReviews: Review[]; 
}) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [rating, setRating] = useState<number>(5);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorMessage(null);

        // Create a FormData object
        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("stars", rating.toString());
        formData.append("review", reviewText.trim());

        try {
            const response = await addReview(null, formData); //  Correct Server Action call
            console.log(" Response from addReview:", response);

            if (response.success && response.review !== undefined) {
                setReviews((prevReviews) => [...prevReviews, response.review as Review]); // ✅ Fixes TypeScript error
                setReviewText(""); // Reset form
                setRating(5);
            } else if (response.errors) {
                setErrorMessage(" " + Object.values(response.errors).flat().join(", "));
            } else {
                setErrorMessage(" Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(" Error while submitting review:", error);
            setErrorMessage("Failed to submit review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-6 p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">Write a Review</h3>

            {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium">Rating:</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-2"
                >
                    {[5, 4, 3, 2, 1].map((star) => (
                        <option key={star} value={star}>
                            {star} Stars
                        </option>
                    ))}
                </select>

                <label className="block text-sm font-medium">Your Review:</label>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Write your review here..."
                    rows={3}
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#8A5D3D]"
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>

            {/* Display Submitted Reviews Below */}
            <h3 className="text-lg font-bold mt-6">Reviews</h3>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
                <ul className="mt-2">
                    {reviews.map((r, index) => (
                        <li key={index} className="border p-2 rounded my-2">
                            <p className="font-semibold">{r.stars} ⭐</p>
                            <p>{r.review}</p>
                            <p className="text-sm text-gray-500">Reviewed on {new Date(r.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}