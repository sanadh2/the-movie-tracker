import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import "./styles.css";
import { fetchTrendingMovies } from "@/db/services/tmdb";
import { generateSlug } from "@/lib/slug";
export default async function TrendingPage() {
  const response = await fetchTrendingMovies();
  return (
    <PageLayout>
      <h2 className="text-center text-xl font-mono">Trending Movies</h2>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {response.results?.map((movie) => (
            <div key={movie.id} className="w-full grid place-items-center">
              <MovieCard
                className="self-start"
                movie={{
                  title: movie.title || "",
                  poster_path: movie.poster_path || "",
                }}
              >
                <Link href={"/movies/" + generateSlug(movie.title, movie.id)}>
                  <MoviePoster className="" />
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
