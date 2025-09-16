"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await api.get("/users").then((res) => res.data);
      const exists = users.find((u) => u.username === username);

      if (exists) {
        setError("This username is already taken.");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        password,
        orders: [],
        wishlist: [],
      };

      await api.post("/users", newUser);
      login(newUser);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      setError("Registration failed, try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow bg-white text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?
        <a href="/login" className="text-blue-600 underline cursor-pointer">
          Login here
        </a>
      </p>
    </div>
  );
}
