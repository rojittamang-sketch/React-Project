import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Cart persists across refreshes via localStorage (stretch goal).
  const [items, setItems] = useLocalStorage('samro-cart', [])

  function addToCart(product) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...current, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(productId) {
    setItems((current) => current.filter((item) => item.id !== productId))
  }

  function updateQty(productId, qty) {
    if (qty < 1) {
      removeFromCart(productId)
      return
    }
    setItems((current) =>
      current.map((item) => (item.id === productId ? { ...item, qty } : item))
    )
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items]
  )

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    itemCount,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
