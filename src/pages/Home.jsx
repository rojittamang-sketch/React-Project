import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import MediaGrid from "../components/MediaGrid";
import { searchMovies } from "../services/movieApi";
import { searchBooks } from "../services/bookApi";

// Small custom hook: runs a fetch function once and tracks loading/error state.
function useFeatured(fetcher) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((r) => !cancelled && setItems(r.items.slice(0, 6)))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);
  return { items, loading, error };
}

export default function Home({ onView, isSaved }) {
  const movies = useFeatured(() => searchMovies("batman"));
  const books = useFeatured(() => searchBooks("subject:fiction", 1, { sort: "rating" }));

  return (
    <>
      <Hero />
      <div className="container">
        <section className="section">
          <div className="section-head"><h2>Featured movies</h2><Link to="/movies">Browse all movies</Link></div>
          <MediaGrid {...movies} onView={onView} isSaved={isSaved} emptyTitle="No featured movies" />
        </section>
        <section className="section">
          <div className="section-head"><h2>Popular books</h2><Link to="/books">Browse all books</Link></div>
          <MediaGrid {...books} onView={onView} isSaved={isSaved} emptyTitle="No featured books" />
        </section>
      </div>
    </>
  );
}
