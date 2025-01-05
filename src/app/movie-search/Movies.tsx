"use client";
import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import useSearchData, { FetchMoviesParams } from "@/store/useSearch";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { schema } from "./form";
import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import Loader from "./loading";

export default function Movies({
  initialData,
}: {
  initialData: MoviesNowPlayingType;
}) {
  const searchParams = useSearchParams();
  const initialQuery: FetchMoviesParams = {
    query: searchParams.get("query") || "",
    page: searchParams.get("page") || "1",
    year: searchParams.get("year") || "",
    include_adult:
      searchParams.get("include_adult") == "true" ? "true" : "false",
  };
  const { success, error } = schema.safeParse(initialQuery);
  if (!success) {
    error.errors.map((e) => {
      if (e.path.includes("page")) {
        initialQuery.page = "1";
      }
      if (e.path.includes("year")) {
        initialQuery.year = "";
      }
      if (e.path.includes("include_adult")) {
        initialQuery.include_adult = "false";
      }
    });
  }
  const { query, page, year, include_adult } = initialQuery;
  const { data, isLoading } = useSearchData(
    {
      query,
      page,
      year,
      include_adult,
    },
    initialData
  );
  const finalData = data || { movies: initialData, message: "search results" };
  finalData.movies.results = finalData.movies.results.filter((movie) => {
    const { backdrop_path, poster_path, title, genre_ids } = movie;
    return backdrop_path && poster_path && title && genre_ids;
  });
  return (
    <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-10 mt-10">
      {isLoading ? (
        <Loader />
      ) : (
        finalData?.movies?.results?.map((movie) => (
          <div key={movie.id} className="grid place-items-center">
            <MovieCard
              className="self-start"
              movie={{
                title: movie.title || "",
                poster_path: movie.poster_path || "",
              }}
            >
              <Link href={"/movies/" + movie.id}>
                <MoviePoster className="" />
                <MovieTitle className="line-clamp-2 text-xs md:text-sm mt-1" />
              </Link>
            </MovieCard>
          </div>
        ))
      )}
    </div>
  );
}
