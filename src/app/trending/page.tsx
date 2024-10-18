import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import moviedb from "@/db/moviedb";
import { MovieResult } from "moviedb-promise";
import Link from "next/link";
import "./styles.css";
export default async function TrendingPage() {
  const response = await moviedb.trending({
    media_type: "movie",
    time_window: "day",
  });
  const movies = response.results as MovieResult[];
  return (
    <PageLayout>
      <h2 className="text-center text-xl font-mono">Trending Movies</h2>
      <div className="flex justify-center w-full">
        <div className="grid-container mt-10 gap-10">
          {movies?.map((movie) => (
            <div key={movie.id} className="w-full grid place-items-center">
              <MovieCard
                className="self-start"
                movie={{
                  title: movie.title || "",
                  poster_path: movie.poster_path || "",
                  vote_average: movie.vote_average || 0,
                }}
              >
                <Link href={"/movies/" + movie.id}>
                  <MoviePoster rating className="" />
                  <MovieTitle className="line-clamp-2 text-xs md:text-sm mt-1" />
                </Link>
              </MovieCard>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
