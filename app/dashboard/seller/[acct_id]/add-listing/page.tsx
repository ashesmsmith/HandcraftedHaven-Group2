// app/dashboard/seller/[acct_id]/add-listing/page.tsx
"use client";

import { useParams } from "next/navigation";
import { addListing } from "@/lib/actions"; // Server action that saves the listing in the DB and redirects
import { useTransition, FormEvent } from "react";

export default function AddListingPage() {
  const { acct_id } = useParams() as { acct_id: string };
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Append the seller's account id
    formData.append("account_id", acct_id);

    // Generate a valid UUID for the new product (instead of using Date.now())
    const newProductId = crypto.randomUUID();
    formData.append("product_id", newProductId);

    startTransition(async () => {
      // Call the server action to add the listing.
      // The server action now redirects to /dashboard/seller/{acct_id}/listings after a successful insertion.
      await addListing(formData);
    });
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl p-8 bg-white border border-gray-200 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block font-medium mb-1">
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDesc" className="block font-medium mb-1">
              Product Description
            </label>
            <textarea
              id="productDesc"
              name="productDesc"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="Pottery">Pottery</option>
              <option value="Clothing">Clothing</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Stickers">Stickers</option>
              <option value="Woodworking">Woodworking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block font-medium mb-1">
              Color
            </label>
            <select
              id="color"
              name="color"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Gray">Gray</option>
              <option value="Brown">Brown</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Multi">Multi</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageSRC" className="block font-medium mb-1">
              Image URL
            </label>
            <input
              id="imageSRC"
              name="imageSRC"
              type="text"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-dark-green text-white py-2 rounded hover:bg-dark-brown transition"
          >
            {isPending ? "Submitting..." : "Add Listing"}
          </button>
        </form>
      </div>
    </main>
  );
}
