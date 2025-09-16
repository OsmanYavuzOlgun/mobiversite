"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const id = String(user.id);
      api
        .get(`/users/${id}`)
        .then((res) => {
          setProfile(res.data);
          setOrders(res.data.orders || []);
        })
        .catch((err) => {
          console.error("Profile fetch failed:", err);
        });
    }
  }, [user]);

  if (!user) {
    return <h1 className="text-center mt-10">You must be logged in</h1>;
  }

  return (
    <div className=" mt-8 text-black profile-container">
      <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className=" gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={profile?.username || ""}
              className="mt-1 w-full border rounded px-3 py-2"
              disabled
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
                <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.title} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="text-green-600 mt-2">Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
