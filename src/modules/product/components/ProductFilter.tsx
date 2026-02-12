"use client"

import { Button } from "@/components/ui/button"

interface ProductFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "electronics", label: "Electronics" },
  { value: "footwear", label: "Footwear" },
  { value: "home", label: "Home" },
  { value: "sports", label: "Sports" },
  { value: "accessories", label: "Accessories" },
]

export function ProductFilter({
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
