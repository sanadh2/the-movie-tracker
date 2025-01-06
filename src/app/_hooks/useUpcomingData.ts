import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import { useQuery } from "@tanstack/react-query";

interface ResponseType {
  movies: MoviesNowPlayingType;
  message: string;
}
async function fetchMovies() {
  console.log("Connecting to:", "/api/tmdb/upcoming");
  const response = await fetch("/api/tmdb/upcoming");

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data: ResponseType = await response.json();
  return data;
}

export const useUpcomingData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["upcoming"],
    queryFn: fetchMovies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, error };
};
