"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";
import api from "@/lib/api";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, 20));
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast.success(`${product.title} added to wishlist ❤️`);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">
          Showing 1-{Math.min(visibleCount, products.length)} of{" "}
          {products.length} Products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <Link
              href={`/products/${product.id}`}
              className="aspect-square flex items-center justify-center bg-white rounded-t-xl"
              aria-label="Product ID"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full rounded-t-md products-image"
              />
            </Link>

            <div className="p-4 flex flex-col">
              <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h2>

              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                <span className="text-gray-600 ml-2 text-xs">4.5/5</span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ${product.oldPrice}
                    </span>
                    <span className="text-red-500 text-xs font-semibold">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={() => handleAddToWishlist(product)}
                className="mt-4 flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium cursor-pointer"
              >
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < 20 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={showMore}
            className="px-6 py-3 border border-gray-400 rounded-full hover:bg-gray-100 hover:text-blue-700 transition cursor-pointer"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
