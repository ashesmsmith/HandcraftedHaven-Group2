// app/products/[id]/page.tsx

import { notFound } from "next/navigation";
import {
  fetchProductById,
  fetchReviewsByProductId,
  calculateAverageRating,
} from "@/app/lib/products";
import ProductImage from "@/app/ui/product/product-image";
import ProductDetails from "@/app/ui/product/product-details";
import { cormorant, montserrat } from "@/app/ui/fonts";

/**
 * Remove references to a custom 'PageProps' interface.
 * Just inline the param typing for 'params' like this:
 */
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound(); // Render 404 page if the product doesn't exist
  }

  // Fetch reviews and calculate the average rating
  const reviews = await fetchReviewsByProductId(params.id);
  const averageRating = await calculateAverageRating(params.id);

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
            Average Rating:{" "}
            {averageRating > 0 ? averageRating.toFixed(1) : "No ratings yet"}
          </p>
        </div>

        {/* Customer Reviews */}
        <div className="mt-6">
          <h2 className={`${cormorant.className} text-xl font-bold mb-2`}>
            Customer Reviews
          </h2>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.review_id} className="border rounded-md p-4">
                  <p
                    className={`${montserrat.className} text-sm font-semibold`}
                  >
                    Customer ID: {review.customer_id}
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
            <p className={`${montserrat.className} text-gray-600`}>
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
