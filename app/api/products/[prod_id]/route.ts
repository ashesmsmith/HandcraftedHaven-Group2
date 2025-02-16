import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: Request,
  { params }: { params: { prod_id?: string } }
) {
  if (!params.prod_id) {
    console.error("🚨 Missing product ID in API request");
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    console.log("🔍 Fetching product with id:", params.prod_id);
    const result = await sql`
      SELECT product_id, "productName", "productDesc", category, color, price::numeric, "imageSRC", account_id
      FROM products
      WHERE product_id = ${params.prod_id}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      console.error(`🚨 Product not found: ${params.prod_id}`);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = result.rows[0];
    product.price = Number(product.price); // Ensure price is a number

    console.log("✅ Product fetched:", product);
    return NextResponse.json({ product });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
