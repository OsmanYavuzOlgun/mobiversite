"use client";

import { useWishlist } from "@/context/WishlistContext";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
        <Link
          href="/products"
          className="text-blue-600 underline"
          aria-label="Products"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-sm text-gray-500">{wishlist.length} Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition flex flex-col relative"
          >
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Remove
            </button>

            <div className="aspect-square flex items-center justify-center bg-white rounded-t-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full rounded-t-md object-cover new-arrivals-images"
              />
            </div>

            <div className="p-4 flex flex-col">
              <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h2>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                <span className="text-gray-600 ml-2 text-xs">4.5/5</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${item.price}
                </span>
                {item.oldPrice && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ${item.oldPrice}
                    </span>
                    <span className="text-red-500 text-xs font-semibold">
                      -{item.discount}%
                    </span>
                  </>
                )}
              </div>
              <Link
                href={`/products/${item.id}`}
                className="mt-4 text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                aria-label="products id"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
