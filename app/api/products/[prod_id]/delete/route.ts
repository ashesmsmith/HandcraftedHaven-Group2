import { NextResponse } from "next/server";
import { deleteListing } from "@/lib/actions";

export async function DELETE(
  request: Request,
  context: { params: { prod_id?: string } }
) {
  try {
    if (!context.params || !context.params.prod_id) {
      return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
    }

    const { prod_id } = context.params;

    // Extract account ID from request body
    const body = await request.json();
    const { acct_id } = body;

    if (!acct_id) {
      return NextResponse.json({ error: "Account ID is missing" }, { status: 400 });
    }

    console.log(`🗑️ Deleting product with ID: ${prod_id} for account ID: ${acct_id}`);

    // Call delete function from actions.ts
    const result = await deleteListing(prod_id, acct_id);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
