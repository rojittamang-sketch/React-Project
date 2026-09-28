import { useState, useEffect } from "react";

// Custom hook: works like useState, but the value is saved in LocalStorage.
export default function useLocalStorage(key, initialValue) {
  // Lazy initial state: read the saved value once, when the component first renders.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect keeps LocalStorage in sync whenever the value changes.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be full or blocked; the app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
