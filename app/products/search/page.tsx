"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/store/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!query) return;

      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();

      if (data.success) setProducts(data.products);
      else setProducts([]);

      setLoading(false);
    }

    fetchProducts();
  }, [query]);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-xl mb-6">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <div className="p-6 border rounded bg-gray-100">
          No matching products found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={String(p.id)}
              name={p.name}
              price={p.price}
              image={p.image ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
