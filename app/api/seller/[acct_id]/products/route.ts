import { NextResponse } from "next/server";
import { fetchProductsBySeller } from "@/lib/products"; // This function uses the Vercel Postgres client

export async function GET(
  request: Request,
  { params }: { params: { acct_id: string } }
) {
  try {
    // This runs on the server and can access POSTGRES_URL
    const products = await fetchProductsBySeller(params.acct_id);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
