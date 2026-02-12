# E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and Zustand.

## Features

- **Product Catalog**: Browse products with category filtering
- **Product Details**: View detailed product information with ratings and reviews
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **Checkout**: Multi-step checkout form with order summary
- **User Authentication**: Login and register pages (mock implementation)
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

## Project Structure

```
src/
  app/
    (app)/
      products/         # Product listing and detail pages
      cart/             # Shopping cart page
      checkout/         # Checkout flow
      login/            # Login page
      register/         # Register page
      order-success/    # Order confirmation
      page.tsx          # Home page
      layout.tsx        # Root layout
    api/
      products/         # Product API routes
  modules/
    product/
      components/       # Product-related components
      types.ts          # Product types
  components/
    ui/                 # Shared UI primitives (Shadcn components)
    layout/             # Layout components (Navbar, Footer)
  lib/
    utils.ts            # Shared utilities
    mockData.ts         # Mock product data
  store/
    cartStore.ts        # Zustand cart store
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/itsmerafferty/E-commerce-Platforms.git
cd E-commerce-Platforms
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

### Product Catalog
- Grid view with product cards
- Category filtering (Electronics, Footwear, Home, Sports, Accessories)
- Product images, ratings, and stock information
- Add to cart directly from product cards

### Shopping Cart
- View all cart items
- Update quantities or remove items
- Price calculations with tax
- Persistent cart using localStorage
- Empty cart state

### Checkout
- Multi-step form (contact, shipping, payment)
- Order summary with itemized pricing
- Form validation
- Mock payment processing

### Authentication
- Login page with email/password
- Registration page with validation
- Remember me functionality
- Password confirmation

## Mock Data

The platform uses mock data for products. Product data is located in `src/lib/mockData.ts` and includes:
- 12 sample products across multiple categories
- Product images from Unsplash
- Realistic pricing and stock information

## Future Enhancements

- Real backend integration with database
- User authentication with NextAuth.js
- Order history and user profile
- Product search functionality
- Wishlist feature
- Product reviews and ratings
- Payment gateway integration (Stripe/PayPal)
- Admin dashboard for product management
- Email notifications
- Analytics and tracking

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License

MIT

## Author

**Rafferty**
- GitHub: [@itsmerafferty](https://github.com/itsmerafferty)
