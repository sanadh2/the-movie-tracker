import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import moviedb from "@/db/moviedb";
import Image from "next/image";
import Link from "next/link";
import { baseUrlImage } from "../../../../config/tmdb";

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
      <div className="flex gap-3 items-start mt-4">
        {directorDetails.profile_path && (
          <Image
            alt=""
            loading="lazy"
            blurDataURL={baseUrlImage + "w185" + directorDetails.profile_path}
            src={baseUrlImage + "w300" + directorDetails.profile_path}
            width={200}
            height={300}
            className="object-cover"
          />
        )}
        <div className="">
          <h5 className="text-xl underline mb-3">Biography</h5>
          <pre className="text-sm w-full max-w-full overflow-auto whitespace-pre-wrap font-sans">
            {directorDetails.biography}
          </pre>
        </div>
      </div>

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