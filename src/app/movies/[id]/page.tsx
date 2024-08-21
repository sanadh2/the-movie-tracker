import moviedb from "@/db/moviedb";
import BackgroundImage from "./_components/background-image";
import { MovieCard, MoviePoster } from "@/components/movie-card";
import NotFound from "@/app/not-found";
import PageLayout from "@/components/PageLayout";
import { format, parseISO } from "date-fns";
import SimilarMovies from "./_components/similar-movies";
import Images from "./_components/Images";
import InteractionPanel from "./_components/interaction-panel";
export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await moviedb.movieInfo({ id: params.id });
  const { backdrop_path, poster_path, title } = movie;
  if (!movie || !backdrop_path || !poster_path || !title) return <NotFound />;
  const credits = await moviedb.movieCredits({ id: params.id });
  const director = credits.crew?.find((c) => c.job === "Director");
  return (
    <div className="h-[300vh]">
      <BackgroundImage backdrop_path={movie.backdrop_path || ""} />
      <PageLayout>
        <div className="flex justify-between items-start">
          <MovieCard
            size="lg"
            movie={{
              poster_path: movie.poster_path || "",
              title: movie.title || "",
              vote_average: movie.vote_average || 0,
            }}
          >
            <MoviePoster
              quality="original"
              rating
              className="hover:border-transparent"
            />
          </MovieCard>
          <div className="px-10 w-1/2">
            <h2 className="text-4xl text-white font-bold text-center">
              {movie.title}
              <sub className="text-[0.5rem] font-light px-2">
                Directed by{" "}
                <span className="font-medium">{director?.name}</span>
              </sub>
            </h2>
            <div className="mt-10 font-semibold">
              <p className="text-left ">
                {movie.release_date &&
                  parseISO(movie.release_date) &&
                  format(parseISO(movie.release_date), "yyyy")}
              </p>
              <p>{movie.runtime} minutes</p>{" "}
              <p className="space-x-2">
                {movie.genres?.map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </p>
            </div>
            <p className="mt-10 mx-auto text-white">{movie.overview}</p>
          </div>
          <SimilarMovies id={params.id} />
        </div>
        <div className="">
          <Images id={params.id} />
        </div>
        <InteractionPanel />
      </PageLayout>
    </div>
  );
}
