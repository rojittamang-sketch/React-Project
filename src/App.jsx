import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailsModal from "./components/DetailsModal";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Books from "./pages/Books";
import MyLibrary from "./pages/MyLibrary";
import NotFound from "./pages/NotFound";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  // Saved lists live here (top level) so every page shares the same data.
  const [watchlist, setWatchlist] = useLocalStorage("cineshelf-watchlist", []);
  const [readingList, setReadingList] = useLocalStorage("cineshelf-reading", []);
  const [selected, setSelected] = useState(null); // item shown in the details modal
  const [toast, setToast] = useState("");

  const listFor = (item) => (item.kind === "movie" ? watchlist : readingList);
  const isSaved = (item) => listFor(item).some((i) => i.id === item.id);

  // Auto-hide the confirmation message after a moment.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = (item) => {
    const setList = item.kind === "movie" ? setWatchlist : setReadingList;
    const name = item.kind === "movie" ? "Watchlist" : "Reading List";
    if (isSaved(item)) return setToast(`Already in your ${name}`); // no duplicates
    setList((prev) => [...prev, item]);
    setToast(`Added “${item.title}” to your ${name}`);
  };

  const removeItem = (item) => {
    const setList = item.kind === "movie" ? setWatchlist : setReadingList;
    setList((prev) => prev.filter((i) => i.id !== item.id));
    setToast(`Removed “${item.title}”`);
  };

  const closeModal = useCallback(() => setSelected(null), []);
  const shared = { onView: setSelected, isSaved };

  return (
    <div className="app">
      <Navbar savedCount={watchlist.length + readingList.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/movies" element={<Movies {...shared} />} />
          <Route path="/books" element={<Books {...shared} />} />
          <Route path="/library" element={<MyLibrary watchlist={watchlist} readingList={readingList} onView={setSelected} onRemove={removeItem} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {selected && (
        <DetailsModal key={`${selected.kind}-${selected.id}`} item={selected} saved={isSaved(selected)}
          onClose={closeModal} onAdd={addItem} onRemove={removeItem} />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
