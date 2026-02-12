"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { Container } from "./Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cartStore"

export function Navbar() {
  const items = useCartStore((state) => state.items)
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold text-xl">PriceHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/products"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Deals
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}
