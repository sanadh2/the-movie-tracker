import fetchWithAuth from "@/lib/fetch-with-auth";
import { type PopularMoviesData } from "@/types/movie-lists";
import MovieCarousal from "./movie-carousal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function NowPlaying() {
  const data = await fetchWithAuth("/movie/now_playing", {
    cache: "force-cache",
  });
  const jsonData: PopularMoviesData = await data.json();
  const { results } = jsonData;

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-medium mb-4">Now Playing</h2>

        <Link href={"/popular-movies"}>
          <ArrowRight />
        </Link>
      </div>
      <MovieCarousal movies={results.slice(0, 10)} />
    </div>
  );
}
