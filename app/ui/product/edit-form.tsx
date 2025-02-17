"use client";

import { editListing } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface EditListingFormProps {
  product: {
    product_id: string;
    productName: string;
    productDesc: string;
    category: string;
    color: string;
    price: number;
    imageSRC: string;
  };
  acct_id: string;
}

export default function EditListingForm({ product, acct_id }: EditListingFormProps) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("account_id", acct_id);
    formData.append("product_id", product.product_id);

    await editListing(formData);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="product_id" value={product.product_id} />
      <input type="hidden" name="account_id" value={acct_id} />

      <div>
        <label>Product Name:</label>
        <input type="text" name="productName" defaultValue={product.productName} required />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea name="productDesc" defaultValue={product.productDesc} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" defaultValue={product.category}>
          <option value="Pottery">Pottery</option>
          <option value="Clothing">Clothing</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Stickers">Stickers</option>
          <option value="Woodworking">Woodworking</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" step="0.01" defaultValue={product.price} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="imageSRC" defaultValue={product.imageSRC} required />
      </div>
      <button type="submit" className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
        Save Changes
      </button>
    </form>
  );
}
