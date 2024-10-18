import { MovieCard, MoviePoster } from "@/components/movie-card";
import moviedb from "@/db/moviedb";
import Link from "next/link";

export default async function SimilarMovies({ id }: { id: string }) {
  const similarMovies = await moviedb.movieRecommendations({ id });

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
              vote_average: movie.vote_average || 0,
            }}
          >
            <Link href={"/movies/" + movie.id}>
              <MoviePoster
                showTitile
                quality="w342"
                className="border rounded-none lg:rounded-none"
              />
            </Link>
          </MovieCard>
        ))}
      </div>
    </div>
  );
}
