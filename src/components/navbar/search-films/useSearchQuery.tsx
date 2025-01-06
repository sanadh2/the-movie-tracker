"use client";

import { useCallback, useEffect, useState } from "react";

function useSearchStore(query: string) {
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedQueries = localStorage.getItem("searchQueries");
      if (storedQueries) {
        setSearchQueries(JSON.parse(storedQueries));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchQueries", JSON.stringify(searchQueries));
    }
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

  const clearQueries = useCallback(() => {
    setSearchQueries([]);
  }, []);

  return {
    searchQueries,
    addQuery,
    clearQueries,
    deleteQuery,
  };
}

export default useSearchStore;
