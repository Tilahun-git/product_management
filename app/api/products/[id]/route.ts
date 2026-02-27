import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/products";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("raw id =", id);

    const numId = Number(id);
    console.log("parsed id =", numId);

    if (!numId || isNaN(numId)) {
      return NextResponse.json(
        { success: false, product: null },
        { status: 400 }
      );
    }

    const product = await getProductById(numId);

    if (!product) {
      return NextResponse.json(
        { success: false, product: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);
    const body = await req.json();

    const updated = await updateProduct(numId, body);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updated,
    });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numId = Number(id);

    const deleted = await deleteProduct(numId);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      product: deleted,
    });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}