'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/layout/ProductCard'
import toast, { Toaster } from 'react-hot-toast'

type Product = {
  ID: number        // backend field
  name: string
  price: number
  description?: string
  image?: string
}

type FrontendProduct = {
  id: string        // frontend mapped id
  name: string
  price: number
  description?: string
  image?: string
}

export default function HomePage() {
  const [products, setProducts] = useState<FrontendProduct[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      const data: Product[] = await res.json()

      // Map backend ID → string id for frontend
      setProducts(
  data.map((p: any) => ({
    id: p.ID?.toString() ?? '', // convert numeric ID to string
    name: p.name,
    price: p.price,
    description: p.description,
    image: p.image,
  }))
)
    } catch (err) {
      console.error(err)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Products</h1>
          <Link
            href="/products/addProduct"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
          >
            ➕ Add New Product
          </Link>
        </div>

        {/* Product list */}
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">No products found</h2>
            <p className="mt-2 text-sm text-gray-500">Get started by adding your first product.</p>
            <Link
              href="/products/addProduct"
              className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Add New Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}   // string id ensures unique key
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
