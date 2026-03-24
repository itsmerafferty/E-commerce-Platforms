"use client" // Added to enable reading localStorage

import { useEffect, useState } from "react" // Added for state management
import Link from "next/link"
import { ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // Ensure you have this UI component
import { ProductGrid } from "@/modules/product/components/ProductGrid"
import { mockProducts } from "@/lib/mockData"

export default function HomePage() {
  const [userName, setUserName] = useState<string | null>(null)
  const featuredProducts = mockProducts.slice(0, 4)

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserName(user.name)
    }
  }, [])

  return (
    <div>
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Personalized Badge for Logged In Users */}
              {userName && (
                <Badge variant="outline" className="px-4 py-1 border-primary text-primary animate-in fade-in slide-in-from-left-4 duration-500">
                  Welcome back, {userName}! 👋
                </Badge>
              )}

              <h1 className="text-5xl font-bold leading-tight">
                Discover Amazing Products at Unbeatable Prices
              </h1>
              <p className="text-xl text-muted-foreground">
                Shop the latest trends in electronics, fashion, home goods, and more. Free shipping on all orders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                {/* If not logged in, show a Register button. If logged in, show Deals. */}
                {!userName && (
                   <Link href="/register">
                   <Button size="lg" variant="outline">
                     Create Account
                   </Button>
                 </Link>
                )}
                <Link href="/deals">
                  <Button size="lg" variant="ghost">
                    View Deals
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-blue-200" />
                <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-purple-200" />
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-100 to-pink-200" />
                <div className="aspect-square rounded-lg bg-gradient-to-br from-green-100 to-green-200" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Free standard shipping on all orders, no minimum required
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">
                Your payment information is processed securely
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Easy Returns</h3>
              <p className="text-muted-foreground text-sm">
                30-day return policy on all items, no questions asked
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Check out our most popular items
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
            <p className="text-primary-foreground/90">
              Get exclusive deals, product updates, and be the first to know about new arrivals.
            </p>
            <div className="flex gap-2 max-w-md mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}