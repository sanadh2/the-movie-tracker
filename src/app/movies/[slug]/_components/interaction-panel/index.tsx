"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import AddReview from "./add-review";
import { useWatchlist } from "@/store/useWatchlist";
import { useSession } from "next-auth/react";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function InteractionPanel({
  tmdbID,
  movie,
}: {
  tmdbID: number;
  movie: {
    tmdbID: number | string;
    title: string;
    posterUrl: string | undefined | null;
    genres: { id: number; name: string }[];
  };
}) {
  const { isLoading, mutationAdd, mutationRemove, watchList, isRefetching } =
    useWatchlist();
  const isWatchListed = () => {
    return watchList && watchList.some((movie) => movie.tmdbID === tmdbID);
  };

  const { status } = useSession();

  console.log("session", status);

  return (
    <div className="p-5">
      {status === "loading" ? (
        <Loader />
      ) : status === "unauthenticated" ? (
        <div className="text-red-500 gap-2 flex justify-center items-center w-full">
          <p className=" text-center ">
            <Button
              className="p-0 text-current hover:text-current"
              asChild
              variant={"link"}
            >
              <Link href={"/auth/signin"}>login</Link>
            </Button>{" "}
            to add to watchlist, add review and like/unlike the movie
          </p>
          <TriangleAlert />
        </div>
      ) : (
        <div className="flex gap-3 mt-4">
          <AddReview movieID={tmdbID} />
          <Button
            variant={"destructive"}
            className="w-full gap-1 active:scale-100"
          >
            <span className="block">Like</span>
          </Button>
          <Button
            onClick={async () =>
              isWatchListed()
                ? await mutationRemove.mutateAsync(tmdbID)
                : await mutationAdd.mutateAsync({
                    poster: movie.posterUrl,
                    title: movie.title,
                    tmdbID,
                  })
            }
            className="w-full active:scale-100"
          >
            <span className="">watchlist</span>
          </Button>
        </div>
      )}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="max-w-full flex gap-2 items-center overflow-hidden">
      <button className="w-full h-10 bg-neutral-500 rounded-md px-4 inline-block  animate-pulse gap-1 active:scale-100"></button>
      <button className="w-full h-10 bg-neutral-500 rounded-md px-4 inline-block  animate-pulse gap-1 active:scale-100"></button>
      <button className="w-full h-10 bg-neutral-500 rounded-md px-4 inline-block  animate-pulse active:scale-100"></button>
    </div>
  );
};
