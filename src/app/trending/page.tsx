import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import { PopularMoviesData } from "@/types/movie-lists";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2IyM2Q5NWRjZGVmMjFjYTJmZWExOGIzOWFiZWFkMSIsIm5iZiI6MTcyMjM0NzA2Ny4yNTgwMjIsInN1YiI6IjY2NmRlZmFhYWUxZDRiOTQ3NDZkYjU5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jy-HeIx2u8FysWAwaKOv3CMCNwfIbo-_gaLpJZHl2_E",
  },
};
export default async function TrendingPage() {
  const fetchData = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const data: PopularMoviesData = await fetchData.json();

  return (
    <PageLayout>
      <h2 className="text-center text-xl">Trending Movies</h2>
      <div className="grid gap-8 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie}>
            <MoviePoster />
            <MovieTitle className="line-clamp-2 text-xs mt-1" />
          </MovieCard>
        ))}
      </div>
    </PageLayout>
  );
}
