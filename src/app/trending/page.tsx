import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import moviedb from "@/db/moviedb";
export default async function TrendingPage() {
  const movies = await moviedb.moviePopular({ page: 1 });

  return (
    <PageLayout>
      <h2 className="text-center text-xl">Trending Movies</h2>
      <div className="grid gap-8 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {movies?.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              title: movie.title || "",
              poster_path: movie.poster_path || "",
              vote_average: movie.vote_average || 0,
            }}
          >
            <MoviePoster rating />
            <MovieTitle className="line-clamp-2 text-xs mt-1" />
          </MovieCard>
        ))}
      </div>
    </PageLayout>
  );
}
