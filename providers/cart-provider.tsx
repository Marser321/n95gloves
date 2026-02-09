"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, options?: { openCart?: boolean }) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastActionAt: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("n95-cart");
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const [lastActionAt, setLastActionAt] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("n95-cart", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key === "n95-cart" && event.newValue) {
        try {
          setItems(JSON.parse(event.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = (item: Omit<CartItem, "quantity">, options?: { openCart?: boolean }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setLastActionAt(Date.now());
    if (options?.openCart) {
      setOpen(true);
    }
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const increment = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const decrement = (id: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
        .filter((i) => i.quantity > 0)
    );

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addItem,
        removeItem,
        increment,
        decrement,
        open,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
        lastActionAt,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
