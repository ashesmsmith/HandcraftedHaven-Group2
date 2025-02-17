// app/api/products/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    console.log("Fetching products from the database...");
    // Adjusted query without seller_id
    const data = await sql`
      SELECT product_id, "productName", "productDesc", price, "imageSRC", category
      FROM products
    `;
    console.log("Products fetched:", data.rows);
    return NextResponse.json({ products: data.rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
