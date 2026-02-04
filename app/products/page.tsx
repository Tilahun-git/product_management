"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/layout/ProductCard'
import toast, { Toaster } from 'react-hot-toast'

type Product = {
  ID: number
  name: string
  price: number
  description?: string
  image?: string
}

type FrontendProduct = {
  id: string
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
      const data = await res.json()

  const productsArray = Array.isArray(data.products)
      ? data.products
      : []
      setProducts(
        productsArray.map((p:FrontendProduct) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: p.image,
        }))
      )
    } catch (err) {
      console.error(err)
      toast.error('Failed to load products')
      setProducts([])
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
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Products</h1>

          <Link href="/products/addProduct" className="bg-blue-600 text-white px-6 py-3 rounded">
            ➕ Add Product
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
