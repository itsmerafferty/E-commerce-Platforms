"use client"

import { useState, useEffect } from "react" // Add these
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Search, User, Menu, LogOut } from "lucide-react" // Add LogOut icon
import { Container } from "./Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cartStore"

export function Navbar() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)
  
  // State to store the logged-in user
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is saved in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user") // Clear the data
    setUser(null) // Update UI
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold text-xl">ShopHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Products
              </Link>
              <Link href="/categories" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* --- USER PROFILE SECTION --- */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium">Hi, {user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
            )}
            {/* ---------------------------- */}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}