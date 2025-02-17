import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ prod_id?: string }> }
) {
  // Await the params
  const { prod_id } = await context.params;

  if (!prod_id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    // Make sure the product exists before deleting
    const existingProduct =
      await sql`SELECT * FROM products WHERE product_id = ${prod_id}`;

    if (!existingProduct || existingProduct.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product from the database
    await sql`DELETE FROM products WHERE product_id = ${prod_id}`;

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
