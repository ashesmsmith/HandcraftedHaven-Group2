// app/products/[id]/page.tsx

import { notFound } from "next/navigation";
import ProductImage from "@/app/ui/product/product-image";
import ProductDetails from "@/app/ui/product/product-details";
import { cormorant, montserrat } from "@/app/ui/fonts";

export const dynamic = "force-dynamic";

// Embed the placeholder products + reviews
const products = [
  {
    product_id: "b481438a-7dba-4aaa-8bd5-bccc03d2eb31",
    productName: "Ceramic Flower Vase",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Pottery",
    color: "White",
    price: 30.0,
    imageSRC: "/prod_images/vase.webp",
  },
  {
    product_id: "67657788-d579-43d9-a92e-e8754b02f7e2",
    productName: "Book Nerd T-Shirt",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Clothing",
    color: "Green",
    price: 20.0,
    imageSRC: "/prod_images/book_shirt.webp",
  },
  {
    product_id: "6fe17217-d5ff-40f6-90ae-deb69d778eff",
    productName: "Amethyst Necklace",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Jewelry",
    color: "Purple",
    price: 250.0,
    imageSRC: "/prod_images/necklace.webp",
  },
  {
    product_id: "7940b624-cf63-4a86-bd27-34e72a1cab32",
    productName: "Dragon Sticker",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Stickers",
    color: "Multi",
    price: 5.0,
    imageSRC: "/prod_images/dragon_sticker.webp",
  },
  {
    product_id: "f005a76d-094e-4f88-a498-3b43da59c1b0",
    productName: "Wood Memory Box",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Woodworking",
    color: "Brown",
    price: 75.0,
    imageSRC: "/prod_images/memory_box.webp",
  },
];

// For demonstration, embed the relevant reviews
const reviewsData = [
  {
    product_id: "67657788-d579-43d9-a92e-e8754b02f7e2",
    stars: 5,
    review: "Excellent! Lorem ipsum...",
    date: "2025-01-23",
  },
  {
    product_id: "f005a76d-094e-4f88-a498-3b43da59c1b0",
    stars: 4,
    review: "Wonderful! Lorem ipsum...",
    date: "2025-01-23",
  },
  // ... more if needed
];

function fetchProductById(id: string) {
  return products.find((p) => p.product_id === id);
}

function fetchReviewsByProductId(id: string) {
  return reviewsData.filter((r) => r.product_id === id);
}

function calculateAverageRating(id: string) {
  const relevantReviews = reviewsData.filter((r) => r.product_id === id);
  if (relevantReviews.length === 0) return 0;
  const totalStars = relevantReviews.reduce((sum, r) => sum + r.stars, 0);
  return totalStars / relevantReviews.length;
}

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  // e.g. "67657788-d579-43d9-a92e-e8754b02f7e2"
  const product = fetchProductById(params.id);
  if (!product) {
    notFound(); // 404 if product doesn't exist
  }

  // Fetch the product's reviews & average rating
  const productReviews = fetchReviewsByProductId(params.id);
  const averageRating = calculateAverageRating(params.id);

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 px-4">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2 mt-4">
        <ProductImage imageUrl={product.imageSRC} />
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
          {productReviews.length > 0 ? (
            <ul className="space-y-4">
              {productReviews.map((review, index) => (
                <li key={index} className="border rounded-md p-4">
                  <p className={`${montserrat.className} text-sm font-semibold`}>
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
