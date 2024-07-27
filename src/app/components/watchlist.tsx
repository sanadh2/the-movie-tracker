import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import MovieCarousal from "./movie-carousal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function Watchlist() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user)
    return (
      <div className="w-full flex justify-center items-center h-full">
        please{" "}
        <Button asChild variant={"link"} className="p-1">
          <LoginLink postLoginRedirectURL="/">sign in</LoginLink>
        </Button>{" "}
        to see your watchlist
      </div>
    );

  const watchlist = await prisma.watched.findMany({
    where: {
      userID: user.id,
    },
    include: {
      movie: true,
    },
  });
  const movies = watchlist.map((watchMovie) => {
    const { tmdbID, poster_path, vote_average, title } = watchMovie.movie;
    return { id: tmdbID, title, poster_path, vote_average };
  });

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-medium   mb-4 ">Watchlist</h2>

        <Link href={"/my-watchlist"}>
          <ArrowRight />
        </Link>
      </div>
      <MovieCarousal movies={movies.slice(0, 9)} />
    </div>
  );
}
