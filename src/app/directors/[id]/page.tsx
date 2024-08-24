import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import moviedb from "@/db/moviedb";
import Link from "next/link";

export default async function DirectorPage({
  params,
}: {
  params: { id: string };
}) {
  const directorDetails = await moviedb.personInfo({ id: params.id });
  const movies = await moviedb.personMovieCredits({ id: params.id });
  const directedMovies = movies.crew?.filter(
    (movie) => movie.job === "Director"
  );
  return (
    <PageLayout>
      <h2 className="text-center text-3xl font-black">
        {directorDetails.name}
      </h2>
      <div className="grid gap-8 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {directedMovies?.map((movie) => (
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
