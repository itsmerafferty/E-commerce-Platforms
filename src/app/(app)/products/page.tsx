"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/layout/Container"
import { ProductGrid } from "@/modules/product/components/ProductGrid"
import { ProductFilter } from "@/modules/product/components/ProductFilter"
import { Product } from "@/modules/product/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const url =
          selectedCategory === "all"
            ? "/api/products"
            : `/api/products?category=${selectedCategory}`
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          If you need it, we don't sell it.
        </p>
      </div>

      <div className="mb-6">
        <ProductFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </Container>
  )
}
