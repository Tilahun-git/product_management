"use client";

import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="
        block
        rounded-lg
        p-4
        shadow-sm
        hover:shadow-md
        transition
        
        bg-white               
        dark:bg-slate-800       
      "
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover rounded mb-4"
        />
      ) : (
        <div
          className="
            flex
            h-40
            w-full
            items-center
            justify-center
            rounded
            mb-4

            bg-gray-100         
            dark:bg-slate-700     

            text-gray-400
            dark:text-gray-300    
          "
        >
          No Image
        </div>
      )}

      <h2
        className="
          text-lg
          font-semibold

          text-gray-900
          dark:text-white        
        "
      >
        {name}
      </h2>

      <p
        className="
          mt-1
          text-sm
          font-medium
          text-blue-600
          dark:text-blue-400     
        "
      >
        ${price}
      </p>

      {description && (
        <p
          className="
            mt-2
            text-sm
            text-gray-600
            dark:text-gray-300   
          "
        >
          {description}
        </p>
      )}
    </Link>
  );
}
