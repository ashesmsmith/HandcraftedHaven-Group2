import { sql } from "@vercel/postgres";
import ProductCatalogClient from "@/ui/products/product-catalog";
import { ProductsTable } from "@/lib/definitions";

// Define a type for products with the seller's business name
type ProductWithSeller = ProductsTable & { businessName: string | null };

export default async function ProductCatalogPage({
  searchParams: rawSearchParams,
}: {
  searchParams?: Promise<Record<string, string>>; // ✅ Awaitable Promise
}) {
  // ✅ Await searchParams before accessing properties
  const searchParams = rawSearchParams ? await rawSearchParams : {};

  // Extract `seller` filter
  const sellerFilter = searchParams.seller || null;

  // ✅ Fetch unique seller names, filtering out `null` values
  const sellerQuery = await sql<{ businessName: string | null }>`
    SELECT DISTINCT a."businessName"
    FROM accounts a
    WHERE a."account_type" = 'Seller'
    AND a."businessName" IS NOT NULL;
  `;

  const sellers: string[] = sellerQuery.rows.map((row) => row.businessName!).filter(Boolean);

  // ✅ Fetch products (conditionally filter by seller)
  const productsQuery = sellerFilter
    ? await sql<ProductWithSeller>`
      SELECT 
        p.product_id, 
        p.account_id, 
        p."productName", 
        p."productDesc", 
        p.category, 
        p.color, 
        p.price, 
        p."imageSRC",
        a."businessName"
      FROM products p
      LEFT JOIN accounts a ON p.account_id = a.account_id
      WHERE a."account_type" = 'Seller' 
      AND a."businessName" = ${sellerFilter};`
    : await sql<ProductWithSeller>`
      SELECT 
        p.product_id, 
        p.account_id, 
        p."productName", 
        p."productDesc", 
        p.category, 
        p.color, 
        p.price, 
        p."imageSRC",
        a."businessName"
      FROM products p
      LEFT JOIN accounts a ON p.account_id = a.account_id
      WHERE a."account_type" = 'Seller';
    `;

  return (
    <section className="container mx-auto p-6 flex">
      <ProductCatalogClient products={productsQuery.rows} sellers={sellers} searchParams={searchParams} />
    </section>
  );
}
