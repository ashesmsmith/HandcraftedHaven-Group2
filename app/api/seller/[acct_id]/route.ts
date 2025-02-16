import { NextResponse } from "next/server";
import { fetchSellerAccountById } from "@/lib/data"; // Ensure this file exists at app/lib/data.ts

export async function GET(
  request: Request,
  { params }: { params: { acct_id: string } }
) {
  try {
    if (!params.acct_id) {
      return NextResponse.json({ error: "Seller ID is required" }, { status: 400 });
    }

    // fetchSellerAccountById returns an array of rows
    const sellers = await fetchSellerAccountById(params.acct_id);
    const seller = Array.isArray(sellers) ? sellers[0] : sellers;

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error: unknown) {
    console.error("Error fetching seller:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch seller" }, { status: 500 });
  }
}
