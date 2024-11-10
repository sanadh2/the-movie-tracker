import { MovieCard, MoviePoster } from "@/components/movie-card";
import { fetchRecommendedMovies, fetchSimilarMovies } from "@/db/services/tmdb";
import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import Link from "next/link";

export default async function SimilarMovies({ id }: { id: string | number }) {
  const similarResponse = await fetchRecommendedMovies(id);
  let similarMovies: MoviesNowPlayingType;
  if (similarResponse?.results && similarResponse.results.length > 0)
    similarMovies = similarResponse;
  else similarMovies = await fetchSimilarMovies(id);
  return (
    <div className="w-fit">
      <h4 className="text-lg font-bold mb-3">Similar Movies</h4>
      <div className="grid grid-cols-2 gap-2">
        {similarMovies?.results?.splice(0, 4).map((movie) => (
          <MovieCard
            key={movie.id}
            size="sm"
            movie={{
              title: movie.title || "",
              poster_path: movie.poster_path || "",
            }}
          >
            <Link href={"http://localhost:3000/movies/" + movie.id}>
              <MoviePoster
                similar
                showTitile
                quality="w154"
                className="border rounded-none lg:rounded-none"
              />
            </Link>
          </MovieCard>
        ))}
      </div>
    </div>
  );
}
