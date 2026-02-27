'use client'

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isLoggedIn } = useAuth();

  const addToCart = (product: CartItem) => {
    if (!isLoggedIn) {
      toast("Please login to add items to your cart");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Increase quantity if already in cart
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // ✅ Toast inside the context
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
