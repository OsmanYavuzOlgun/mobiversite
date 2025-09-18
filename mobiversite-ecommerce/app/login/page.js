"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Cookies from "js-cookie";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });

      if (res.data.token) {
        const usersRes = await api.get("/users");
        const foundUser = usersRes.data.find((u) => u.username === username);

        const userData = {
          id: foundUser?.id,
          username,
          email: foundUser?.email,
          token: res.data.token,
        };
        login(userData);

        Cookies.set("user", JSON.stringify(userData), {
          expires: 7,
          path: "/",
        });

        router.push("/profile");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed, try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow bg-white text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="örn: johnd"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="örn: m38rmF$"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-semibold mb-1">Demo Users:</p>
        <ul className="list-disc list-inside">
          <li>
            <strong>johnd</strong> / <code>m38rmF$</code>
          </li>
          <li>
            <strong>mor_2314</strong> / <code>83r5^_</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
