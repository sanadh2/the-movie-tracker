import { useCallback, useEffect, useState } from "react";

function useSearchStore(query: string) {
  const [searchQueries, setSearchQueries] = useState<string[]>(() => {
    const storedQueries = localStorage.getItem("searchQueries");
    return storedQueries ? JSON.parse(storedQueries) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchQueries", JSON.stringify(searchQueries));
  }, [searchQueries]);

  const addQuery = useCallback(() => {
    setSearchQueries((prevQueries) => {
      if (prevQueries.includes(query)) return prevQueries;
      if (prevQueries.length >= 3) {
        return [...prevQueries.slice(1), query];
      }
      return [...prevQueries, query];
    });
  }, [query]);

  const deleteQuery = useCallback((query: string) => {
    setSearchQueries((prevQueries) =>
      prevQueries.filter((searchQuery) => searchQuery !== query)
    );
  }, []);

  const clearQueries = () => setSearchQueries([]);

  return {
    searchQueries,
    addQuery,
    clearQueries,
    deleteQuery,
  };
}

export default useSearchStore;
