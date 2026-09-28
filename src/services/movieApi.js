// Movies & TV via the iTunes Search API: free, NO API key, CORS-enabled.
// https://performance-partners.apple.com/search-api
const BASE_URL = "https://itunes.apple.com/search";
const PAGE_SIZE = 20;
const MAX_LIMIT = 200; // iTunes has no offset, so "load more" re-requests a bigger limit

const ENTITY = { movie: "movie", series: "tvShow", episode: "tvEpisode" };
const LABEL = { movie: "Movie", tvShow: "Series", tvEpisode: "Episode" };

const bigArt = (url = "") => url.replace(/\/\d+x\d+(bb)?\.(jpg|png)/, "/400x600bb.$2");

export function normalizeMovie(m, entity = "movie") {
  const isEpisode = entity === "tvEpisode";
  const isShow = entity === "tvShow";
  const title = isEpisode || isShow ? m.collectionName || m.trackName : m.trackName;
  const mins = m.trackTimeMillis ? Math.round(m.trackTimeMillis / 60000) : 0;
  return {
    id: `${entity}-${m.trackId || m.collectionId}`,
    kind: "movie",
    title: title || "Untitled",
    year: (m.releaseDate || "").slice(0, 4),
    image: bigArt(m.artworkUrl100),
    category: m.primaryGenreName || LABEL[entity] || "Movie",
    detailed: true, // iTunes already returns full info in the search response
    plot: (m.longDescription || m.shortDescription || m.description || "").trim(),
    genre: [LABEL[entity], m.primaryGenreName].filter(Boolean).join(" · "),
    director: entity === "movie" ? m.artistName || "" : "",
    actors: "",
    released: m.releaseDate ? new Date(m.releaseDate).toLocaleDateString() : "",
    runtime: mins ? `${mins} min` : "",
    rated: m.contentAdvisoryRating || "",
    rating: "",
  };
}

async function fetchEntity(query, entity, limit) {
  const params = new URLSearchParams({ term: query, media: entity === "movie" ? "movie" : "tvShow", entity, limit });
  let res;
  try {
    res = await fetch(`${BASE_URL}?${params}`);
  } catch {
    throw new Error("Could not reach the movie service. Check your internet connection.");
  }
  if (!res.ok) throw new Error(`Movie search failed (${res.status}).`);
  const data = await res.json();
  return (data.results || []).map((r) => normalizeMovie(r, entity));
}

export async function searchMovies(query, { type = "", page = 1 } = {}) {
  const limit = Math.min(page * PAGE_SIZE, MAX_LIMIT);
  const entities = type ? [ENTITY[type] || "movie"] : ["movie", "tvShow"];

  // Movies and series are requested at the same time.
  const settled = await Promise.allSettled(entities.map((e) => fetchEntity(query, e, limit)));
  const ok = settled.filter((s) => s.status === "fulfilled").map((s) => s.value);
  if (!ok.length) throw settled[0].reason;

  // interleave results so movies and series are mixed
  const items = [];
  for (let i = 0; i < Math.max(...ok.map((l) => l.length)); i++) ok.forEach((l) => l[i] && items.push(l[i]));

  const more = limit < MAX_LIMIT && ok.some((l) => l.length >= limit);
  return { items, total: more ? items.length + 1 : items.length };
}

// Search results already contain everything, so this is only a fallback.
export async function getMovieDetails(id) {
  throw new Error(`No extra details for ${id}.`);
}
