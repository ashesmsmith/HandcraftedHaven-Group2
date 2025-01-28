"use client";

export default function AddToCartButton({
  onClick,
  isLoading = false,
}: {
  onClick: () => void;
  isLoading?: boolean;
}) {
  return (
    <button
      className="w-full md:w-auto bg-[#8A5D3D] text-white font-semibold py-2 px-4 rounded hover:bg-[#543A27] focus:outline-none focus:ring-2 focus:ring-[#8A5D3D] focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
}


  