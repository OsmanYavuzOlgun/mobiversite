"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // 🔹 Kullanıcı bilgileri
        const resUser = await api.get(`/users/${user.id}`);
        setProfile(resUser.data);

        // 🔹 API'den carts
        const resCarts = await api.get(`/carts/user/${user.id}`);
        let carts = resCarts.data || [];

        // 🔹 LocalStorage'daki orders'ı ekle
        const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const userLocalOrders = localOrders.filter(
          (o) => o.userId === user.id
        );

        carts = [...carts, ...userLocalOrders];

        // 🔹 Ürün detaylarını zenginleştir
        const enrichedOrders = await Promise.all(
          carts.map(async (cart) => {
            const productsWithDetails = await Promise.all(
              cart.products.map(async (p) => {
                const productData = await api
                  .get(`/products/${p.productId}`)
                  .then((r) => r.data)
                  .catch(() => ({ title: "Unknown", price: 0 }));

                return {
                  ...p,
                  name: productData.title,
                  price: productData.price,
                };
              })
            );

            return {
              ...cart,
              products: productsWithDetails,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <h1 className="text-center mt-10">You must be logged in</h1>;
  }

  if (loading) {
    return <h1 className="text-center mt-10">Loading profile...</h1>;
  }

  return (
    <div className="mt-8 text-black profile-container">
      <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        {profile ? (
          <div className="gap-4">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                value={profile.username}
                className="mt-1 w-full border rounded px-3 py-2"
                disabled
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="text"
                value={profile.email}
                className="mt-1 w-full border rounded px-3 py-2"
                disabled
              />
            </div>
          </div>
        ) : (
          <p>No profile info available.</p>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => {
              const orderTotal = order.products.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0
              );

              return (
                <div
                  key={`${order.id}-${idx}`}   // 🔑 uniq key
                  className="border rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>

                  <div className="divide-y">
                    {order.products.map((p, pIdx) => (
                      <div
                        key={`${order.id}-product-${pIdx}`}  // 🔑 ürünlerde de uniq key
                        className="flex justify-between items-center py-2 text-sm"
                      >
                        <div className="flex-1">
                          <span className="font-bold">Product:</span> {p.name}
                        </div>
                        <div className="w-24 text-center">
                          <span className="font-bold">Qty:</span> {p.quantity}
                        </div>
                        <div className="w-32 text-right">
                          <span className="font-bold">Price:</span> $
                          {(p.price * p.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-right mt-3 font-bold text-lg">
                    Total: ${orderTotal.toFixed(2)}
                  </div>

                  <div className="text-green-600 font-semibold mt-2">
                    Status: Completed
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}
