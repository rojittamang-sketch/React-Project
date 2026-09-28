export default function SortSelect({ value, onChange }) {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort products"
    >
      <option value="default">Sort: Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
    </select>
  )
}
