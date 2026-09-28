import { Search } from "lucide-react";

// A controlled input: the value lives in the parent's state and changes through onChange.
// onSubmit is a callback that lets the child tell the parent "the user searched".
export default function SearchBar({ value, onChange, onSubmit, placeholder, children }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from reloading the page
    onSubmit();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit} role="search">
      <div className="search-field">
        <Search size={18} />
        <input type="search" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} aria-label={placeholder} />
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
      {children}
    </form>
  );
}
