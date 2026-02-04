'use client'

import Link from 'next/link'

type ProductCardProps = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

export default function ProductCard({ id, name, price, description, image }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}  // dynamic route using string id
      className="block rounded-lg bg-white shadow-sm hover:shadow-md transition p-4"
    >
      {image ? (
        <img src={image} alt={name} className="h-40 w-full object-cover rounded mb-4" />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded bg-gray-100 mb-4 text-gray-400">
          No Image
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="mt-1 text-sm font-medium text-blue-600">${price}</p>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
    </Link>
  )
}
