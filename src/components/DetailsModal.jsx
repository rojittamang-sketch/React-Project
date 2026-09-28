import { useState, useEffect, useRef } from "react";
import { X, Bookmark, Trash2, Star, Film, BookOpen } from "lucide-react";
import { getMovieDetails } from "../services/movieApi";
import { getBookDetails } from "../services/bookApi";

// One reusable component for both movies and books.
// Props: item, saved, onClose, onAdd, onRemove (callbacks go child -> parent).
export default function DetailsModal({ item, saved, onClose, onAdd, onRemove }) {
  const [detail, setDetail] = useState(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const closeRef = useRef(null);
  const isMovie = item.kind === "movie";

  // Movies from search results only have basic info, so we fetch the full details.
  useEffect(() => {
    if (item.detailed) return;
    let cancelled = false;
    setLoading(true);
    (isMovie ? getMovieDetails(item.id) : getBookDetails(item))
      .then((d) => !cancelled && setDetail({ ...item, ...d }))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [item, isMovie]);

  // Close on Escape, lock page scrolling while open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const rows = (isMovie
    ? [["Released", detail.released], ["Director", detail.director], ["Actors", detail.actors], ["Genre", detail.genre], ["Runtime", detail.runtime], ["Rated", detail.rated]]
    : [["Authors", detail.authors?.join(", ")], ["Publisher", detail.publisher], ["Published", detail.publishedDate], ["Categories", detail.categories?.join(", ")], ["Pages", detail.pageCount]]
  ).filter(([, v]) => v);

  const summary = isMovie ? detail.plot : detail.description;
  const Icon = isMovie ? Film : BookOpen;
  const listName = isMovie ? "Watchlist" : "Reading List";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={detail.title} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close details"><X size={20} /></button>
        <div className="modal-poster">
          {detail.image ? <img src={detail.image} alt={`Cover of ${detail.title}`} />
            : <div className="poster-fallback"><Icon size={40} /><span>No image</span></div>}
        </div>
        <div className="modal-content">
          <span className="chip">{detail.category}</span>
          <h2>{detail.title}</h2>
          <p className="meta">
            <span>{detail.year || "Year unknown"}</span>
            {isMovie && detail.rating && <span className="rating"><Star size={14} fill="currentColor" /> {detail.rating}</span>}
          </p>
          {loading && <p className="muted">Loading full details…</p>}
          {error && <p className="banner-error">{error}</p>}
          <p className="summary">{summary || (loading ? "" : "No description available.")}</p>
          <dl className="facts">
            {rows.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          {saved ? (
            <button className="btn btn-danger" onClick={() => onRemove(detail)}><Trash2 size={16} /> Remove from {listName}</button>
          ) : (
            <button className="btn btn-primary" onClick={() => onAdd(detail)}>
              <Bookmark size={16} /> Add to {listName}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
