import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";
import { baseUrlImage } from "../../../../config/tmdb";
import { fetchPersonInfo } from "@/db/services/tmdb";
import { generateSlug } from "@/lib/slug";
import { notFound } from "next/navigation";

export default async function DirectorPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.split("-").pop();
  if (!id) return notFound();
  const directorDetails = await fetchPersonInfo(id);
  const directedMovies = directorDetails.combined_credits.crew.filter(
    (movie) => movie.job === "Director"
  );
  return (
    <PageLayout className="container mx-auto ">
      <h2 className="text-center text-3xl font-black">
        {directorDetails.name}
      </h2>
      <div className="flex gap-3 items-start mt-4">
        {directorDetails.profile_path && (
          <Image
            alt=""
            loading="eager"
            blurDataURL={baseUrlImage + "w185" + directorDetails.profile_path}
            src={baseUrlImage + "h632" + directorDetails.profile_path}
            width={200}
            height={300}
            className="object-cover border"
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
            }}
          >
            <Link
              href={
                movie.title
                  ? "/movies/" + generateSlug(movie.title, movie.id)
                  : ""
              }
            >
              <MoviePoster />
              <MovieTitle className="line-clamp-2 text-xs mt-1" />
            </Link>
          </MovieCard>
        ))}
      </div>
    </PageLayout>
  );
}
