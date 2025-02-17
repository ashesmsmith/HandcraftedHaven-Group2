import { sql } from "@vercel/postgres";
import ProductCatalogClient from "@/app/ui/product/product-catalog";
import { ProductsTable } from "@/app/lib/definitions"; // Import product type

// Define a type for products with the seller's business name
type ProductWithSeller = ProductsTable & { businessName: string | null };

export default async function ProductCatalogPage(props: { searchParams?: Record<string, string> }) {
  // ✅ Ensure searchParams is awaited before use
  const searchParams = await Promise.resolve(props.searchParams || {});

  // 🛒 Fetch products from the database & enforce correct type
  const { rows: products } = await sql<ProductWithSeller>`
  SELECT p.product_id, p.account_id, p."productName", p."productDesc", 
         p.category, p.color, p.price, p."imageSRC",
         a."businessName"
  FROM products p
  LEFT JOIN accounts a ON p.account_id = a.account_id
  WHERE a."account_type" = 'Seller'  -- ✅ Ensure we only get Sellers!
`;


console.log("🔍 Sellers Data:", products.map(p => p.businessName)); // ✅ Debug output




  return <ProductCatalogClient products={products} searchParams={searchParams} />;
}
  