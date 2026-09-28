# SamRo Store

A mini e-commerce product catalog and shopping cart, built as a React course project (Option 5: Mini E-Commerce Product Catalog & Cart). SamRo Store lets you browse a small curated catalog of home, kitchen and apparel goods, filter and sort it, add items to a cart, and walk through a mock checkout to an order confirmation.

## Features implemented

**Core requirements**
- Product catalog rendered from local mock data (`src/data/products.js`), displayed in a responsive card grid with name, price, category and image.
- Filter products by category (`All / Kitchen / Home / Apparel`) and live search by name.
- Add items to a cart, increase/decrease quantity, and remove items.
- Running cart subtotal, shipping calculation, and grand total shown in an order summary.
- Client-side routing with React Router across four views: Catalog (`/`), Cart (`/cart`), Checkout (`/checkout`), and Order Confirmation (`/order-confirmed`).
- Simulated data fetch on the catalog page (`useEffect` + timeout) with a loading spinner, plus an empty state when a search/filter returns no results.
- Controlled checkout form (name, email, address, city) with `onChange`/`onSubmit` handling and inline validation errors.
- Fully responsive layout — tested down to a 375px mobile width.

**Stretch goals implemented**
- Sort products by price (low→high, high→low) or name (A→Z).
- Cart contents persist across page refreshes using `localStorage` (via a reusable `useLocalStorage` hook).
- A checkout summary / order confirmation screen with a generated order ID.

## Technologies used

- [React 18](https://react.dev/) — functional components and hooks only (`useState`, `useEffect`, `useMemo`, `useContext`)
- [React Router v6](https://reactrouter.com/) — client-side routing
- [Vite](https://vitejs.dev/) — dev server and build tool
- Plain CSS with CSS custom properties (no UI framework), see `src/index.css`
- Browser `localStorage` API for cart persistence
- Product images from [picsum.photos](https://picsum.photos) placeholder service

## Project structure

```
samro-store/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # entry point, wraps app in Router + CartProvider
    ├── App.jsx                # route definitions
    ├── index.css              # design tokens + global styles
    ├── data/
    │   └── products.js        # mock product catalog
    ├── context/
    │   └── CartContext.jsx    # cart state + actions, shared via Context
    ├── hooks/
    │   └── useLocalStorage.js # generic localStorage-backed state hook
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductGrid.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── SortSelect.jsx
    │   ├── CartItem.jsx
    │   ├── EmptyState.jsx
    │   └── Spinner.jsx
    └── pages/
        ├── Catalog.jsx
        ├── CartPage.jsx
        ├── Checkout.jsx
        └── OrderConfirmation.jsx
```

## Setup instructions

1. Make sure you have [Node.js](https://nodejs.org/) 18+ installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:
```bash
npm run build
npm run preview
```

## Screenshots

> Add 2–3 screenshots here before submitting, for example:
>
> ![Catalog page](./screenshots/catalog.png)
> ![Cart page](./screenshots/cart.png)
> ![Checkout page](./screenshots/checkout.png)

Run the app locally with `npm run dev`, take screenshots of the Catalog, Cart, and Checkout/Confirmation screens, save them into a `screenshots/` folder in the project root, and update the paths above — the assignment requires these in the final submission.

## Known limitations

- Product data is static/local rather than pulled from a live product API (this matches the "local mock data" option allowed for this project type).
- Checkout does not process real payments — it's a front-end-only mock flow that ends in an order confirmation screen.
- There is no user authentication or persistent order history beyond the current browser's localStorage.

## Notes for submission

Before pushing to GitHub, remember to:
- Make incremental commits (8–10+) as you build each piece, rather than one large commit.
- Add real screenshots as described above.
- Optionally deploy to Vercel/Netlify/GitHub Pages and add the live link here.
