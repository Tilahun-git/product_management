"use client";

import { Edit2, Trash2 } from "lucide-react";

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  description?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void; // Added edit handler
};

export default function AdminProductCard({
  id,
  name,
  price,
  image,
  stock,
  description,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-800">
      {image && (
        <img
          src={image}
          alt={name}
          className="h-40 w-full object-cover rounded mb-3"
        />
      )}

      <h3 className="font-semibold text-lg">{name}</h3>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>
      )}

      <div className="mt-2 text-sm">
        <p>💲 {price}</p>
        <p>📦 Stock: {stock}</p>
      </div>

      <div className="mt-4 flex gap-2 justify-evenly">
        {/* Edit button now calls parent onEdit handler */}
        <button
          onClick={() => onEdit(id)}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Edit2 size={18} />
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(id)}
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}