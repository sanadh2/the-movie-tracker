import moviedb from "@/db/moviedb";
import BackgroundImage from "./_components/background-image";
import { MovieCard, MoviePoster } from "@/components/movie-card";
import NotFound from "@/app/not-found";
import PageLayout from "@/components/PageLayout";
import { format, parseISO } from "date-fns";
import SimilarMovies from "./_components/similar-movies";
import Images from "./_components/Images/images";
import InteractionPanel from "./_components/interaction-panel";
import Reviews from "./_components/reviewes";
import Link from "next/link";
import { Heart } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
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
    <div className="">
      <BackgroundImage backdrop_path={movie.backdrop_path || ""} />
      <PageLayout>
        <div className="pb-10 lg:hidden block text-center">
          <h2 className="text-4xl text-white font-bold text-center">
            {movie.title}
          </h2>
          <p className="text-sm font-light px-2">
            Directed by{" "}
            <Link
              href={"/directors/" + director?.id || ""}
              className="font-semibold"
            >
              {director?.name}
            </Link>
          </p>
        </div>

        <div className="flex flex-row justify-between items-start">
          <div className="flex justify-between items-center gap-3">
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
                className="hover:border-transparent"
                showTitile
              />
            </MovieCard>
            {/* <div className="self-start text-xs">
              <div className="">
                <p className="">
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
              <div className="my-4 flex justify-center items-center">
                <Heart color="red" fill="red" />
                &nbsp; &nbsp;{movie.vote_average?.toFixed(2)}
              </div>
            </div> */}
          </div>
          <div className="px-10 w-1/2">
            <h2 className="text-4xl text-white font-bold text-center hidden lg:block">
              {movie.title}
              <sub className="text-sm font-light px-2">
                Directed by{" "}
                <Link
                  href={"/directors/" + director?.id || ""}
                  className="font-semibold"
                >
                  {director?.name}
                </Link>
              </sub>
            </h2>
            <div className="mt-10 font-semibold text-left">
              <p className="">
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
            <p className="mt-10 text-left text-white hidden lg:block">
              {movie.overview}
            </p>
          </div>
          <SimilarMovies id={params.id} />
        </div>
        <div className="">
          <Images id={params.id} />
        </div>
      </PageLayout>
      <PageLayout className="bg-gradient-to-t from-black to-transparent mt-20">
        <div className="flex gap-5 items-start">
          <InteractionPanel movieID={Number(params.id)} />
          <Reviews id={params.id} />
        </div>
      </PageLayout>
    </div>
  );
}
