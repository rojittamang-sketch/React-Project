export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="filter-row">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`chip${active === category ? ' active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
