import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { prod_id: string } }) {
  const { prod_id } = params;
  
  // Your logic to handle deletion

  return NextResponse.json({ message: `Product ${prod_id} deleted` });
}
