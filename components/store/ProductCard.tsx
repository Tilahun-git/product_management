"use client";
import Link from "next/link";
import { useCart } from '@/context/CartContext'
import toast from "react-hot-toast";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCart } = useCart();

    const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast.success(`${name} added to cart! 🛒`); 
  };

  return (
    <div className="rounded-lg p-3 w-full shadow-sm hover:scale-105 duration-500 hover:shadow-md transition bg-white dark:bg-slate-800">
      <Link href={`/products/${id}`}>
        {image ? (
          <img src={image} alt={name} className="h-32 w-full object-cover rounded mb-3" />
        ) : (
          <div className="h-32 flex items-center justify-center rounded mb-4 bg-gray-100 dark:bg-slate-700">
            No Image
          </div>
        )}
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{name}</h2>
      </Link>

      <p className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">${price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full rounded-lg bg-gray-200 dark:bg-gray-500 px-3 text-sm py-1.5 text-black font-bold hover:bg-gray-600 hover:scale-105 transition-transform duration-500 hover:text-gray-100"
      >
        Add To Cart 🛒
      </button>
    </div>
  );
}
