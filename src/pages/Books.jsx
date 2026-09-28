import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MediaGrid from "../components/MediaGrid";
import { searchBooks } from "../services/bookApi";
import { sortItems, filterByCategory, uniqueCategories, mergeUnique } from "../utils/helpers";

const DEFAULT_QUERY = "subject:fiction";

export default function Books({ onView, isSaved }) {
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get("q") || "";
  const [input, setInput] = useState(urlQuery);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const activeQuery = urlQuery || DEFAULT_QUERY;

  useEffect(() => { setInput(urlQuery); setPage(1); setCategory(""); }, [urlQuery]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    searchBooks(activeQuery, page, { sort: urlQuery ? "" : "rating" })
      .then((r) => {
        if (cancelled) return;
        setItems((prev) => (page === 1 ? r.items : mergeUnique(prev, r.items)));
        setTotal(r.total);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        if (page === 1) setItems([]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [activeQuery, page]);

  const handleSearch = () => {
    const q = input.trim();
    setPage(1);
    setCategory("");
    setParams(q ? { q } : {});
  };

  // Category options are built from the results we actually received.
  const visible = sortItems(filterByCategory(items, category), sort);

  return (
    <div className="container page">
      <h1 className="page-title">Books</h1>
      <p className="page-sub">{urlQuery ? `Results for “${urlQuery}”` : "Popular reads to get you started"}</p>
      <SearchBar value={input} onChange={setInput} onSubmit={handleSearch} placeholder="Search books by title or author">
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {uniqueCategories(items).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort results">
          <option value="relevance">Best match</option>
          <option value="title-asc">Title A–Z</option>
          <option value="year-desc">Newest first</option>
          <option value="year-asc">Oldest first</option>
        </select>
      </SearchBar>
      <MediaGrid items={visible} loading={loading} error={error} onView={onView} isSaved={isSaved}
        emptyTitle="No books found" emptyText="Try another title, author, or keyword." />
      {items.length > 0 && items.length < total && (
        <div className="center">
          <button className="btn btn-ghost" disabled={loading} onClick={() => setPage(page + 1)}>
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
