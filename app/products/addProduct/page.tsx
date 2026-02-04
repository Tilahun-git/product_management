'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

type ProductForm = {
  name: string
  description: string
  image: string
  price: string
  stock: string
}

export default function AddProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editingId = searchParams.get('id') 

  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    image: '',
    price: '',
    stock: '',
  })
  const [error, setError] = useState<string | null>(null)

  // If editing, fetch product data on mount
  useEffect(() => {
    if (!editingId) return
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?id=${editingId}`)
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Unable to fetch the product')
          return
        }

       const product = data.product ?? data

        setForm({
          name: product.name ?? '',
          description: product.description ?? '',
          image: product.image ?? '',
          price: product.price != null ? String(product.price) : '',
          stock: product.stock != null ? String(product.stock) : '',
        })

      } catch (err) {
        console.error(err)
        toast.error('Something went wrong while fetching product')
      }
    }
    fetchProduct()
  }, [editingId])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.name || !form.price) {
      setError('Name and price are required')
      toast.error('Name and price are required')
      return
    }

    const payload = {
      name: form.name,
      description: form.description || undefined,
      image: form.image || undefined,
      price: Number(form.price),
      stock: form.stock ? Number(form.stock) : 0,
    }

    try {
      const res = await fetch('/api/products', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ID: Number(editingId), ...payload } : payload),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        // Clear form
        setForm({ name: '', description: '', image: '', price: '', stock: '' })
        // Redirect back to homepage after submit
        // router.push('/')
      } else {
        setError(data.message || 'Something went wrong')
        toast.error(data.message || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
      toast.error('Something went wrong')
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <Toaster position="top-right" />
      <h2 className="text-xl font-semibold mb-4">{editingId ? 'Update Product' : 'Add New Product'}</h2>
      {error && <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </main>
  )
}
