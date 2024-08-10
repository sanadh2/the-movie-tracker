"use client";
import { useNowPlayingData } from "../_hooks/useNowPlayingData";
import Loading from "./loading";
import MovieList from "./movie-list";

export default function NowPlaying() {
  const { isLoading, error, data } = useNowPlayingData();

  return (
    <div className="">
      <h2>Now Playing</h2>
      <div className="mt-4 overflow-x-scroll no-scrollbar">
        {error || isLoading ? (
          <Loading />
        ) : (
          <MovieList movies={data?.results} />
        )}
      </div>
    </div>
  );
}
