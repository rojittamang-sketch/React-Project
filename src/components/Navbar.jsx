import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Film, Menu, X } from "lucide-react";

// Props: savedCount (number) is passed down from App to show a badge.
export default function Navbar({ savedCount }) {
  const [open, setOpen] = useState(false); // mobile menu state
  const links = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/books", label: "Books" },
    { to: "/library", label: "My Library" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark"><Film size={18} /></span>
          CineShelf
        </Link>
        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
              {l.to === "/library" && savedCount > 0 && <span className="badge">{savedCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
