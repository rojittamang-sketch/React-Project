export default function ProductCard({ product, isInCart, onAdd }) {
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button
        type="button"
        className={`add-btn${isInCart ? ' in-cart' : ''}`}
        onClick={() => onAdd(product)}
      >
        {isInCart ? 'Added ✓' : 'Add to cart'}
      </button>
    </div>
  )
}
