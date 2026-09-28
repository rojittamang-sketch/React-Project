// Sort a list without changing the original array.
export function sortItems(items, mode) {
  const list = [...items];
  const year = (i) => parseInt(i.year, 10);
  if (mode === "title-asc") return list.sort((a, b) => a.title.localeCompare(b.title));
  if (mode === "title-desc") return list.sort((a, b) => b.title.localeCompare(a.title));
  // items without a year always go last
  if (mode === "year-desc") return list.sort((a, b) => (year(b) || -Infinity) - (year(a) || -Infinity));
  if (mode === "year-asc") return list.sort((a, b) => (year(a) || Infinity) - (year(b) || Infinity));
  return list; // "relevance" keeps the API order
}

export const filterByCategory = (items, category) =>
  category ? items.filter((i) => i.category === category) : items;

export const uniqueCategories = (items) => [...new Set(items.map((i) => i.category))].sort();

// Add new items to a list without repeating ids (used by "Load more").
export function mergeUnique(oldItems, newItems) {
  const seen = new Set(oldItems.map((i) => i.id));
  return [...oldItems, ...newItems.filter((i) => !seen.has(i.id))];
}
