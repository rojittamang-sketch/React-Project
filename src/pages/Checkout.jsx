import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const emptyForm = { name: '', email: '', address: '', city: '' }

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  // Guard: don't allow checking out with nothing in the cart.
  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (!form.address.trim()) nextErrors.address = 'Enter a delivery address.'
    if (!form.city.trim()) nextErrors.city = 'Enter your city.'
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const orderId = `SR-${Math.floor(100000 + Math.random() * 900000)}`
    clearCart()
    navigate('/order-confirmed', { state: { orderId, name: form.name, total } })
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p style={{ color: 'var(--color-ink-soft)', marginTop: -8, marginBottom: 24 }}>
        Total due: <strong>${total.toFixed(2)}</strong>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="address">Delivery address</label>
          <input id="address" name="address" value={form.address} onChange={handleChange} />
          {errors.address && <span className="form-error">{errors.address}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="city">City</label>
          <input id="city" name="city" value={form.city} onChange={handleChange} />
          {errors.city && <span className="form-error">{errors.city}</span>}
        </div>

        <button type="submit" className="primary-btn" style={{ border: 'none' }}>
          Place order
        </button>
      </form>
    </div>
  )
}
