"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductSuggestionItem from "./ProductSuggestionItem";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
};

export default function SearchComp() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔥 Reset search state
  function resetSearch() {
    setQuery("");
    setSuggestions([]);
    setHasSearched(false);
  }

  // 🔥 Detect click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        resetSearch();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setHasSearched(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${query}`);
        const data = await res.json();

        if (data.success) {
          setSuggestions(data.products);
        } else {
          setSuggestions([]);
        }

        setHasSearched(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setHasSearched(true);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${query}`);
    resetSearch();
  }

  return (
    <div ref={containerRef} className="relative w-96">
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
      </form>

      {query && hasSearched && (
        <div className="absolute bg-white dark:bg-gray-800 border w-full mt-1 rounded shadow max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <ProductSuggestionItem
                key={product.id}
                id={String(product.id)}
                name={product.name}
                price={product.price}
                image={product.image ?? undefined}
              />
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500">
              No items found matching this keyword
            </p>
          )}
        </div>
      )}
    </div>
  );
}
