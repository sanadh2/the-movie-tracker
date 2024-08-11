import moviedb from "@/db/moviedb";
import BackgroundImage from "./_components/background-image";
import PageLayout from "@/components/PageLayout";
import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import NotFound from "@/app/not-found";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await moviedb.movieInfo({ id: params.id });
  if (!movie) return <NotFound />;
  return (
    <div className="h-[300vh]">
      <BackgroundImage backdrop_path={movie.backdrop_path} />
      <PageLayout className="bg-gradient-to-b from-transparent via-black to-black min-h-96 md:mt-96 relative z-[1]">
        <div className="">
          <MovieCard
            movie={{
              title: movie.title || "",
              poster_path: movie.poster_path || "",
              vote_average: movie.vote_average || 0,
            }}
          >
            <MovieTitle />
            <MoviePoster />
          </MovieCard>
        </div>
      </PageLayout>
    </div>
  );
}
