"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Product } from "../types"
import { useCartStore } from "@/store/cartStore"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {product.stock < 10 && product.stock > 0 && (
              <Badge
                variant="destructive"
                className="absolute right-2 top-2"
              >
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge
                variant="secondary"
                className="absolute right-2 top-2"
              >
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="p-4">
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-1 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {product.description}
            </p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
