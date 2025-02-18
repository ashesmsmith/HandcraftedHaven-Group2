import { sql } from "@vercel/postgres";
import ProductCatalogClient from "@/ui/product/product-catalog";
import { ProductsTable } from "@/lib/definitions";

// Define a type for products with the seller's business name
type ProductWithSeller = ProductsTable & { businessName: string | null, price: number };


export default async function ProductCatalogPage(props: { searchParams?: Record<string, string> }) {
  // Ensure searchParams is awaited before use
  const searchParams = await Promise.resolve(props.searchParams || {});

  // Fetch products from the database & enforce correct type
  const { rows: products } = await sql<ProductWithSeller>`
  SELECT p.product_id, p.account_id, p."productName", p."productDesc", 
         p.category, p.color, p.price::float AS price, p."imageSRC", -- Use ::float to cast directly to number
         a."businessName"
  FROM products p
  LEFT JOIN accounts a ON p.account_id = a.account_id
  WHERE a."account_type" = 'Seller';
`;





  return <ProductCatalogClient products={products} searchParams={searchParams} />;
}
  
