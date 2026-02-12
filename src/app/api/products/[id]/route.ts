import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mockData"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
