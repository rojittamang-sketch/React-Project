import ProductCard from './ProductCard.jsx'
import EmptyState from './EmptyState.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function ProductGrid({ products }) {
  const { items, addToCart } = useCart()

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="Try a different search term or clear your filters."
      />
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isInCart={items.some((item) => item.id === product.id)}
          onAdd={addToCart}
        />
      ))}
    </div>
  )
}
