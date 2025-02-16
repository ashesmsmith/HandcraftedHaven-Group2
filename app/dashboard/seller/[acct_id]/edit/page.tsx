"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { editListing, fetchProductById } from "@/lib/actions"; // Import server actions

export default function EditListingPage() {
  const { acct_id, prod_id } = useParams() as { acct_id: string; prod_id: string };
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${prod_id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Error loading product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [prod_id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("product_id", prod_id);
    formData.append("account_id", acct_id);

    await editListing(formData);
    router.push(`/dashboard/seller/${acct_id}/listings`);
  }

  if (loading) return <div>Loading product...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
          <label>Color:</label>
          <select name="color" defaultValue={product.color}>
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
          <label>Price:</label>
          <input type="number" name="price" step="0.01" defaultValue={product.price} required />
        </div>

        <div>
          <label>Image URL:</label>
          <input type="text" name="imageSRC" defaultValue={product.imageSRC} required />
        </div>

        <button type="submit" className="bg-dark-green text-white px-4 py-2 rounded hover:bg-dark-brown">
          Save Changes
        </button>
      </form>
    </main>
  );
}
