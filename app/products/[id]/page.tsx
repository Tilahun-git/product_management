'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

type Product = {
  ID: number
  name: string
  price: number
  description?: string
  image?: string
  stock?: number
}

export default function ProductDetailsPage() {
  const params = useParams()
  const id = params?.id   // ✅ safe string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?id=${id}`)
        const data = await res.json()

        if (!res.ok) {
          toast.error(data.error || 'Product not found')
          return
        }

        setProduct(data)
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (!product) return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-gray-600">Product not found</p>
      <Link href="/" className="mt-4 text-blue-600 underline">Back to products</Link>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <Link href="/" className="text-sm text-blue-600 underline">← Back to products</Link>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-lg bg-gray-100">
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-80 w-full object-cover rounded" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-xl font-semibold text-green-600">${product.price}</p>
            {product.description && <p className="mt-4 text-gray-700">{product.description}</p>}
            {product.stock !== undefined && <p className="mt-4 text-sm text-gray-500">Stock: {product.stock}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
