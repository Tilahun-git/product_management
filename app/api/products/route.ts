import { NextResponse, NextRequest } from "next/server";
import {
  getAllProducts,
  addProduct,
  searchProducts
} from "@/lib/products";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    if (search) {
      const products = await searchProducts(search);
      return NextResponse.json({ success: true, products });
    }

    const products = await getAllProducts();
    return NextResponse.json({ success: true, products });

  } catch (error) {
    return NextResponse.json(
      { success: false, products: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || body.price === undefined) {
      return NextResponse.json(
        { error: "Name and price required" },
        { status: 400 }
      );
    }

    const product = await addProduct({
      name: body.name,
      description: body.description,
      image: body.image,
      price: Number(body.price),
      stock: body.stock,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Add failed" },
      { status: 400 }
    );
  }
}