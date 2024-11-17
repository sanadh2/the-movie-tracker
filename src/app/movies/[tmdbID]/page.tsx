import BackgroundImage from "./_components/background-image";
import { MovieCard, MoviePoster } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import { format, parseISO } from "date-fns";
import SimilarMovies from "./_components/similar-movies";
import InteractionPanel from "./_components/interaction-panel";
import Reviews from "./_components/reviewes";
import Link from "next/link";
import { z } from "zod";
import { Metadata } from "next";
import { fetchMovieById } from "@/db/services/tmdb";
import { notFound } from "next/navigation";
import ImageList from "./_components/Images/imageList";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const movieIDschema = z.string().min(1).regex(/^\d+$/);

export default async function MoviePage({
  params,
}: {
  params: { tmdbID: string };
}) {
  const { success, data } = movieIDschema.safeParse(params.tmdbID);
  if (!success) {
    throw new Error("Invalid movie id");
  }
  const tmdbID = Number(data);
  const movie = await fetchMovieById(tmdbID);
  const { backdrop_path, poster_path, title, genres } = movie;
  if (!movie || !backdrop_path || !poster_path || !title || !genres)
    return notFound();
  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );
  return (
    <div className="min-h-screen">
      <BackgroundImage backdrop_path={backdrop_path} />
      <PageLayout>
        <div className="flex flex-row justify-between items-start">
          <div className="flex justify-between items-center gap-3">
            <MovieCard
              size="lg"
              movie={{
                poster_path: movie.poster_path || "",
                title: movie.title || "",
              }}
            >
              <MoviePoster
                quality="w342"
                className="hover:border-transparent"
                showTitile
              />
            </MovieCard>
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
          <SimilarMovies id={tmdbID} />
        </div>
        <div className="">
          <ImageList images={movie.images} />
        </div>
      </PageLayout>
      <div className="bg-gradient-to-t from-black to-transparent min-h-80 ">
        <div className="flex items-start justify-around min-h-96">
          <InteractionPanel
            tmdbID={Number(tmdbID)}
            movie={{
              tmdbID: tmdbID,
              genres: genres.filter(
                (genre) => genre.id !== undefined && genre.name !== undefined
              ) as { id: number; name: string }[],
              posterUrl: poster_path,
              title,
            }}
          />
          <Reviews id={tmdbID} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { tmdbID: string };
}): Promise<Metadata> {
  const { success, data } = movieIDschema.safeParse(params.tmdbID);
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
