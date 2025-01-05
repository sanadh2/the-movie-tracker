"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import AddReview from "./add-review";
import { useWatchlist } from "@/store/useWatchlist";
export default function InteractionPanel({
  tmdbID,
  movie,
}: {
  tmdbID: number;
  movie: {
    tmdbID: number | string;
    title: string;
    posterUrl: string;
    genres: { id: number; name: string }[];
  };
}) {
  const { isLoading, mutationAdd, mutationRemove, watchList, isRefetching } =
    useWatchlist();
  const isWatchListed = () => {
    return watchList && watchList.some((movie) => movie.tmdbID === tmdbID);
  };

  return (
    <div className="p-5">
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
    </div>
  );
}
