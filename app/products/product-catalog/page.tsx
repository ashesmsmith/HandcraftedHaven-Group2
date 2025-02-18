import { sql } from "@vercel/postgres";
import ProductCatalogClient from "@/ui/products/product-catalog";
import { ProductsTable } from "@/lib/definitions";

// Define a type for products with the seller's business name and price as a number
type ProductWithSeller = ProductsTable & { businessName: string | null; price: number };

export default async function ProductCatalogPage(props: { searchParams?: Record<string, string> }) {
  //Ensure searchParams is properly handled
  const searchParams = props.searchParams || {};

  //Fetch products from the database & enforce correct type
  const { rows: products } = await sql<ProductWithSeller>`
    SELECT p.product_id, p.account_id, p."productName", p."productDesc", 
           p.category, p.color, p.price::float AS price, p."imageSRC",
           COALESCE(a."businessName", 'Unknown Seller') AS businessName  -- Ensure always a string
    FROM products p
    LEFT JOIN accounts a ON p.account_id = a.account_id
    WHERE a."account_type" = 'Seller';  -- Only get sellers' products
  `;

  return <ProductCatalogClient products={products} searchParams={searchParams} />;
}
