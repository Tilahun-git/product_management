// lib/api.ts
import { CreateProductInput } from "@/types/product";
import { prisma } from "./prisma";

export type UpdateProductInput = Partial<CreateProductInput>;

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products.map((p) => ({
    id: p.ID.toString(),
    name: p.name,
    price: p.price,
    description: p.description,
    image: p.image,
    stock: p.stock,
  }));
}

export async function getProductById(id: number) {
  if (!id || isNaN(id)) return null;

  const product = await prisma.product.findUnique({
    where: { ID: id },
  });
  if (!product) return null;

  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  };
}

export async function addProduct(data: CreateProductInput) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      stock: data.stock ?? 0,
    },
  });
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  };
}

// 🔧 CHANGED: id type string → number
export async function updateProduct(id: number, data: UpdateProductInput) {
  const product = await prisma.product.update({
    where: { ID: id }, // 🔧 removed Number()
    data,
  });
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  };
}

// 🔧 CHANGED: id type string → number
export async function deleteProduct(id: number) {
  const product = await prisma.product.delete({
    where: { ID: id }, // 🔧 removed Number()
  });
  return {
    id: product.ID.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
  };
}

export async function searchProducts(query: string) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { name: "asc" },
  });

  return products.map((p) => ({
    id: p.ID.toString(),
    name: p.name,
    price: p.price,
    description: p.description,
    image: p.image,
    stock: p.stock,
  }));
}