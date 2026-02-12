'use client'

import { useEffect, useState } from 'react'
import { useParams,useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { ArrowLeft } from "lucide-react"


type Product = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
  stock?: number
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)




function handleAddToCart() {
  if (!product) return

  console.log("Add to cart:", {
    id: product.id,
    quantity,
  })

  toast.success(`${product.name} added to cart 🛒`)
}


  const router =useRouter()
  useEffect(() => {
    if (!id) return

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?id=${id}`)
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.message || 'Product not found')
          return
        }
        setProduct(data.products?.[0] ?? null)
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-800 dark:text-slate-200">
        Loading...
      </div>
    )

  if (!product)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-slate-800 dark:text-slate-200">
        <p className="text-gray-600 dark:text-gray-400">Product not found</p>
         <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft size={18} />
          Back to products
        </button>
      </div>
    )
  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="mx-auto max-w-4xl rounded-xl bg-white dark:bg-slate-800 p-8 shadow">
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft size={18} />
          Back to products
        </button>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-cover rounded"/>
            ) : (
              <span className="text-gray-400 dark:text-gray-300">No Image</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2 text-xl font-semibold text-green-600 dark:text-green-400">
              ${product.price}
            </p>
            {product.description && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            )}

            {product.stock !== undefined && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Stock: {product.stock}
              </p>
            )}
          </div>
          <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm">Quantity:</span>

                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
                >
                  -
                </button>

                <span className="w-6 text-center">{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((q) =>
                      product.stock ? Math.min(product.stock, q + 1) : q + 1
                    )
                  }
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="
                  w-full
                  rounded-lg
                  bg-cyan-950
                  px-6
                  py-3
                  text-white
                  font-semibold
                  hover:bg-gree-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                "
              >
                {product.stock === 0 ? "Out of Stock" : "Add To Cart 🛒"}
              </button>

            </div>

        </div>
      </div>
    </main>
  );
}
