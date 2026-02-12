import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mockData"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  let products = mockProducts

  if (category && category !== "all") {
    products = mockProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    )
  }

  return NextResponse.json(products)
}
