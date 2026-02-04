// lib/api.ts
import { Product } from '@/types/product'
import { prisma } from './prisma'

// Input types for creating/updating products
export type CreateProductInput = {
  name: string
  description?: string
  image?: string
  price: number
  stock?: number
}

export type UpdateProductInput = Partial<CreateProductInput>

// Get all products (maps backend ID → frontend id string)
export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products.map((p) => ({
    id: p.ID.toString(), // map to string for frontend
    name: p.name,
    price: p.price,
    description: p.description,
    image: p.image,
    stock: p.stock,
  }))
}

// Get single product by id (frontend string id → backend number ID)
export async function getProductById(id: number) {

    if (!id || isNaN(id)) return null

  const product = await prisma.product.findUnique({
    where: { ID: id },
  })
  if (!product) return null

  return {
    id: product.ID.toString(), // map to string
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  }
}




// Create a new product
export async function addProduct(data: CreateProductInput) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      stock: data.stock ?? 0,
    },
  })
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  }
}

// Update an existing product
export async function updateProduct(id: string, data: UpdateProductInput) {
  const product = await prisma.product.update({
    where: { ID: Number(id) },
    data,
  })
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { ID: Number(id) },
  })
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  }
}
