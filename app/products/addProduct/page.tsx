'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { UploadCloud, X, Trash2 } from 'lucide-react'

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

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    image: '',
    price: '',
    stock: '',
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!editingId) return

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${editingId}`)
        const data = await res.json()

        if (!res.ok || !data.success) {
          toast.error('Unable to fetch product')
          return
        }

        const product = data.products[0]

        setForm({
          name: product.name || '',
          description: product.description || '',
          image: product.image || '',
          price: product.price?.toString() || '',
          stock: product.stock?.toString() || '',
        })
      } catch (err) {
        console.error(err)
        toast.error('Failed to fetch product')
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

        if (editingId) {
          router.push('/')
        } else {
          setForm({
            name: '',
            description: '',
            image: '',
            price: '',
            stock: '',
          })
        }
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      toast.loading('Uploading image...', { id: 'upload' })

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setForm(prev => ({ ...prev, image: data.url }))
        toast.success('Image uploaded', { id: 'upload' })
      } else {
        toast.error('Upload failed', { id: 'upload' })
      }
    } catch (err) {
      console.error(err)
      toast.error('Upload failed', { id: 'upload' })
    }
  }
  function handleCancel() {
     router.push('/') 
  }

  return (
    <main className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <Toaster position="top-right" />

      <h2 className="text-xl font-semibold mb-4">
        {editingId ? 'Update Product' : 'Add New Product'}
      </h2>

      {error && (
        <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {!form.image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-black hover:bg-gray-50 transition"
          >
            <UploadCloud className="mx-auto w-8 h-8 text-gray-500 mb-2" />
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={form.image}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, image: '' }))}
              className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-400 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 border border-gray-200 text-gray-700 py-2 rounded hover:bg-gray-800 hover:text-white transition flex items-center justify-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
