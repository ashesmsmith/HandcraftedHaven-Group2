import { notFound } from "next/navigation";
import { fetchProductById, fetchReviewsByProductId, calculateAverageRating, fetchAllProducts } from "@/lib/data";
import ProductImage from "@/ui/products/product-image";
import ProductDetails from "@/ui/products/product-details";
import { montserrat } from "@/ui/fonts";
import AddReviewForm from "@/ui/products/add-review-form";
import { ProductsTable, Review } from "@/lib/definitions";

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((product) => ({ id: product.product_id }));
}

// Define explicit types for fetched data
interface ProductDetailPageProps {
  params: { id: string }; // ✅ Ensuring `params` is not a Promise, just an object
}

// Main product page
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  try {
    // Fetch product data, reviews, and average rating in parallel
    const [product, reviews, averageRating]: [ProductsTable | null, Review[], number | null] = await Promise.all([
      fetchProductById(id),
      fetchReviewsByProductId(id),
      calculateAverageRating(id),
    ]);

    if (!product) {
      return notFound();
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
              price: Number(product.price).toFixed(2),
              description: product.productDesc,
            }}
          />

          {/* Display Average Rating */}
          <div className="mt-4">
            <p className={`${montserrat.className} text-lg font-semibold`}>
              Average Rating: {averageRating !== null ? averageRating.toFixed(1) : "No ratings yet"}
            </p>
          </div>

          {/* Add Review Form */}
          <AddReviewForm productId={id} initialReviews={reviews} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return notFound();
  }
}
