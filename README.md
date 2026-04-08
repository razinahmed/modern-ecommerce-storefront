<div align="center">

# 🛒 Modern Next.js E-Commerce Storefront

<img src="https://placehold.co/900x250/1e1e2e/ec4899.png?text=Next.js+%2B+Tailwind+CSS+%2B+Stripe+Checkout" alt="E-Commerce Storefront Banner" />

<br/>

**A beautifully designed, headless e-commerce starter template built with Next.js 14, TailwindCSS, Stripe Checkout, and shadcn/ui — ready for production deployment.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ec4899?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

[Features](#-features) · [Screenshots](#-screenshots) · [Quick Start](#-quick-start) · [Deployment](#-deployment) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Stripe Integration](#-stripe-integration)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 About

**Modern E-Commerce Storefront** is a fully functional, headless commerce template designed for developers who want a production-ready starting point. Built with the latest **Next.js 14 App Router**, it leverages server components for blazing-fast page loads, **Stripe Checkout** for secure payments, and **Tailwind CSS** for a pixel-perfect responsive design. Whether you are building a boutique shop or a large-scale marketplace, this template scales with your needs.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Next.js 14 App Router** | Server components, streaming SSR, and optimized SEO out of the box |
| **Stripe Checkout** | PCI-compliant payment processing with webhook support for order fulfillment |
| **shadcn/ui Components** | Beautiful, accessible, and fully customizable UI components |
| **Zustand Cart** | Lightweight, performant client-side cart state management |
| **Responsive Design** | Mobile-first layouts that look stunning on every device |
| **Product Catalog** | Dynamic product pages with image galleries, variants, and pricing |
| **Search & Filters** | Real-time product search with category and price range filtering |
| **Wishlist** | Save favorite products with persistent local storage |
| **Order History** | Track past orders with status updates |
| **Dark Mode** | System-aware theme switching with `next-themes` |
| **SEO Optimized** | Dynamic metadata, Open Graph tags, structured data (JSON-LD) |
| **Type Safe** | End-to-end TypeScript with strict mode enabled |

---

## 📸 Screenshots

<div align="center">

| Homepage | Product Detail | Cart & Checkout |
|:-:|:-:|:-:|
| <img src="https://placehold.co/300x200/1e1e2e/ec4899.png?text=Homepage" alt="Homepage" /> | <img src="https://placehold.co/300x200/1e1e2e/ec4899.png?text=Product+Detail" alt="Product Detail" /> | <img src="https://placehold.co/300x200/1e1e2e/ec4899.png?text=Cart+%26+Checkout" alt="Cart & Checkout" /> |

</div>

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 3.4, shadcn/ui, Radix UI |
| **Payments** | Stripe Checkout, Stripe Webhooks |
| **State** | Zustand |
| **Auth** | NextAuth.js (optional) |
| **Database** | Prisma ORM + PostgreSQL (optional) |
| **Deployment** | Vercel, Docker |
| **Testing** | Vitest, Playwright |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm
- A [Stripe](https://dashboard.stripe.com/register) account (free to create)

### 1. Clone and Install

```bash
git clone https://github.com/razinahmed/modern-ecommerce-storefront.git
cd modern-ecommerce-storefront
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your keys:

```bash
cp .env.example .env.local
```

### 3. Run the Development Server

```bash
npm run dev
```

Browse to `http://localhost:3000` to see your storefront!

### 4. (Optional) Run Stripe Webhook Listener

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Required | Description |
|---|:-:|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key (starts with `pk_`) |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key (starts with `sk_`) |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Webhook signing secret (starts with `whsec_`) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your app URL (e.g., `http://localhost:3000`) |
| `DATABASE_URL` | ❌ | PostgreSQL connection string (if using Prisma) |
| `NEXTAUTH_SECRET` | ❌ | Secret for NextAuth.js session encryption |
| `NEXTAUTH_URL` | ❌ | Canonical URL of your site |

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 💳 Stripe Integration

### How It Works

1. **Product Display** — Products are rendered from local data or your CMS
2. **Add to Cart** — Zustand manages the cart state on the client
3. **Checkout** — A server action creates a Stripe Checkout Session
4. **Payment** — Customer is redirected to Stripe's hosted checkout page
5. **Webhook** — Stripe sends a `checkout.session.completed` event to your API
6. **Fulfillment** — Your webhook handler processes the order and updates the database

### Test Cards

| Card Number | Scenario |
|---|---|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | 3D Secure authentication required |
| `4000 0000 0000 9995` | Payment declined |

---

## 📁 Project Structure

```
modern-ecommerce-storefront/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (shop)/             # Shopping pages (products, categories)
│   │   ├── cart/               # Cart page
│   │   ├── checkout/           # Checkout flow
│   │   ├── api/                # API routes (Stripe webhooks)
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── product/            # Product cards, galleries
│   │   └── cart/               # Cart drawer, cart items
│   ├── lib/                    # Utilities (Stripe client, helpers)
│   ├── store/                  # Zustand state stores
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets and images
├── prisma/                     # Database schema (optional)
├── .env.example                # Environment variable template
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── package.json
├── LICENSE
└── README.md
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/razinahmed/modern-ecommerce-storefront)

1. Click the button above or import from your GitHub repo
2. Add all required environment variables in the Vercel dashboard
3. Deploy — Vercel handles builds, CDN, and SSL automatically

### Deploy with Docker

```bash
docker build -t ecommerce-storefront .
docker run -p 3000:3000 --env-file .env.local ecommerce-storefront
```

### Production Checklist

- [ ] Switch Stripe keys from test mode to live mode
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Configure Stripe webhook endpoint for your production URL
- [ ] Enable rate limiting on API routes
- [ ] Set up error monitoring (Sentry, LogRocket)

---

## 🤝 Contributing

Contributions are welcome! Here is how you can help:

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code passes linting (`npm run lint`) and all tests (`npm test`) before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Crafted with care by [Razin Ahmed](https://github.com/razinahmed)**

If this template saved you time, please consider giving the repo a ⭐

<img src="https://komarev.com/ghpvc/?username=razinahmed&style=flat-square&color=ec4899&label=REPO+VIEWS" alt="Repo Views" />

</div>
