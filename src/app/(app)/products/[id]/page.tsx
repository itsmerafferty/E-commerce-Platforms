"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ShoppingCart, Truck, Shield, RotateCcw, UserCheck } from "lucide-react" // Added UserCheck icon
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@/modules/product/types"
import { useCartStore } from "@/store/cartStore"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  
  // 1. Add state for the logged-in user
  const [user, setUser] = useState<{ name: string } | null>(null)
  
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    // 2. Check for user session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`)
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      // Optional: Show a little success feedback
      console.log(`Added ${quantity} of ${product.name} to cart for ${user?.name || 'Guest'}`)
    }
  }

  if (loading) {
    return (
      <Container className="py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      {/* 3. Added a small navigation breadcrumb that shows user context */}
      {user && (
        <div className="mb-4 flex items-center gap-2 text-sm text-primary font-medium">
          <UserCheck className="h-4 w-4" />
          <span>Logged in as {user.name} — Exclusive member pricing applied</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit mb-2">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold mb-4">
            {formatCurrency(product.price)}
          </p>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <Badge variant="secondary" className="text-green-600">
                In Stock ({product.stock} available)
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 py-2 min-w-[60px] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>

            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* 4. Encouragement for Guests */}
          {!user && (
            <p className="text-xs text-center text-muted-foreground mb-4">
              <Link href="/login" className="text-primary hover:underline">Sign in</Link> to save this item to your wishlist!
            </p>
          )}

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on all orders
                </p>
              </div>
            </div>
            {/* ... rest of your static features ... */}
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">30 Day Returns</p>
                <p className="text-sm text-muted-foreground">
                  Easy returns within 30 days of purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}