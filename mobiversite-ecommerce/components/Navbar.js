"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCard } from "@/context/CardContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaStore,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { card } = useCard();
  const { wishlist } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 nav text-white shadow">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold" aria-label="Main Page">
        Mobiversite
      </Link>
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`${menuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-black-700 text-white flex flex-col items-center gap-6 py-6 md:static md:flex md:flex-row md:bg-transparent md:w-auto md:gap-6 md:py-0 hamburger-menu`}
      >
        <Link
          href="/products"
          className="flex items-center gap-1 hover:opacity-80"
          onClick={() => setMenuOpen(false)}
          aria-label="Products"
        >
          Products
        </Link>

        <Link
          href="/card"
          className="flex items-center gap-1 hover:opacity-80"
          onClick={() => setMenuOpen(false)}
          aria-label="Card"
        >
          <FaShoppingCart />
          Card {card.length > 0 && <span>({card.length})</span>}
        </Link>

        <Link
          href="/wishlist"
          className="flex items-center gap-1 hover:opacity-80"
          onClick={() => setMenuOpen(false)}
          aria-label="Wishlist"
        >
          <FaHeart className="text-red-400" />
          Wishlist {wishlist.length > 0 && <span>({wishlist.length})</span>}
        </Link>

        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-1 hover:opacity-80"
              onClick={() => setMenuOpen(false)}
              aria-label="Profile"
            >
              <FaUser />
              Profile
            </Link>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:opacity-80"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-1 hover:opacity-80"
              onClick={() => setMenuOpen(false)}
              aria-label="Login"
            >
              <FaSignInAlt />
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
