import { fetchRecommendedMovies, fetchSimilarMovies } from "@/db/services/tmdb";
import { MoviesNowPlayingType } from "@/db/services/tmdb/types";
import MovieList from "@/app/_components/movie-list";

export default async function SimilarMovies({ id }: { id: string | number }) {
  const similarResponse = await fetchRecommendedMovies(id);
  let similarMovies: MoviesNowPlayingType;
  if (similarResponse?.results && similarResponse.results.length > 0)
    similarMovies = similarResponse;
  else similarMovies = await fetchSimilarMovies(id);
  return (
    <div className="">
      <h4 className="text-base lg:text-lg font-mono py-2">Similar Movies</h4>
      <MovieList movies={JSON.parse(JSON.stringify(similarMovies.results))} />
    </div>
  );
}
