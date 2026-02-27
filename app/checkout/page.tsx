"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login"); 
      return;
    }

    if (cart.length === 0) {
      router.push("/products");
      return;
    }
  }, [isLoggedIn, cart, router]);

  const handleOrder = () => {
    if (!address) {
      toast.error("Please enter shipping address");
      return;
    }

    toast.success("Order placed successfully 🎉");
    clearCart();
    router.push("/orders/success");
  };

  if (!isLoggedIn || cart.length === 0) return null;

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* SHIPPING */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-3">Shipping Address</h2>
            <textarea
              placeholder="Enter full shipping address..."
              className="w-full p-3 rounded-lg border dark:bg-slate-700"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* PAYMENT */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-3">Payment Method</h2>

            <label className="block mb-2">
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />{" "}
              Credit / Debit Card
            </label>

            <label className="block mb-2">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />{" "}
              Cash on Delivery
            </label>
          </div>

          {/* REVIEW ITEMS */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-3">Order Items</h2>

            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between border-b py-2"
              >
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-4 font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
