# Mobiversite E-Commerce

Mobiversite is a **Next.js 15 E-Commerce project** built with **JavaScript** and **TailwindCSS**.  
It demonstrates a modern, accessible, and user-friendly online store experience.

---

## First of All

This repository demonstrates the **FakeStore API-based solution** for the Mobiversite assignment.  
However, a separate zipped project is also included, which contains the **JSON Server-based implementation** with:

- Local **JSON Server** setup (`/products`, `/users`, `/orders`)
- Full **register + login** flow (user creation & cookie-based authentication)
- Middleware-protected routes for `/profile`, `/wishlist`, and order-related APIs

➡️ In that version, you can simply run:

```bash
npm run server
```

This will start the JSON Server at http://localhost:5000
, serving all endpoints locally with persistent data.

## Features

- **Authentication** (Login / Logout) with cookies + middleware route protection
- **Global state management** using React **Context API**
- **Persistent Cart & Wishlist** stored in cookies/local state
- **Product listing** with real API integration (`fakestoreapi.com`)
- **Responsive design** (hamburger navigation, banners, testimonials, etc.)
- **Checkout flow** with order history shown in Profile
- **Thank You page** after checkout with order ID
- **Accessibility checked** with **Lighthouse** and **WAVE Tool** → all scored **96+** (only some design-related contrast issues)

---

## Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/mobiversite.git
cd mobiversite-ecommerce
npm install
```

Start the **Next.js development server**:

```bash
npm run dev
```

The app will run on **http://localhost:3000**.  
Products, carts, and user data are fetched from **[FakeStoreAPI](https://fakestoreapi.com/)**.

---

## Design Decisions & Trade-offs

- **TailwindCSS** for rapid prototyping and consistency.
- **FakeStore API** chosen instead of `json-server` for smoother **Vercel deployment** (no external DB hosting needed).
- **Context API vs Redux**: Context chosen for simplicity and smaller project scope.
- **Accessibility** tested with **Lighthouse** and **WAVE Tool**.
- **Register flow removed** because FakeStore doesn’t support new user creation. Authentication works with provided demo accounts.

---

## Authentication

- **Login** authenticates against FakeStore API’s `/auth/login`.
- Session is stored as a cookie (`js-cookie`).
- **Middleware** (`middleware.js`) protects `/profile` and `/wishlist` routes.
- **Logout** clears cookies and resets context state.

---

## State Management

- **AuthContext** → Manages login/logout flows and cookies.
- **CartContext** → Holds cart items, updates quantities, persists state.
- **WishlistContext** → Manages wishlist add/remove actions.
- Toast notifications (`react-hot-toast`) confirm add/remove actions.

---

## API Communication

- **Axios** is used for all API requests.
- Base URL is configurable via `NEXT_PUBLIC_API_URL`.
- By default, project uses **FakeStore API** (`https://fakestoreapi.com`).

---

## User Case Scenario

1. A visitor opens the homepage and sees **banner promotions**, **new arrivals**, and **customer testimonials**.
2. They browse **Products**, add some items to **Wishlist** and **Cart**.
3. They log in with FakeStore demo credentials (see below).
4. They go to **Cart**, adjust quantities, and press **Checkout**.
5. They are redirected to a **Thank You page** with their order ID.
6. Returning later, they log in again and see their past **Orders** in **Profile**.

---

## 🔐 Demo Login Accounts

Use these test accounts from **FakeStore API**:

- **User 1**

  - Username: `mor_2314`
  - Password: `83r5^_`

- **User 2**
  - Username: `johnd`
  - Password: `m38rmF$`

---

## Accessibility & Performance

- **Lighthouse scores:** 96+
- **WAVE Tool results:**
  - Accessibility: **96+**
  - Only _minor contrast/design issues_
  - No structural or semantic accessibility issues

---

## Conclusion

Mobiversite is a **modern, responsive, and user-friendly e-commerce demo** with strong accessibility, clear architecture, and practical design features.  
It shows how to combine **Next.js app router**, **Context API**, **Axios**, and **FakeStore API** into a cohesive project.

---
