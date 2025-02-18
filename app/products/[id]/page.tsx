import { notFound } from "next/navigation";
import {
  fetchProductById,
  fetchReviewsByProductId,
  calculateAverageRating,
  fetchAllProducts,
} from "@/lib/data";
import ProductClient from "@/ui/products/product-client";
import ProductImage from "@/ui/products/product-image";
import AddReviewForm from "@/ui/products/add-review-form";
import { ProductsTable, Review } from "@/lib/definitions";

// ✅ Define the correct params type
interface ProductPageParams {
  id: string;
}

// ✅ Fix TypeScript error with params
interface ProductDetailPageProps {
  params: Promise<ProductPageParams>; // params is now a Promise
}

// ✅ Ensure Next.js builds static paths correctly
export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((product) => ({
    id: product.product_id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params; // ✅ Await params

  // Fetch product, reviews, and rating
  let product, reviews, averageRating;
  try {
    [product, reviews, averageRating] = await Promise.all([
      fetchProductById(id),
      fetchReviewsByProductId(id),
      calculateAverageRating(id),
    ]);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col px-4 space-y-8">
      {/* Product Image & Reviews */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <ProductImage imageUrl={product.imageSRC || "/no-image.png"} />

          {/* Reviews Section Below Image */}
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
                    <span
                      key={i}
                      className={i < (averageRating ?? 0) ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="ml-2 text-gray-600">({reviews.length} reviews)</p>
              </div>
            </div>

            {/* Customer Reviews & Write a Review */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Customer Reviews */}
              <div className="w-full md:w-1/2 p-4 border rounded-md shadow-md bg-white">
                <h3 className="text-lg font-bold">Customer Reviews</h3>

                {reviews.length > 0 ? (
                  <div className="space-y-4 mt-4">
                    {reviews.map((review, index) => (
                      <div
                        key={`${review.date}-${review.account_id ?? index}`}
                        className="border p-4 rounded shadow-sm"
                      >
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < review.stars ? "text-yellow-500" : "text-gray-300"}
                            >
                              ★
                            </span>
                          ))}
                          <p className="ml-2 text-sm text-gray-600">
                            {review.stars} / 5
                          </p>
                        </div>
                        <p className="italic mt-1">{review.review}</p>
                        <p className="text-gray-500 text-sm">
                          Posted on {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">
                    No reviews yet. Be the first to leave one!
                  </p>
                )}
              </div>

              {/* Write a Review */}
              <div className="w-full md:w-1/2">
                <AddReviewForm productId={id} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Add to Cart */}
        <ProductClient product={product} />
      </div>
    </div>
  );
}
