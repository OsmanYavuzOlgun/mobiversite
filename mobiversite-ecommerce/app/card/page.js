"use client";

import { useCard } from "@/context/CardContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function CardPage() {
  const { card, removeFromCard, updateQuantity, clearCard } = useCard();
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = card.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);

    const cartPayload = {
      userId: user.id,
      date: new Date().toISOString().split("T")[0],
      products: card.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await api.post("/carts", cartPayload);

      const savedOrder = {
        ...res.data,
        userId: user.id,
        date: cartPayload.date,
        products: cartPayload.products,
        total,
        status: "completed",
      };

      // 🟢 LocalStorage’da orders array olarak sakla
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...storedOrders, savedOrder]));

      console.log("Checkout success:", savedOrder);

      setTimeout(() => {
        clearCard();
        setIsCheckingOut(false);
        router.push(`/thank-you?orderId=${res.data.id}`);
      }, 800);
    } catch (err) {
      setIsCheckingOut(false);
      console.error("Checkout failed:", err);
    }
  };


  if (isCheckingOut) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4 animate-pulse">
          Processing your order...
        </h1>
      </div>
    );
  }

  if (!isCheckingOut && card.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Card is Empty</h1>
        <Link
          href="/products"
          className="text-blue-600 underline"
          aria-label="Products"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8 text-black checkout-container items-start">
      <div className="bg-white lg:col-span-2 space-y-6 rounded-lg">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold mb-4">YOUR CARD</h1>

          {card.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 pt-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">Size: Large</p>
                  <p className="text-sm text-gray-500">Color: Random</p>
                  <p className="text-lg font-bold">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCard(item.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="remove from card"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Delivery Fee</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-800 cursor-pointer"
        >
          Go to Checkout →
        </button>
      </div>
    </div>
  );
}
