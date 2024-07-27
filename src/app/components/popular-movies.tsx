import fetchWithAuth from "@/lib/fetch-with-auth";
import { type PopularMoviesData } from "@/types/movie-lists";
import MovieCarousal from "./movie-carousal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function PopularMovies() {
  const data = await fetchWithAuth("/movie/popular", { cache: "force-cache" });
  const jsonData: PopularMoviesData = await data.json();
  const { results } = jsonData;
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-medium mb-4">Popular Movies</h2>

        <Link href={"/popular-movies"}>
          <ArrowRight />
        </Link>
      </div>
      <MovieCarousal movies={results.slice(6, 18)} />
    </div>
  );
}
