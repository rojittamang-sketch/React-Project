import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MediaGrid from "../components/MediaGrid";
import { searchMovies } from "../services/movieApi";
import { sortItems, mergeUnique } from "../utils/helpers";

const DEFAULT_QUERY = "avengers"; // shown before the user searches

export default function Movies({ onView, isSaved }) {
  const [params, setParams] = useSearchParams(); // keeps ?q= in the URL
  const urlQuery = params.get("q") || "";
  const [input, setInput] = useState(urlQuery);
  const [type, setType] = useState("");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const activeQuery = urlQuery || DEFAULT_QUERY;

  // Keep the input in sync when the URL changes (e.g. from the Home search).
  useEffect(() => { setInput(urlQuery); setPage(1); }, [urlQuery]);

  // Fetch whenever the query, type filter, or page changes.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    searchMovies(activeQuery, { type, page })
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
  }, [activeQuery, type, page]);

  const handleSearch = () => {
    const q = input.trim();
    setPage(1);
    setParams(q ? { q } : {});
  };

  return (
    <div className="container page">
      <h1 className="page-title">Movies</h1>
      <p className="page-sub">{urlQuery ? `Results for “${urlQuery}”` : "Popular picks to get you started"}</p>
      <SearchBar value={input} onChange={setInput} onSubmit={handleSearch} placeholder="Search movies by title">
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} aria-label="Filter by type">
          <option value="">All types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort results">
          <option value="relevance">Best match</option>
          <option value="title-asc">Title A–Z</option>
          <option value="year-desc">Newest first</option>
          <option value="year-asc">Oldest first</option>
        </select>
      </SearchBar>
      <MediaGrid items={sortItems(items, sort)} loading={loading} error={error} onView={onView} isSaved={isSaved}
        emptyTitle="No movies found" emptyText="Check the spelling or try a shorter title." />
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
