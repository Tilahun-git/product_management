"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SearchComp from "@/components/store/SearchComp";
import AdminProductCard from "@/components/admin/AdminProductCard";
import { Loader2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  stock: number;
};

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      const productsArray = Array.isArray(data.products) ? data.products : [];
      setProducts(productsArray);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting");
    }
  };

  // Navigate to edit page
  const handleEdit = (id: string) => {
    router.push(`/products/addProduct/${id}`);

  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 text-slate-800 dark:text-slate-200">
      <Toaster position="top-right" />

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="w-full/2 md:w-auto">
          <SearchComp />
        </div>

        <Link
          href="/products/addProduct"
          className="bg-gray-300 dark:bg-gray-700 text-black hover:text-gray-100 px-6 py-3 rounded-lg hover:bg-gray-700 dark:text-white font-bold hover:scale-105 duration-500 dark:hover:bg-gray-500"
        >
          ➕ Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 justify-center text-center ">
          <Loader2 className="w-5 h-6 animate-spin" />
          <span className="text-gray-500 dark:text-gray-400 mt-8">
            Products are loading...
          </span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No products found.
        </p>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              description={product.description}
              image={product.image}
              onDelete={handleDelete}
              onEdit={handleEdit} // Pass edit handler
            />
          ))}
        </div>
      )}
    </main>
  );
}