// dashboard/seller/[acct_id]/add-listing/page.tsx
// Add Product Page - Only available to seller
// Seller must be signed in

import AddListingForm from '@/app/ui/product/add-form';

export default function AddListingPage() {
  return (
    <main>
      <AddListingForm />
    </main>
  );
}
  