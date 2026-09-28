export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h3 className="product-name" style={{ marginBottom: 4 }}>
          {item.name}
        </h3>
        <p className="product-price" style={{ marginBottom: 8 }}>
          ${item.price.toFixed(2)}
        </p>
        <div className="qty-control">
          <button type="button" onClick={() => onUpdateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
            −
          </button>
          <span>{item.qty}</span>
          <button type="button" onClick={() => onUpdateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button type="button" className="remove-link" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
      <p className="product-price">${(item.price * item.qty).toFixed(2)}</p>
    </div>
  )
}
