import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  const getPath = () => {
    const h = window.location.hash.replace("#", "");
    return h === "" ? "/" : h;
  };

  const [path, setPath] = useState(getPath);

  useEffect(() => {
    // Set initial hash if empty so the page loads correctly
    if (!window.location.hash) {
      window.location.hash = "/";
    }
    const handler = () => setPath(getPath());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { path, navigate };
}
