"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-extrabold mb-4 text-green-600">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Your order has been placed successfully.
      </p>
      <div className="flex gap-4">
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          aria-label="Products"
        >
          Continue Shopping
        </Link>
        <Link
          href="/profile"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
          aria-label="Profile"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
