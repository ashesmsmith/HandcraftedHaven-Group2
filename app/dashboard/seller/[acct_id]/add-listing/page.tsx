"use client";

import { useParams } from "next/navigation";
import { addListing } from "@/lib/actions";
import { useTransition, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AddListingPage() {
  const params = (useParams() ?? {}) as Record<string, string>;
  const acct_id = params.acct_id ?? "";

  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const placeholderImage = "/prod_images/no-image.png";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("account_id", acct_id);
    formData.append("product_id", crypto.randomUUID());

    startTransition(async () => {
      await addListing(formData);
      setIsSubmitted(true);
    });
  }

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xl p-8 bg-white border border-gray-200 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Listing</h1>

        {/* Success Message (Now Styled in Dark Brown) */}
        {isSubmitted && (
          <div className="mb-4 text-[#543A27] text-center font-medium">
            Listing was successfully posted!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block font-medium mb-1">
              Product Name
            </label>
            <input id="productName" name="productName" type="text" required className="w-full border rounded px-3 py-2" />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="productDesc" className="block font-medium mb-1">
              Product Description
            </label>
            <textarea id="productDesc" name="productDesc" required className="w-full border rounded px-3 py-2" />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <select id="category" name="category" required className="w-full border rounded px-3 py-2">
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
            <select id="color" name="color" required className="w-full border rounded px-3 py-2">
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
            <input id="price" name="price" type="number" step="0.01" required className="w-full border rounded px-3 py-2" />
          </div>

          {/* Image URL Input */}
          <div>
            <label htmlFor="imageSRC" className="block font-medium mb-1">
              Image URL
            </label>
            <input id="imageSRC" name="imageSRC" type="text" value={imageUrl || ""} onChange={handleImageUrlChange} className="w-full border rounded px-3 py-2" />
          </div>

          {/*Fixed Image Preview with Required width & height */}
          <div className="text-center">
            <h2 className="text-lg font-medium mb-2">Image Preview</h2>
            <Image
              src={imageUrl || placeholderImage}
              alt="Product Image Preview"
              width={128}
              height={128}
              className="object-cover rounded shadow"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button type="submit" disabled={isPending} className="w-full bg-[#543A27] text-white py-2 rounded hover:bg-[#754D33] transition">
              {isPending ? "Submitting..." : "Add Listing"}
            </button>
            <Link href={`/dashboard/seller/${acct_id}`} passHref>
              <button type="button" className="w-full bg-[#543A27] text-white py-2 rounded hover:bg-[#754D33] transition">
                Back to Dashboard
              </button>
            </Link>
            {/* "Go Back to View/Edit Listings" Button*/}
            <Link href={`/dashboard/seller/${acct_id}/listings`} passHref>
              <button type="button" className="w-full bg-[#543A27] text-white py-2 rounded hover:bg-[#754D33] transition">
                Go Back to View/Edit Listings
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
