'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

type Props = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  stock?: number
}

export default function ProductDetailsCard({ id, name, price, image, description, stock }: Props) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (stock !== undefined && stock === 0) {
      toast.error('Product out of stock')
      return
    }

    addToCart({ id, name, price, image })  
  }

  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg h-80">
          {image ? (
            <img src={image} alt={name} className="h-80 w-full object-cover rounded" />
          ) : (
            <span className="text-gray-400 dark:text-gray-300">No Image</span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">${price}</p>
          {description && <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>}
          {stock !== undefined && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Stock: {stock}</p>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-3 mt-4">
            <span>Quantity:</span>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
            >
              -
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() =>
                setQuantity((q) => (stock ? Math.min(stock, q + 1) : q + 1))
              }
              className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="mt-4 w-full rounded-lg bg-cyan-950 px-6 py-3 text-white font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {stock === 0 ? 'Out of Stock' : 'Add To Cart 🛒'}
          </button>
        </div>
      </div>
    </div>
  )
}
