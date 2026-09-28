import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Hero() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("movies"); // which library to search
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const q = query.trim();
    navigate(`/${mode}${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1>Your next movie night and your next chapter, on one shelf.</h1>
        <p>Search films and books, read the details, and save what you want to watch or read.</p>
        <div className="segmented" role="group" aria-label="Search in">
          {["movies", "books"].map((m) => (
            <button key={m} type="button" aria-pressed={mode === m}
              className={mode === m ? "seg active" : "seg"} onClick={() => setMode(m)}>
              {m === "movies" ? "Movies" : "Books"}
            </button>
          ))}
        </div>
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch}
          placeholder={mode === "movies" ? "Search movies by title" : "Search books by title or author"} />
      </div>
    </section>
  );
}
