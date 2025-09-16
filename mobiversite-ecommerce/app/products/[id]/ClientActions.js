"use client";

import { useState } from "react";
import { useCard } from "@/context/CardContext";
import { useWishlist } from "@/context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ClientActions({ product }) {
  const { addToCard } = useCard();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCard = () => {
    addToCard({ ...product, quantity });
    toast.success(`${product.title} added to card 🛒`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast(`${product.title} added to wishlist ❤️`, {
      icon: "💖",
    });
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          className="px-4 py-2 rounded-full border hover:bg-red-400 hover:text-black cursor-pointer"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="font-semibold text-lg">{quantity}</span>
        <button
          className="px-4 py-2 rounded-full border hover:bg-green-400 hover:text-black cursor-pointer"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAddToCard}
          className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-semibold cursor-pointer border"
        >
          Add to Card
        </button>

        <button
          onClick={handleAddToWishlist}
          className="w-14 h-14 flex items-center justify-center border border-gray-300 rounded-full hover:bg-pink-50 hover:text-pink-600 transition cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <FaHeart size={20} />
        </button>
      </div>
    </div>
  );
}
