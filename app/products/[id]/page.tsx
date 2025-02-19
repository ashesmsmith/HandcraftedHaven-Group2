import { notFound } from "next/navigation";
import {
  fetchProductById,
  fetchReviewsByProductId,
  calculateAverageRating,
  fetchAllProducts,
} from "@/lib/data";
import ProductClient from "@/ui/products/product-client";
import ProductImage from "@/ui/products/product-image";
import ReviewsWrapper from "@/ui/products/reviews-wrapper";


interface ProductDetailPageProps {
  params: Promise<{ id: string }>; 
}

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((product) => ({
    id: product.product_id.toString(),
  }));
}

// Page Component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params; 
  const { id } = resolvedParams;

  // Fetch product data
  let product, reviews, averageRating;
  try {
    [product, reviews, averageRating] = await Promise.all([
      fetchProductById(id),
      fetchReviewsByProductId(id),
      calculateAverageRating(id),
    ]);
  } catch (error) {
    console.error(" Failed to fetch product:", error);
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col px-4 space-y-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <ProductImage imageUrl={product.imageSRC || "/no-image.png"} />

          {/* Pass reviews & rating to the client-side wrapper */}
          <ReviewsWrapper productId={id} initialReviews={reviews} initialAverageRating={averageRating} />
        </div>

        <ProductClient product={product} />
      </div>
    </div>
  );
}
