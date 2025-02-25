"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  acct_id: string;
  prod_id: string;
}

export default function DeleteButton({ acct_id, prod_id }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/products/${prod_id}/delete`, {
        method: "DELETE",
        headers: { "x-account-id": acct_id },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Deletion failed");
      }
      router.push(`/dashboard/seller/${acct_id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-[#543A27] text-white px-4 py-2 rounded hover:bg-[#754D33] transition"
    >
      Delete Listing
    </button>
  );
}
