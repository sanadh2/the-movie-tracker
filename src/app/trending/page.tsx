import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import moviedb from "@/db/moviedb";
import { MovieResult } from "moviedb-promise";
import Link from "next/link";
export default async function TrendingPage() {
  const response = await moviedb.trending({
    media_type: "movie",
    time_window: "day",
  });
  const movies = response.results as MovieResult[];
  return (
    <PageLayout>
      <h2 className="text-center text-xl">Trending Movies</h2>
      <div className="grid gap-8 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              title: movie.title || "",
              poster_path: movie.poster_path || "",
              vote_average: movie.vote_average || 0,
            }}
          >
            <Link href={"/movies/" + movie.id}>
              <MoviePoster rating />
              <MovieTitle className="line-clamp-2 text-xs mt-1" />
            </Link>
          </MovieCard>
        ))}
      </div>
    </PageLayout>
  );
}
