"use client";

import { useState } from "react";
import { addReview } from "@/app/lib/action";
import type { Review } from "@/app/lib/definitions";

export default function AddReviewForm({ 
    productId, 
    initialReviews 
}: { 
    productId: string; 
    initialReviews: Review[]; 
}) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews); // ✅ Ensures reviews is an array
    const [rating, setRating] = useState<number>(5);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
    
        console.log("📝 Submitting review:", { productId, rating, reviewText });
    
        try {
            const newReview = await addReview(productId, rating, reviewText);
    
            if (newReview !== null) { 
                setReviews((prevReviews) => [...prevReviews, newReview]); 
                setReviewText("");
                setRating(5);
                console.log("✅ Review successfully added:", newReview);
            } else {
                console.error("❌ Failed to add review. Review returned null.");
            }
        } catch (error) {
            console.error("❌ Error while submitting review:", error);
        }
    
        setSubmitting(false);
    };
    
    

    return (
        <div className="mt-6 p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">Write a Review</h3>

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
                    className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#8A5D3D] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}
