'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { Edit2, Trash2 } from 'lucide-react'


type Product = {
  id: string      // frontend string id
  name: string
  description?: string
  image?: string
  price: number
  stock: number
}

export default function HomePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await fetch("/api/products")
      const data = await res.json()
      const productsArray = Array.isArray(data.products) ? data.products : []
      setProducts(productsArray)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load products")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setProducts(products.filter((p) => p.id !== id))
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong while deleting")
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/addProduct" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          ➕ Add New Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 bg-white shadow-sm">
              {product.image && (
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded mb-3" />
              )}
              <h3 className="font-semibold text-lg">{product.name}</h3>
              {product.description && <p className="text-sm text-gray-600 mt-1">{product.description}</p>}
              <div className="mt-2 text-sm">
                <p>💲 {product.price}</p>
                <p>📦 Stock: {product.stock}</p>
              </div>

              <div className="mt-4 flex gap-2 justify-between">
                            <button
                onClick={() => router.push(`products/addProduct?id=${product.id}`)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center justify-center"
                title="Edit Product"
              >
                <Edit2 size={18} />
              </button>

                            <button
                onClick={() => handleDelete(product.id)}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center justify-center"
                title="Delete Product"
              >
                <Trash2 size={18} />
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
