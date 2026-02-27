"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { UploadCloud, X } from "lucide-react";

type ProductForm = {
  name: string;
  description: string;
  image: string;
  price: string;
  stock: string;
};

const initialForm: ProductForm = {
  name: "",
  description: "",
  image: "",
  price: "",
  stock: "",
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const editingId =
  typeof params?.id === "string"
    ? params.id
    : Array.isArray(params?.id)
    ? params.id[0]
    : undefined;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [error, setError] = useState<string | null>(null);

  // Fetch product on mount
  useEffect(() => {
      const idNumber = Number(editingId);
      if (!idNumber) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${idNumber}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          toast.error("Unable to fetch product");
          return;
        }

        const product = data.product;
        setForm({
          name: product.name || "",
          description: product.description || "",
          image: product.image || "",
          price: product.price?.toString() || "",
          stock: product.stock?.toString() || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to also there to fetch product");
      }
    };

    fetchProduct();
  }, [editingId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.price) {
      setError("Name and price are required");
      toast.error("Name and price are required");
      return;
    }

    const payload = {
      name: form.name,
      description: form.description || undefined,
      image: form.image || undefined,
      price: Number(form.price),
      stock: form.stock ? Number(form.stock) : 0,
    };

    try {

      const res = await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
        if (data.success) {
        toast.success(data.message, { id: "save" });
        setTimeout(() => {
          router.push("/products");
        }, 1500); // wait 1.5s so toast shows
      }else {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong", { id: "save" });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      toast.error("Something went wrong", { id: "save" });
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading image...", { id: "upload" });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.url }));
        toast.success("Image uploaded", { id: "upload" });
      } else {
        toast.error("Upload failed", { id: "upload" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: "upload" });
    }
  }

  function handleCancel() {
    router.push("/");
  }

  return (
    <main className="max-w-xl mx-auto p-8 mt-8 mb-4 rounded-xl shadow bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Product</h2>

      {error && (
        <p className="mb-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
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
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-slate-600 transition"
          >
            <UploadCloud className="mx-auto w-8 h-8 text-gray-500 dark:text-gray-300 mb-2" />
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">
              PNG, JPG, WEBP supported
            </p>
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
              onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
              className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black p-1 rounded-full"
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
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-cyan-800 dark:bg-gray-300 text-white dark:text-slate-900 py-2 rounded-lg hover:opacity-90 transition"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-slate-700 hover:text-white transition flex items-center justify-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </form>
    </main>
  );
}