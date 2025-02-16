import { notFound } from "next/navigation";
import Link from "next/link";
import ProductImage from "@/ui/product/product-image";
import ProductDetails from "@/ui/product/product-details";
import { fetchProductById } from "@/lib/actions"; // Ensure this function fetches from the DB
import { cormorant, montserrat } from "@/ui/fonts";

// Ensure Next.js doesn't try static typed routes:
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { id?: string } }) {
  if (!params.id) {
    console.error("🚨 Missing product ID in params");
    return notFound();
  }

  console.log("🔍 Fetching product:", params.id);
  
  let product;
  try {
    product = await fetchProductById(params.id);
    if (!product) {
      console.error("🚨 Product not found:", params.id);
      return notFound();
    }
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
    return notFound();
  }

  return (
    <section className="container mx-auto px-6 py-10">
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
              price: Number(product.price), // Ensure price is a number
              description: product.productDesc,
            }}
          />

          {/* Average Rating */}
          <div className="mt-4">
            <p className={`${montserrat.className} text-lg font-semibold`}>
              Average Rating: {"No ratings yet"}
            </p>
          </div>
        </div>
      </div>

      {/* Back to Product Catalog Button */}
      <div className="mt-6 flex justify-center">
        <Link href="/products/product-catalog">
          <button className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Back to Product Catalog
          </button>
        </Link>
      </div>
    </section>
  );
}
