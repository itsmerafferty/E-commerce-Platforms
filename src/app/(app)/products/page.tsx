"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/layout/Container"
import { ProductGrid } from "@/modules/product/components/ProductGrid"
import { ProductFilter } from "@/modules/product/components/ProductFilter"
import { Product } from "@/modules/product/types"
import { Badge } from "@/components/ui/badge" // Import Badge for the UI
import { UserCircle } from "lucide-react" // Import an icon for style

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  
  // 1. Add state for the logged-in user
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // 2. Check for logged in user on page load
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

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
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">
            If you need it, we don't sell it.
          </p>
        </div>

        {/* 3. Personalized Profile Sync */}
        {user && (
          <Badge variant="secondary" className="w-fit py-2 px-4 gap-2 text-sm font-medium">
            <UserCircle className="h-4 w-4 text-primary" />
            Shopping as {user.name}
          </Badge>
        )}
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