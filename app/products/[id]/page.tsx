'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import ProductDetailsCard from '@/components/store/ProductDetailsCard'

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
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center text-slate-800 dark:text-slate-200">
      Loading...
    </div>
  )

  if (!product) return (
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
      <button
        onClick={() => router.push("/products")}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ArrowLeft size={18} />
        Back to products
      </button>

      {product && (
        <ProductDetailsCard
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
          stock={product.stock}
        />
      )}
    </main>
  )
}
