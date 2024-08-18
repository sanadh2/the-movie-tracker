"use client";
import { useUpcomingData } from "../_hooks/useUpcomingData";
import Loading from "./loading";
import MovieList from "./movie-list";

export default function Upcoming() {
  const { isLoading, error, data } = useUpcomingData();
  if (error) {
    throw error;
  }
  return (
    <div className="">
      <h2>Upcoming</h2>
      <div className="mt-4 overflow-x-scroll no-scrollbar">
        {isLoading ? <Loading /> : <MovieList movies={data?.results} />}
      </div>
    </div>
  );
}
