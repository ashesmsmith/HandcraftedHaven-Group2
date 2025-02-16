"use client";

import { useTransition, useState } from "react";
import { editListing } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function EditListingForm({ product, acct_id }: { product: any; acct_id: string }) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(""); // Reset previous errors
    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log("🔄 Form Data Before Submitting:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    startTransition(async () => {
      const response = await editListing(formData);
      console.log("🔍 Response from editListing:", response);

      if (response?.message) {
        setErrorMessage(response.message); // Display error message
      } else {
        router.refresh(); // Refresh page after saving
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="product_id" value={product.product_id} />
      <input type="hidden" name="account_id" value={acct_id} />

      {errorMessage && (
        <div className="text-red-500 bg-red-100 p-2 rounded">
          ⚠️ {errorMessage}
        </div>
      )}

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
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
