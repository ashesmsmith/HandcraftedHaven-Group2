"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import {
  fetchProductById,
  fetchReviewsByProductID,
  calculateAverageRating,
} from "@/app/lib/placeholder-data";
import ProductImage from "@/app/ui/product/product-image";
import ProductDetails from "@/app/ui/product/product-details";
import { montserrat } from "@/app/ui/fonts";
import type { Product, Review } from "@/app/lib/placeholder-data";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedProduct = await fetchProductById(params.id);
      const fetchedReviews = await fetchReviewsByProductID(params.id);
      const fetchedAverageRating = await calculateAverageRating(params.id);

      if (!fetchedProduct) {
        notFound();
      }

      setProduct(fetchedProduct);
      setReviews(fetchedReviews);
      setAverageRating(fetchedAverageRating);
    }

    fetchData();
  }, [params.id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 px-4">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 mt-4">
        <ProductImage imageUrl={product.imageSRC || "/placeholder.jpg"} />
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2">
        <ProductDetails
          product={{
            name: product.productName,
            price: product.price,
            description: product.productDesc,
          }}
        />

        {/* Average Rating */}
        <div className="mt-4">
          <p className={`${montserrat.className} text-lg font-semibold`}>
            Average Rating: {averageRating !== null ? averageRating.toFixed(1) : "No ratings yet"}
          </p>
        </div>

        {/* Customer Reviews */}
        <div>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={`${review.product_id}-${review.account_id}`} className="border rounded-md p-4">
                  <p className={`${montserrat.className} text-sm font-semibold`}>
                    Customer ID: {review.account_id}
                  </p>
                  <p className={`${montserrat.className} text-sm`}>
                    Rating: {review.stars} / 5
                  </p>
                  <p className={`${montserrat.className} text-sm text-gray-600`}>
                    {review.review}
                  </p>
                  <p className={`${montserrat.className} text-xs text-gray-400`}>
                    {review.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* Add Review Form */}
        <AddReviewForm productId={params.id} setReviews={setReviews} />
      </div>
    </div>
  );
}

function AddReviewForm({ 
  productId, 
  setReviews 
}: { 
  productId: string; 
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>; 
}) {
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    // Create new review object
    const newReview: Review = {
      product_id: productId,
      account_id: "guest", // Fake user ID for now
      stars: rating,
      review: reviewText,
      date: new Date().toISOString().split("T")[0], // Format date
    };

    // Simulate sending to backend (update local state)
    setReviews((prevReviews) => [...prevReviews, newReview]);

    // Reset form
    setReviewText("");
    setRating(5);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">Write a Review</h3>

      {/* Star Rating */}
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

      {/* Review Text */}
      <label className="block text-sm font-medium">Your Review:</label>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Write your review here..."
        rows={3}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#8A5D3D] focus:outline-none focus:ring-2 focus:ring-[#543A27] focus:ring-offset-2"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

