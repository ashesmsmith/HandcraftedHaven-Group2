// dashboard/seller/[acct_id]/edit/[prod_id]/page.tsx
// Edit Product Page - Only available to seller that owns the product
// Seller must be signed in

import EditListingForm from '@/app/ui/product/edit-form';
//import { fetchProductById } from '@/app/lib/data';


export default function EditListingPage() {

  // We need to access the product data to pass current data into the form 

  return (
    <main>
      <EditListingForm />
    </main>
  )
}
