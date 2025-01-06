import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import { useQuery } from "@tanstack/react-query";

interface ResponseType {
  movies: MoviesNowPlayingType;
  message: string;
}
async function fetchMovies() {
  console.log("Connecting to:", "/api/tmdb/now-playing");
  const response = await fetch("/api/tmdb/now-playing");

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data: ResponseType = await response.json();
  return data;
}

export const useNowPlayingData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchMovies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};
