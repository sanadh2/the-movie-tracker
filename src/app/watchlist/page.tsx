import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { auth } from "@/auth";
import LogIntoContinue from "@/components/log-into-continue";
import { db } from "@/db";
import { movieTable, watchedMoviesTable } from "@/db/schema/movie";
import { eq } from "drizzle-orm";

export default async function WatchListPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return <LogIntoContinue />;
  }
  const watchlist = await db
    .select({
      id: watchedMoviesTable.id,
      tmdbID: movieTable.tmdbID,
      title: movieTable.title,
      posterPath: movieTable.posterPath,
      createdAt: watchedMoviesTable.createdAt,
      updatedAt: watchedMoviesTable.updatedAt,
    })
    .from(watchedMoviesTable)
    .leftJoin(movieTable, eq(watchedMoviesTable.tmdbID, movieTable.tmdbID))
    .where(eq(watchedMoviesTable.userID, session.user.id));

  return (
    <PageLayout>
      <h2 className="text-center text-xl font-mono">My Watchlist</h2>
      <div className="flex justify-center w-full">
        <div className="grid-container mt-10 gap-10">
          {watchlist.map((movie) => (
            <div key={movie.id} className="w-full grid place-items-center">
              <MovieCard
                className="self-start"
                movie={{
                  title: movie.title || "",
                  poster_path: movie.posterPath || "",
                }}
              >
                <Link href={"/movies/" + movie.id}>
                  <MoviePoster className="" />
                  <MovieTitle className="line-clamp-2 text-xs md:text-sm mt-1" />
                </Link>
              </MovieCard>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}