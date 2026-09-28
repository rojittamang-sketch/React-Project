import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import CartItem from '../components/CartItem.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function CartPage() {
  const { items, updateQty, removeFromCart, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <EmptyState
          title="Your cart is empty"
          message="Browse the catalog and add something you like."
          action={
            <Link to="/" className="primary-btn" style={{ display: 'inline-block', width: 'auto', padding: '10px 22px', marginTop: 12 }}>
              Back to catalog
            </Link>
          }
        />
      </div>
    )
  }

  const shipping = total >= 60 || total === 0 ? 0 : 6
  const grandTotal = total + shipping

  return (
    <div className="cart-page">
      <div>
        <h2>Your cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h2>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <aside className="summary-card">
        <h3>Order summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="primary-btn">
          Checkout
        </Link>
      </aside>
    </div>
  )
}
