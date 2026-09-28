import { useState } from "react";
import { Film, BookOpen, BookmarkCheck, Trash2 } from "lucide-react";

// Props: item (data), saved (boolean), onView (callback), onRemove (optional callback).
export default function MediaCard({ item, saved, onView, onRemove }) {
  const [imgFailed, setImgFailed] = useState(false); // handles missing or broken images
  const Icon = item.kind === "movie" ? Film : BookOpen;

  return (
    <article className="card">
      <div className="poster">
        {item.image && !imgFailed ? (
          <img src={item.image} alt={`Cover of ${item.title}`} loading="lazy" onError={() => setImgFailed(true)} />
        ) : (
          <div className="poster-fallback"><Icon size={34} /><span>No image</span></div>
        )}
        {saved && <span className="saved-flag"><BookmarkCheck size={14} /> Saved</span>}
      </div>
      <div className="card-body">
        <h3 title={item.title}>{item.title}</h3>
        <p className="meta">
          <span>{item.year || "Year unknown"}</span>
          <span className="chip">{item.category}</span>
        </p>
        <div className="card-actions">
          <button className="btn btn-ghost" onClick={() => onView(item)}>View Details</button>
          {onRemove && (
            <button className="icon-btn danger" onClick={() => onRemove(item)} aria-label={`Remove ${item.title}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
