import { useQuery } from "@tanstack/react-query";
import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import { env } from "@/lib/env";
import { z } from "zod";
interface ResponseType {
  movies: MoviesNowPlayingType;
  message: string;
}

const schema = z.object({
  query: z.string().min(1, { message: "Please enter a search query" }),
  page: z.string().optional(),
  year: z.string().optional(),
  include_adult: z.enum(["true", "false"]).optional(), // Enum for better type safety
});

export type FetchMoviesParams = z.infer<typeof schema>;

async function fetchMovies({
  query,
  page,
  year,
  include_adult,
}: FetchMoviesParams) {
  const url = new URL("/api/tmdb/search", env.NEXT_PUBLIC_API_BASE_URL);

  const params = new URLSearchParams({
    query,
    ...(page && { page: String(page) }),
    ...(year && { primary_release_year: String(year) }),
    ...(include_adult && { include_adult: String(include_adult) }),
  });

  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.statusText}`);
  }

  return (await response.json()) as ResponseType;
}

export default function useSearchData(
  params: FetchMoviesParams,
  initialData?: MoviesNowPlayingType
) {
  const { data, isLoading, error } = useQuery({
    enabled: params.query.trim().length > 0,
    queryKey: [
      "search",
      params.query,
      params.page,
      params.year,
      params.include_adult,
    ],
    queryFn: () => fetchMovies(params),
    initialData: initialData
      ? {
          movies: initialData,
          message: "search results",
        }
      : undefined,
  });

  return { data, error, isLoading };
}
