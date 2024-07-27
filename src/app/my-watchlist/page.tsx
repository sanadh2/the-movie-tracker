import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function watchlistPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return <></>;

  const watchlist = await prisma.watched.findMany({
    where: {
      userID: user.id,
    },
    include: {
      movie: true,
    },
  });
  return (
    <PageLayout className="container">
      <h2 className="text-xl text-center font-semibold">WatchList</h2>
      <div className="mt-10 grid place-items-center grid-cols-5 container gap-8 w-full">
        {watchlist.map((watchedMovie) => {
          const { movie } = watchedMovie;
          return (
            <Link
              key={movie.id}
              href={"/movies/" + movie.tmdbID}
              className="self-start"
            >
              <MovieCard movie={movie}>
                <MoviePoster />
                <MovieTitle />
              </MovieCard>
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
}
