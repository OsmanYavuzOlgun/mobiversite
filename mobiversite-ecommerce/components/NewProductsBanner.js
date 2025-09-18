"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function NewProductsBanner() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products?limit=3").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <section className="container mx-auto py-12 new-arrivals">
      <h2 className="text-3xl font-extrabold text-center mb-4 mt-4">
        NEW ARRIVALS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="w-full h-full rounded-t-md products-image">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-full rounded-t-md new-arrivals-images products-image"
              />
            </div>
            <div className="p-2">
              <h3 className="font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                <span className="text-gray-600 ml-2 text-xs">4.5/5</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 mb-8">
        <Link
          href="/products"
          className="px-6 py-3 border border-gray-400 rounded-full hover:bg-gray-100 hover:text-blue-700 transition"
          aria-label="new products banner"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
