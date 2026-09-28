// Books via Open Library (free, NO API key, CORS-enabled), with Google Books as a backup.
const OL_SEARCH = "https://openlibrary.org/search.json";
const OL_BASE = "https://openlibrary.org";
const GB_URL = "https://www.googleapis.com/books/v1/volumes";
const PAGE_SIZE = 20;
const OL_FIELDS = "key,title,author_name,first_publish_year,cover_i,subject,publisher,number_of_pages_median,first_sentence";

async function getJson(url, label) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error(`Could not reach ${label}. Check your internet connection.`);
  }
  if (!res.ok) throw new Error(`${label} request failed (${res.status}).`);
  return res.json();
}

const strip = (s = "") => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// ---------- Open Library ----------
export function normalizeOLBook(d) {
  const subjects = (d.subject || []).slice(0, 6);
  const first = Array.isArray(d.first_sentence) ? d.first_sentence[0] : d.first_sentence;
  return {
    id: d.key, // e.g. "/works/OL45804W"
    source: "openlibrary",
    kind: "book",
    title: d.title || "Untitled",
    year: d.first_publish_year ? String(d.first_publish_year) : "",
    image: d.cover_i ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg` : "",
    category: subjects[0] || "Book",
    categories: subjects,
    authors: d.author_name || [],
    description: first || "",
    detailed: false,
    publisher: (d.publisher || [])[0] || "",
    publishedDate: d.first_publish_year ? String(d.first_publish_year) : "",
    pageCount: d.number_of_pages_median || "",
  };
}

async function searchOpenLibrary(query, page, sort) {
  const params = new URLSearchParams({ q: query, page, limit: PAGE_SIZE, fields: OL_FIELDS });
  if (sort) params.set("sort", sort);
  const data = await getJson(`${OL_SEARCH}?${params}`, "Open Library");
  return { items: (data.docs || []).map(normalizeOLBook), total: data.numFound || 0 };
}

// ---------- Google Books (backup) ----------
export function normalizeGBook(v) {
  const info = v.volumeInfo || {};
  return {
    id: v.id,
    source: "google",
    kind: "book",
    title: info.title || "Untitled",
    year: (info.publishedDate || "").slice(0, 4),
    image: (info.imageLinks?.thumbnail || "").replace("http://", "https://"),
    category: info.categories?.[0] || "Book",
    categories: info.categories || [],
    authors: info.authors || [],
    description: strip(info.description),
    detailed: true,
    publisher: info.publisher || "",
    publishedDate: info.publishedDate || "",
    pageCount: info.pageCount || "",
  };
}

async function searchGoogle(query, page) {
  const params = new URLSearchParams({ q: query, maxResults: PAGE_SIZE, startIndex: (page - 1) * PAGE_SIZE });
  const data = await getJson(`${GB_URL}?${params}`, "Google Books");
  return { items: (data.items || []).map(normalizeGBook), total: data.totalItems || 0 };
}

// Try both services at the same time; use Open Library first, Google Books if it fails or is empty.
export async function searchBooks(query, page = 1, { sort = "" } = {}) {
  const [ol, gb] = await Promise.allSettled([
    searchOpenLibrary(query, page, sort),
    // Google is only requested as a backup for real searches, not for "subject:" defaults
    /^subject:/.test(query) ? Promise.reject(new Error("skip")) : searchGoogle(query, page),
  ]);
  if (ol.status === "fulfilled" && ol.value.items.length) return ol.value;
  if (gb.status === "fulfilled") return gb.value;
  if (ol.status === "fulfilled") return ol.value; // genuine empty result
  throw ol.reason;
}

// Open Library search results have no long description, so we load it from the work record.
export async function getBookDetails(item) {
  if (item.source !== "openlibrary") return item;
  const data = await getJson(`${OL_BASE}${item.id}.json`, "Open Library");
  const d = typeof data.description === "string" ? data.description : data.description?.value;
  return { description: strip(d) || item.description, detailed: true };
}
