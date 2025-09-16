# Mobiversite E-Commerce

Mobiversite is a **Next.js 13+ E-Commerce demo project** built with **JavaScript (no TypeScript)**, **TailwindCSS + custom SCSS**, and a **JSON Server backend**.  
It demonstrates a modern, accessible, and user-friendly online store experience.

---

## Features

- **Authentication** (Register / Login / Logout) with cookies  
- **Global state management** using React **Context API**  
- **Persistent Card & Wishlist** stored in cookies/local state  
- **Product listing** with pagination (`Show More` button)  
- **Responsive design** (hamburger navigation, banners, testimonials, etc.)  
- **Checkout flow** with order history saved per user  
- **Thank You page** after checkout with order ID  
- **Accessibility checked** with **Lighthouse** and **WAVE Tool** → only minor *design-related* issues, accessibility in all pages scored **96+**. (only some contrast design issues)  

---

##  Installation & Setup

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

Start the **JSON server** (backend API):

```bash
npm run server
```

The JSON server will run on **http://localhost:5000**, serving:
- `/products` → product catalog
- `/users` → registered users
- `/orders` → placed orders

---

---

## Design Decisions & Trade-offs

- **TailwindCSS + SCSS**:  
  Tailwind was used for rapid prototyping and consistency, while SCSS handled custom responsive rules (e.g., media queries for `max-width: 991px`).  
- **JSON Server instead of full backend**:  
  Lightweight, fast to set up, easy to mock real API behavior.  
- **Context API vs Redux**:  
  Chosen for simplicity and smaller project scope. It avoids boilerplate while still allowing global state management.  
- **Accessibility**:  
  Tested with **Lighthouse** (Performance, Accessibility, Best Practices, SEO all scored 96+).  
  WAVE reports only **design-related contrast issues**, no functional accessibility problems.  
- **Code Desing and Reusability**:  

---

##  Authentication

- Registration creates a new user in `/users` with a **stringified `id`**, `orders`, and `wishlist`.  
- Login stores user info in cookies (`js-cookie`).  
- Logout clears cookies and resets context state.  
- Profile page fetches fresh user data from the backend by `id`.

---

## State Management

- **AuthContext** → Manages login, logout, and register flows.  
- **CardContext** → Holds card items, updates quantities, persists state.  
- **WishlistContext** → Manages wishlist add/remove actions.  
- Toast notifications (`react-hot-toast`) confirm add/remove actions.  

---

## API Communication

- **Axios** is used for all requests to the JSON server.  

---

##  User Case Scenario

1. A visitor opens the homepage and sees **banner promotions**, **new arrivals**, and **customer testimonials**.  
2. They browse **Products**, add some items to **Wishlist** and **Card**.  
3. They **register an account**, then log in automatically.  
4. They go to **Card**, adjust quantities, and press **Checkout**.  
5. They are redirected to a **Thank You page** with their order ID.  
6. Returning later, they log in again and see all their past **Orders** in **Profile**.  
---

## 📊 Accessibility & Performance

- **Lighthouse scores:**  
- **WAVE Tool results:**  
  - Accessibility: **96+**  
  - Only *minor contrast/design issues*  
  - No structural or semantic accessibility issues  

---

## ✅ Conclusion

Mobiversite is a **modern, responsive, and user-friendly e-commerce demo** with strong accessibility, clear architecture, and practical design features.  
It shows how to combine **Next.js app router**, **Context API**, **Axios**, and **JSON Server** into a cohesive project.
