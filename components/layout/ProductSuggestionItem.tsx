"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function ProductSuggestionItem({
  id,
  name,
  price,
  image,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="
        flex items-center p-2
        rounded
        cursor-pointer
        hover:bg-gray-100 dark:hover:bg-slate-700
        transition-colors
      "
      onClick={() => router.push(`/products/${id}`)}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-12 h-12 object-cover rounded mr-2"
        />
      ) : (
        <div
          className="
            w-12 h-12 rounded mr-2
            flex items-center justify-center
            bg-gray-200 dark:bg-slate-700
            text-gray-500 dark:text-gray-300
            text-xs
          "
        >
          No Img
        </div>
      )}

      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
