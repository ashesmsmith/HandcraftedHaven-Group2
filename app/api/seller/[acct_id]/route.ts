import { NextResponse } from "next/server";
import { fetchSellerAccountById } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ acct_id?: string }> }
): Promise<NextResponse> {
  try {
    const resolvedParams = await params; 
    const { acct_id } = resolvedParams;

    console.log("Fetching seller for ID:", acct_id);

    if (!acct_id) {
      return NextResponse.json(
        { error: "Seller ID is required" },
        { status: 400 }
      );
    }

    // Make sure fetchSellerAccountById is correctly typed
    const sellers = await fetchSellerAccountById(acct_id);
    const seller = Array.isArray(sellers) ? sellers[0] : sellers;

    if (!seller) {
      console.error("Seller not found:", acct_id);
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(seller);
  } catch (error: unknown) {
    console.error("Error fetching seller:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch seller" },
      { status: 500 }
    );
  }
}
