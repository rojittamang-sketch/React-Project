import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { itemCount } = useCart()

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Sam<span>Ro</span> Store
        </NavLink>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Catalog
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link cart-link${isActive ? ' active' : ''}`}
          >
            Cart
            <span className="cart-count">{itemCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
