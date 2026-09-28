# CineShelf — Movie & Book Library

CineShelf is a personal digital library built with React. Search movies/series (iTunes Search API) and books (Open Library, with Google Books backup) — no API keys needed, read full details, and save titles to a **Watchlist** or **Reading List** that persists in your browser.

## Features implemented
- Home page with hero search, featured movies, and popular books
- Movie search (OMDb) with type filter, sorting, and "Load more"
- Book search (Google Books) with category filter, sorting, and "Load more"
- Reusable details modal (plot/description, director, actors, genre, rating, publisher, categories…)
- My Library with a Watchlist and Reading List: add, remove, no duplicates
- Saved items survive page refresh (LocalStorage)
- Filter by category, sort by title (A–Z / Z–A) or year
- Loading skeletons, empty states, error messages, missing-image fallbacks
- Confirmation toast when saving or removing
- Responsive layout (desktop, tablet, mobile) and reduced-motion support

## Technologies used
React 18 (functional components), Vite, React Router DOM, React Hooks (`useState`, `useEffect`, custom `useLocalStorage`), Fetch API, LocalStorage, Lucide React, HTML5, CSS3.

## Project folder structure
```
src/
  components/  Navbar, Hero, SearchBar, MediaCard, MediaGrid, DetailsModal, Loading, EmptyState, Footer
  pages/       Home, Movies, Books, MyLibrary, NotFound
  hooks/       useLocalStorage.js
  services/    movieApi.js, bookApi.js
  utils/       helpers.js (sorting, filtering)
  App.jsx  main.jsx  index.css
```

## Installation
```bash
npm install
npm run dev
```
Then open the local URL shown in the terminal (usually http://localhost:5173).

## API setup
No keys or `.env` file needed.
- **Movies & series:** iTunes Search API (movies and series are fetched in parallel)
- **Books:** Open Library, requested in parallel with Google Books as a backup

## Screenshots
| Home | Movie details | My Library |
|------|---------------|------------|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Library](screenshots/library.png) |

*(Add your own screenshots to a `screenshots/` folder.)*

## Known limitations
- iTunes has no cast list or IMDb rating; "Load more" re-requests a larger result set (max 200).
- Google Books may return no cover or description for some titles.
- Saved items are stored only in this browser (no accounts or sync).
- Sorting and category filters apply to the results already loaded.

## Suggested GitHub commits
1. `chore: set up Vite + React project`
2. `feat: add routing, navbar, footer`
3. `feat: add API services for OMDb and Google Books`
4. `feat: add reusable card, grid, loading and empty components`
5. `feat: add movie and book search pages`
6. `feat: add details modal`
7. `feat: add library with LocalStorage`
8. `feat: add filtering and sorting`
9. `style: polish responsive design`
10. `docs: add README`
