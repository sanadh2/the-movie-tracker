"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader } from "lucide-react";
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
    <div className="p-5 border rounded-md find-overflow">
      <h2 className="font-mono text-center text-xl"> Interaction Panel </h2>
      <div className="flex gap-3 mt-4">
        <AddReview movieID={tmdbID} />
        <Button
          variant={"destructive"}
          className="w-full gap-1 active:scale-100"
        >
          <Heart className="size-4" />
          Like
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
          className="w-full active:scale-100 size-auto"
        >
          {isLoading ? (
            <span className="flex gap-2 items-center">
              loading...
              <Loader className="animate-spin duration-1000" />
            </span>
          ) : isRefetching ? (
            <span className="flex gap-2 items-center">
              {isWatchListed()
                ? "removing from watchlist"
                : "adding to watch list"}
              <Loader className="animate-spin duration-1000" />
            </span>
          ) : isWatchListed() ? (
            "remove from watchlist"
          ) : (
            "add to watch list"
          )}
        </Button>
      </div>
    </div>
  );
}
