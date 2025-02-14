import { NextResponse } from 'next/server';
import { fetchSellerAccountById } from '@/app/lib/data'; // Adjust path if needed

export async function GET(_req: Request, { params }: { params: { acct_id: string } }) {
  try {
    const sellerData = await fetchSellerAccountById(params.acct_id);
    if (!sellerData || sellerData.length === 0) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }
    // If fetchSellerAccountById returns an array, pick sellerData[0], else return the object
    return NextResponse.json(sellerData[0], { status: 200 });
  } catch (error) {
    console.error('GET /api/seller/[acct_id] error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
