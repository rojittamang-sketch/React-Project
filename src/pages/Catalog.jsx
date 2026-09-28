import { useState, useEffect, useMemo } from 'react'
import ProductGrid from '../components/ProductGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import SortSelect from '../components/SortSelect.jsx'
import Spinner from '../components/Spinner.jsx'
import allProducts from '../data/products.js'

const CATEGORIES = ['All', 'Kitchen', 'Home', 'Apparel']

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')

  // Simulates fetching the catalog from a server. In a real project this
  // effect would call fetch()/axios against a products API instead.
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setProducts(allProducts)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const visibleProducts = useMemo(() => {
    let result = products

    if (category !== 'All') {
      result = result.filter((product) => product.category === category)
    }

    if (search.trim() !== '') {
      const query = search.trim().toLowerCase()
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    }

    const sorted = [...result]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name))

    return sorted
  }, [products, category, search, sort])

  return (
    <>
      <section className="hero">
        <div>
          <h1>Everyday things, made to last.</h1>
          <p>
            SamRo Store curates small-batch kitchen, home and apparel pieces
            from makers who care about materials as much as you do.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="toolbar">
          <CategoryFilter
            categories={CATEGORIES}
            active={category}
            onSelect={setCategory}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <SearchBar value={search} onChange={setSearch} />
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        {loading ? (
          <Spinner label="Loading the catalog..." />
        ) : (
          <ProductGrid products={visibleProducts} />
        )}
      </div>
    </>
  )
}
