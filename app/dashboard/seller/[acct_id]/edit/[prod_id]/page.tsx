// dashboard/seller/[acct_id]/edit/[prod_id]/page.tsx
// Edit Product Page - Only available to seller that owns the product
// Seller must be signed in

import EditListingForm from '@/app/ui/product/edit-form';
import { fetchProductById } from '@/app/lib/data';


export default async function EditListingPage(props: { params: Promise<{ acct_id: string, prod_id: string }> }) {
    const params = await props.params;
    const acct_id = params.acct_id;
    const prod_id = params.prod_id;

    const product = await fetchProductById(prod_id);

  return (
    <main>
      <EditListingForm product={product} prod_id={prod_id} acct_id={acct_id}/>
    </main>
  )
}
