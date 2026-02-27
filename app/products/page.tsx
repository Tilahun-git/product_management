'use client';

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ProductCard from "@/components/store/ProductCard";
import SearchComp from "@/components/store/SearchComp";
import {Loader2 } from "lucide-react";

type FrontendProduct = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        const productsArray = Array.isArray(data.products) ? data.products : [];
        setProducts(productsArray);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="w-full/2 md:w-auto">
          <SearchComp />
        </div>

        <a
          href="/products/addProduct"
          className="w-full sm:w-auto text-center bg-gray-300 dark:bg-gray-700 text-black hover:text-gray-100 px-6 py-3 rounded-lg hover:bg-gray-700 dark:text-white font-bold hover:scale-105 duration-300 dark:hover:bg-gray-500"
        >
          ➕ Add Product
        </a>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex items-center gap-4 justify-center text-center ">
          <Loader2  className="w-5 h-6 animate-spin"/>
         <span className="text-gray-500 dark:text-gray-400 mt-8">Product is loading...</span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 mt-8 text-center">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </main>
  );
}
