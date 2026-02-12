import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>

        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive a confirmation email shortly.
        </p>

        <div className="flex flex-col gap-4 pt-4">
          <Link href="/products">
            <Button className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full" size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}
