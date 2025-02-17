import { notFound } from "next/navigation";
import ProductImage from "@/ui/product/product-image";
import ProductDetails from "@/ui/product/product-details";
import { fetchProductById } from "@/lib/actions";
import { montserrat } from "@/ui/fonts";

// Define the params type
interface ProductPageParams {
  id: string;
}

// Define the props type for the page
interface ProductDetailPageProps {
  params: Promise<ProductPageParams>; // params is now a Promise
}

// Main component
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params; // Await the resolution of params

  // Fetch product details by id
  let product;
  try {
    product = await fetchProductById(id);
    if (!product) {
      return notFound(); // If product is not found, show 404
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound(); // In case of error, show 404
  }

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 px-4">
      <div className="w-full md:w-1/2 mt-4">
        <ProductImage imageUrl={product.imageSRC || "/placeholder.jpg"} />
      </div>

      <div className="w-full md:w-1/2">
        <ProductDetails
          product={{
            name: product.productName,
            price: Number(product.price),
            description: product.productDesc,
          }}
        />

        <div className="mt-4">
          <p className={`${montserrat.className} text-lg font-semibold`}>
            Average Rating: {"No ratings yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
