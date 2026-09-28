import { useLocation, Navigate, Link } from 'react-router-dom'

export default function OrderConfirmation() {
  const location = useLocation()
  const orderInfo = location.state

  // If someone lands here directly without placing an order, send them home.
  if (!orderInfo) {
    return <Navigate to="/" replace />
  }

  const { orderId, name, total } = orderInfo

  return (
    <div className="confirmation-page">
      <div className="confirmation-mark">✓</div>
      <h2>Thank you, {name.split(' ')[0]}.</h2>
      <p style={{ color: 'var(--color-ink-soft)' }}>
        Your order has been placed and a confirmation will be sent to your email shortly.
      </p>
      <p className="order-id">Order {orderId}</p>
      <p style={{ color: 'var(--color-ink-soft)' }}>Total charged: ${total.toFixed(2)}</p>
      <Link to="/" className="primary-btn" style={{ display: 'inline-block', width: 'auto', padding: '10px 24px', marginTop: 20 }}>
        Continue shopping
      </Link>
    </div>
  )
}
