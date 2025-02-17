"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { editListing, deleteListing } from "@/lib/actions";
import Link from "next/link";

interface Product {
  product_id: string;
  productName: string;
  productDesc: string;
  category: string;
  color: string;
  price: number;
  imageSRC: string;
}

export default function EditListingPage() {
  const { acct_id, prod_id } = useParams() as { acct_id: string; prod_id: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        console.log(`🔍 Fetching product details for ID: ${prod_id}`);
        const res = await fetch(`/api/products/${prod_id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${await res.text()}`);
        }
        const data = await res.json();
        setProduct(data.product);
        console.log("Product loaded:", data.product);
      } catch (error) {
        console.error("Error loading product:", error);
        setStatusMsg("Error loading product details.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [prod_id]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("account_id", acct_id);
    formData.append("product_id", prod_id);

    try {
      console.log("Submitting edit form...");
      await editListing(formData);
      router.push(`/dashboard/seller/${acct_id}/listings`);
    } catch (error) {
      console.error("Failed to update listing:", error);
      setStatusMsg("Failed to update listing.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      console.log(`🗑️ Deleting product ID: ${prod_id}`);
      await deleteListing(prod_id, acct_id);
      router.push(`/dashboard/seller/${acct_id}/listings`);
    } catch (error) {
      console.error("Error deleting listing:", error);
      setStatusMsg("Error deleting listing.");
    }
  }

  if (loading) return <div className="p-4">Loading product...</div>;
  if (!product) return <div className="p-4 text-red-600">Product not found.</div>;

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>

      {statusMsg && <div className="text-red-600">{statusMsg}</div>}

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded shadow">
        <input type="hidden" name="product_id" value={prod_id} />
        <input type="hidden" name="account_id" value={acct_id} />

        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input type="text" name="productName" defaultValue={product.productName} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Product Description</label>
          <textarea name="productDesc" defaultValue={product.productDesc} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select name="category" defaultValue={product.category} className="w-full border p-2 rounded">
            <option value="Pottery">Pottery</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Stickers">Stickers</option>
            <option value="Woodworking">Woodworking</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Color</label>
          <select name="color" defaultValue={product.color} className="w-full border p-2 rounded">
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

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input type="number" name="price" step="0.01" defaultValue={product.price} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input type="text" name="imageSRC" defaultValue={product.imageSRC} className="w-full border p-2 rounded" required />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Save Changes
          </button>
          <button type="button" onClick={handleDelete} className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Delete Listing
          </button>
        </div>
      </form>

      {/* Back to Listings Button */}
      <div className="mt-6 flex justify-center">
        <Link href={`/dashboard/seller/${acct_id}/listings`}>
          <button className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition">
            Back to Listings
          </button>
        </Link>
      </div>
    </section>
  );
}
