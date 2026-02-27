'use client'

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const handleCheckout = () => {
  if (!isLoggedIn) {
    toast.error("Login required for checkout");
    router.push("/auth/login");
    return;
  }

  if (cart.length === 0) {
    toast("Your cart is empty");
    router.push("/products");
    return;
  }

  router.push("/checkout");
};

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl text-center font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length !== 0 && (
        <Link
          href="/products"
          className="inline-flex items-center px-5 py-2.5 mb-6 font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors duration-200"
        >
          ← Back to Products
        </Link>
      )}

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-72 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-center p-6 space-y-4">
          <div className="text-5xl">🛒</div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Your cart is empty
            </h2>
          </div>
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((product, index) => (
                <tr
                  key={`${product.id}-${index}`}
                  className="border-t border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="p-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-slate-600 rounded">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="px-3 py-1 rounded-md bg-gray-400 text-white dark:bg-gray-300 dark:text-slate-900 hover:bg-gray-800 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-200 dark:border-slate-600">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

            <div className="flex gap-3 mt-3 sm:mt-0">
              <button
                onClick={() => clearCart()}
                className="px-4 py-2 bg-gray-900 dark:bg-gray-400 dark:text-gray-800 font-bold text-white rounded-md hover:bg-red-700 transition"
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-cyan-600 text-white rounded-md font-semibold hover:bg-cyan-700 transition"
              >
                Checkout
              </button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
