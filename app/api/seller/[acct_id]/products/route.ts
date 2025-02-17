import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ acct_id?: string }> }
) {
  const { acct_id } = await context.params; 

  if (!acct_id) {
    return NextResponse.json(
      { error: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    const products = await sql`SELECT * FROM products WHERE account_id = ${acct_id}`;
    
    if (!products || products.rows.length === 0) {
      return NextResponse.json(
        { error: "No products found for this seller" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products: products.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
