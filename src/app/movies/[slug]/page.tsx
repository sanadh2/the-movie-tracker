import BackgroundImage from "./_components/background-image";
import { MovieCard, MoviePoster } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import { format } from "date-fns";
import SimilarMovies from "./_components/similar-movies";
import InteractionPanel from "./_components/interaction-panel";
import Reviews from "./_components/reviewes";
import Link from "next/link";
import { z } from "zod";
import { Metadata } from "next";
import { fetchMovieById } from "@/db/services/tmdb";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import TabbedContent from "./tabbed-content";
import Youtube from "./_components/youtube";
import { MovieType, VideoResultType } from "@/db/services/tmdb/types";
import { generateSlug } from "@/lib/slug";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const movieIDschema = z.string().min(1).regex(/^\d+$/);

const findLatestTrailer = (movie: MovieType) => {
  return (
    movie.videos.results
      .filter((video) => video.type?.toLowerCase() === "trailer")
      .reduce<VideoResultType | null>((latest, current) => {
        if (!latest) return current;
        const latestDate = new Date(latest.published_at || 0);
        const currentDate = new Date(current.published_at || 0);
        return latestDate > currentDate ? latest : current;
      }, null) ||
    movie.videos.results
      .filter((video) => video.type?.toLowerCase() === "teaser")
      .reduce<VideoResultType | null>((latest, current) => {
        if (!latest) return current;
        const latestDate = new Date(latest.published_at || 0);
        const currentDate = new Date(current.published_at || 0);
        return latestDate > currentDate ? latest : current;
      }, null)
  );
};

export default async function MoviePage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.split("-").pop();
  if (!id) return notFound();
  const { success, data } = movieIDschema.safeParse(id);
  if (!success) {
    throw new Error("Invalid movie id");
  }
  const tmdbID = Number(data);
  const movie = await fetchMovieById(tmdbID);
  if (!movie || !movie.backdrop_path || !movie.poster_path || !movie.title)
    return notFound();

  const { backdrop_path, poster_path, title } = movie;
  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );

  const latestTrailer = findLatestTrailer(movie)!;
  return (
    <PageLayout className="container mx-auto text-xs md:text-sm relative">
      <BackgroundImage backdrop_path={backdrop_path} />
      <div className="flex gap-1 md:gap-4 lg:gap-6 ">
        <MovieCard
          className="w-fit sticky top-0"
          movie={{
            poster_path: poster_path,
            title: title,
          }}
        >
          <MoviePoster />
        </MovieCard>
        <div className="w-full overflow-x-scroll no-scrollbar">
          <div className="flex flex-wrap items-center gap-1 md:gap-2 lg:gap-3 h-fit">
            <h3 className="block text-base md:text-lg lg:text-3xl font-black mr-4">
              {movie.title}
            </h3>
            <Button
              variant={"linkHover1"}
              asChild
              className="font-light text-sm md:text-base"
            >
              <Link href={""}>
                {format(new Date(movie.release_date), "yyyy")}
              </Link>
            </Button>
            {director && (
              <span className="">
                Directed By{" "}
                <Button
                  variant={"linkHover1"}
                  asChild
                  className="font-light text-sm md:text-base"
                >
                  <Link
                    href={
                      "/directors/" +
                      generateSlug(director.original_name, director.id)
                    }
                    className=""
                  >
                    {director?.original_name}
                  </Link>
                </Button>
              </span>
            )}
          </div>
          <div className="mt-4   space-y-3">
            {movie.tagline && (
              <h6 className="uppercase font-normal">{movie.tagline}</h6>
            )}
            <p className="">{movie.overview}</p>
            <div className="pt-4 hidden md:block">
              <TabbedContent movie={movie} />
            </div>
          </div>
        </div>
        {latestTrailer && latestTrailer.key && (
          <div className="hidden xl:block">
            <Youtube videoKey={latestTrailer.key} />
          </div>
        )}
      </div>
      <div className="sm:flex gap-3 xl:block justify-between">
        <div className="mt-8 w-full">
          <InteractionPanel
            movie={{
              genres: movie.genres,
              posterUrl: movie.poster_path,
              title: movie.title,
              tmdbID: movie.id,
            }}
            tmdbID={tmdbID}
          />
        </div>
        {latestTrailer && latestTrailer.key && (
          <div className="w-full mt-8 xl:hidden flex justify-center items-center ">
            <Youtube videoKey={latestTrailer.key!} />
          </div>
        )}
      </div>
      <div className="mt-8 md:hidden block w-full">
        <TabbedContent movie={movie} />
      </div>
      <div className="flex justify-center border rounded-md mt-8">
        <Reviews id={tmdbID} />
      </div>
      <div className="mt-4">
        <SimilarMovies id={tmdbID} />
      </div>
    </PageLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const id = params.slug.split("-").pop();
  const { success, data } = movieIDschema.safeParse(id);
  if (!success) {
    return {
      title: "Movie",
      description: "Movie",
    };
  }
  const movieID = Number(data);
  const movie = await fetchMovieById(movieID);
  return {
    title: movie.title,
    creator: "Sanadh Narayanan",
  };
}
