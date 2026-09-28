import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, BookMarked } from "lucide-react";
import MediaGrid from "../components/MediaGrid";
import EmptyState from "../components/EmptyState";
import { sortItems, filterByCategory, uniqueCategories } from "../utils/helpers";

export default function MyLibrary({ watchlist, readingList, onView, onRemove }) {
  const [sort, setSort] = useState("title-asc");
  const [category, setCategory] = useState("");
  const all = [...watchlist, ...readingList];
  const arrange = (list) => sortItems(filterByCategory(list, category), sort);
  const always = () => true; // everything on this page is saved

  const section = (title, list, Icon, emptyText, linkTo, linkLabel) => (
    <section className="section">
      <div className="section-head"><h2>{title}</h2><span className="muted">{list.length} saved</span></div>
      {list.length === 0 ? (
        <EmptyState icon={Icon} title={`${title} is empty`} text={emptyText}>
          <Link className="btn btn-primary" to={linkTo}>{linkLabel}</Link>
        </EmptyState>
      ) : (
        <MediaGrid items={arrange(list)} loading={false} error="" onView={onView} onRemove={onRemove} isSaved={always}
          emptyTitle="Nothing in this category" emptyText="Pick another category to see more." />
      )}
    </section>
  );

  return (
    <div className="container page">
      <h1 className="page-title">My Library</h1>
      <p className="page-sub">Everything you saved stays here, even after you refresh.</p>
      {all.length > 0 && (
        <div className="searchbar">
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="">All categories</option>
            {uniqueCategories(all).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort saved items">
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="year-desc">Newest first</option>
            <option value="year-asc">Oldest first</option>
          </select>
        </div>
      )}
      {section("My Watchlist", watchlist, Clapperboard, "Find a movie you want to watch and add it here.", "/movies", "Find movies")}
      {section("My Reading List", readingList, BookMarked, "Find a book you want to read and add it here.", "/books", "Find books")}
    </div>
  );
}
