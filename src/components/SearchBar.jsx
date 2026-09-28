export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search products..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Search products"
    />
  )
}
