import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchSellerAccountById } from "@/app/lib/data"; // or your actual path


type SellerRouteContext = {
  params: Promise<{ acct_id: string }>;
};

export async function GET(
  _req: NextRequest,
  { params }: SellerRouteContext
) {
  const { acct_id } = await params;

  try {
    // If fetchSellerAccountById returns an array or null
    const sellerData = await fetchSellerAccountById(acct_id);
    if (!sellerData || sellerData.length === 0) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    // Return the first row
    return NextResponse.json(sellerData[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/seller/[acct_id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
