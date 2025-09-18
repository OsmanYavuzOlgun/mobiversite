"use client";
import { createContext, useState, useContext, useEffect } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [card, setCard] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("card")) || [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  const addToCard = (product) => {
    setCard((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCard = (id) => {
    setCard((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCard((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCard = () => setCard([]);

  return (
    <CardContext.Provider
      value={{ card, addToCard, removeFromCard, updateQuantity, clearCard }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = () => useContext(CardContext);
