import { notFound } from "next/navigation";
import { fetchProductById, fetchReviewsByProductId, calculateAverageRating, fetchAllProducts } from "@/lib/data";
import ProductImage from "@/ui/product/product-image";
import ProductDetails from "@/ui/product/product-details";
import { montserrat } from "@/ui/fonts";
import AddReviewForm from "@/ui/product/add-review-form";


// tells Next.js to generate static paths for dynamic routes
export async function generateStaticParams() { 
  const products = await fetchAllProducts(); //fetch all but retrieve only product_id
  return products.map((product: { product_id: string }) => ({ product_id: product.product_id })); // Map the products into the next.js format
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await `params` before using it
  const { id } = await params;

  if (!id) {
    return notFound();
  }


  try {
    const [product, reviews, averageRating] = await Promise.all([
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
              price: product.price,
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
    console.error(" Error fetching product data:", error);
    return notFound();
  }
}
