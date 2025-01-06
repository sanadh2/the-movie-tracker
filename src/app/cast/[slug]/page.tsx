import { fetchPersonInfo } from "@/db/services/tmdb";
import Image from "next/image";
import { baseUrlImage } from "../../../../config/tmdb";
import PageLayout from "@/components/PageLayout";

export default async function CastPage({ params }: { params: { id: string } }) {
  const actorId = params.id.split("-").pop();
  if (!actorId) return null;
  const person = await fetchPersonInfo(actorId);
  return (
    <PageLayout className="container mx-auto ">
      <h2 className="text-center text-3xl font-black">{person.name}</h2>
      <div className="flex gap-3 items-start mt-4">
        {person.profile_path && (
          <div className="relative h-60 aspect-[9/14] md:h-80 border">
            <Image
              alt=""
              loading="eager"
              blurDataURL={baseUrlImage + "w185" + person.profile_path}
              src={baseUrlImage + "w300" + person.profile_path}
              fill
              className="object-cover border"
            />
          </div>
        )}
        <div className="">
          <h5 className="text-xl underline mb-3">Biography</h5>
          <pre className="text-sm w-full max-w-full overflow-auto whitespace-pre-wrap font-sans">
            {person.biography}
          </pre>
        </div>
      </div>

      {/* <div className="grid gap-8 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {directedMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              title: movie.title || "",
              poster_path: movie.poster_path || "",
            }}
          >
            <Link href={"/movies/" + movie.id}>
              <MoviePoster />
              <MovieTitle className="line-clamp-2 text-xs mt-1" />
            </Link>
          </MovieCard>
        ))}
      </div> */}
    </PageLayout>
  );
}