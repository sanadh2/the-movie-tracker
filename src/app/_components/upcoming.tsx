"use client";
import { useUpcomingData } from "../_hooks/useUpcomingData";
import Loading from "./loading";
import MovieList from "./movie-list";

export default function Upcoming() {
  const { isLoading, error, data } = useUpcomingData();

  return (
    <div className="">
      <h2>Upcoming</h2>
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
