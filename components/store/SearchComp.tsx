"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductSuggestionItem from "./ProductSuggestionItem";
import { Search } from "lucide-react";

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
  const [error, setError] = useState("");

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  function resetSearch() {
    setQuery("");
    setSuggestions([]);
    setHasSearched(false);
    setError("");
  }

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

        if (data.success) setSuggestions(data.products);
        else setSuggestions([]);

        setHasSearched(true);
      } catch {
        setSuggestions([]);
        setHasSearched(true);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please type something to search");
      return;
    }

    setError("");
    router.push(`/products/search?q=${trimmedQuery}`);
    resetSearch();
  }

  return (
    <div ref={containerRef} className="relative w-96">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full bg-white border dark:bg-gray-700 dark:text-white rounded-xl shadow-sm px-3 py-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError("");
          }}
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent text-sm"
        />

        <button type="submit" className="ml-2 text-gray-500">
          <Search size={22} />
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

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
