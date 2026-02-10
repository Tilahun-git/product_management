"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/layout/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import SearchComp from "@/components/layout/SearchComp";

type FrontendProduct = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();

      const productsArray = Array.isArray(data.products)
        ? data.products
        : [];

      setProducts(
        productsArray.map((p: FrontendProduct) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: p.image,
        }))
      );
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

  return (
    <main
      className="
        min-h-screen
        p-8
        bg-gray-50 dark:bg-slate-900   
        text-slate-800 dark:text-slate-200">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <SearchComp/>
          <Link
            href="/products/addProduct"
            className="
              bg-blue-600 text-white
              px-6 py-3 rounded
              hover:bg-blue-700
              dark:hover:bg-blue-500">
            ➕ Add Product
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p> 
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
