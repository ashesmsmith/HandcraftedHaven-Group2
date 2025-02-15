import { notFound } from "next/navigation";
import { fetchProductById, fetchReviewsByProductId, calculateAverageRating } from "@/app/lib/data"; 
import ProductImage from "@/app/ui/product/product-image";
import ProductDetails from "@/app/ui/product/product-details";
import { montserrat } from "@/app/ui/fonts";
import type { ProductsTable, Review } from "@/app/lib/definitions";
import AddReviewForm from "@/app/ui/product/add-review-form";
import { Suspense } from "react";

interface ProductDetailPageProps {
  params?: { id?: string }; // Ensure params is optional to prevent undefined issues
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  if (!params?.id) {
    return notFound(); // 🛠 Prevent errors when params is missing
  }

  const id = decodeURIComponent(params.id); // ✅ Ensure ID is properly formatted
  console.log("🛠 Fetching product with ID:", id);

  // ✅ Ensure `id` is fully resolved before calling the database
  const productPromise = fetchProductById(id);
  const reviewsPromise = fetchReviewsByProductId(id);
  const averageRatingPromise = calculateAverageRating(id);

  // ✅ Wait for all database queries to resolve
  const [product, reviews, averageRating] = await Promise.all([
    productPromise,
    reviewsPromise,
    averageRatingPromise,
  ]);

  if (!product) {
    return notFound(); // 🛠 If product is not found, return 404
  }

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

        {/* ⭐ Display Average Rating */}
        <div className="mt-4">
          <p className={`${montserrat.className} text-lg font-semibold`}>
            Average Rating: {averageRating !== null ? averageRating.toFixed(1) : "No ratings yet"}
          </p>
        </div>

        {/* Display Reviews */}
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
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* ✅ Wrap `AddReviewForm` in `Suspense` to prevent UI flickering */}
        <Suspense fallback={<p>Loading review form...</p>}>
          <AddReviewForm productId={id} initialReviews={reviews} />
        </Suspense>
      </div>
    </div>
  );
}
