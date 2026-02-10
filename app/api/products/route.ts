import { NextResponse,NextRequest } from 'next/server'
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '@/lib/products'


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get("id")
    const search = searchParams.get("search")
    if (id) {
      const numericId = Number(id)

      if (isNaN(numericId)) {
        return NextResponse.json(
          { success: false, products: [] },
          { status: 400 }
        )
      }

      const product = await getProductById(numericId)

      if (!product) {
        return NextResponse.json(
          { success: false, products: [] },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        products: [product],
      })
    }
    if (search) {
      const products = await searchProducts(search)

      return NextResponse.json({
        success: true,
        products,
      })
    }
    const products = await getAllProducts()

    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { success: false, products: [] },
      { status: 500 }
    )
  }
}


export async function POST(req: Request) {

  try{
    const response = await req.json()

  if (!response.name || response.price === undefined) {
    return NextResponse.json(
      { error: 'Name and price are required' },
      { status: 400 }
    )
  }

  const product = await addProduct({
    name: response.name,
    description: response.description,
    image: response.image,
    price: Number(response.price),
    stock: response.stock,
  })

  return NextResponse.json(
    {
      success: true,
      message:"Product is added successfully",
      product
    }, 
      { status: 201 }
    )

  }catch(error:any){
    console.log(error.message)

    return NextResponse.json({
      success:false,
      message:"Unable to add the product successfully! Please try again"
    },{
      status:400
    })
  }
}
  

export async function PUT(req: Request) {

  try{
      const response = await req.json()
      const updatedProduct = await updateProduct(response.ID, response)


      if(updatedProduct){

          return NextResponse.json({
            success:true,
            message:"Product is being updated successfully"

          },{status:200})
      }

  }catch(error:any){
    console.log(error.message)
    
    return NextResponse.json({
      success:false,
      message:"Unable to update product successfully! Please try again"

    },{status:404})

  }
  
}


export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID must be available please" }, { status: 400 });

    const deleted = await deleteProduct(id);

    return NextResponse.json({
      success: true,
      message: "Product is deleted successfully",
      product: deleted,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      success: false, 
      message: "Unable to delete product successfully! Please try again" }, { status: 400 });
  }
}
