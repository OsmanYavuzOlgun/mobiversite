"use client";

import { useCard } from "@/context/CardContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Client({ product }) {
  const { addToCard } = useCard();
  const { addToWishlist } = useWishlist();

  if (!product) return null;

  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={() => addToCard(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Card
      </button>

      <button
        onClick={() => addToWishlist(product)}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Add to Wishlist
      </button>
    </div>
  );
}
