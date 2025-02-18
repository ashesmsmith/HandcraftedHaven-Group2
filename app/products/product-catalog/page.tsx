import { sql } from "@vercel/postgres";
import ProductCatalogClient from "@/ui/products/product-catalog";
import { ProductsTable } from "@/lib/definitions";

// Define a type for products with the seller's business name
type ProductWithSeller = ProductsTable & { businessName: string | null };

export default async function ProductCatalogPage({
  searchParams: rawSearchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  // Await `searchParams` before accessing its properties
  const searchParams = rawSearchParams ? await rawSearchParams : {};

  // Fetch products from the database & enforce correct type
  const { rows: products } = await sql<ProductWithSeller>`
    SELECT 
      p.product_id, 
      p.account_id, 
      p."productName", 
      p."productDesc", 
      p.category, 
      p.color, 
      p.price, 
      p."imageSRC",
      COALESCE(a."businessName", 'Unknown Seller') AS businessName 
    FROM products p
    LEFT JOIN accounts a ON p.account_id = a.account_id
    WHERE a."account_type" = 'Seller';
  `;

  return <ProductCatalogClient products={products} searchParams={searchParams} />;
}
  
