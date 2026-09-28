import { SearchX, TriangleAlert } from "lucide-react";
import MediaCard from "./MediaCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

// Conditional rendering decides what to show: loading, error, empty, or the cards.
export default function MediaGrid({ items, loading, error, onView, isSaved, onRemove, emptyTitle, emptyText }) {
  if (loading && items.length === 0) return <Loading />;
  if (error && items.length === 0)
    return <EmptyState icon={TriangleAlert} tone="error" title="Couldn't load results" text={error} />;
  if (items.length === 0)
    return <EmptyState icon={SearchX} title={emptyTitle || "Nothing found"} text={emptyText || "Try a different search."} />;

  return (
    <>
      {error && <p className="banner-error" role="alert">{error}</p>}
      <div className="grid">
        {/* .map() renders one card per item; key must be unique */}
        {items.map((item) => (
          <MediaCard key={`${item.kind}-${item.id}`} item={item} saved={isSaved(item)} onView={onView} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
}
