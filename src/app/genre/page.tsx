import { MovieCard, MovieTitle, MoviePoster } from "@/components/movie-card";
import PageLayout from "@/components/PageLayout";
import { fetchMovieByGenreId } from "@/db/services/tmdb";
import { z } from "zod";

const searchParamsSchema = z.object({
  genreId: z.string().min(1).regex(/^\d+$/),
  sort: z
    .enum([
      "original_title.asc",
      "original_title.desc",
      "popularity.asc",
      "popularity.desc",
      "revenue.asc",
      "revenue.desc",
      "primary_release_date.asc",
      "primary_release_date.desc",
      "title.asc",
      "title.desc",
      "vote_average.asc",
      "vote_average.desc",
      "vote_count.asc",
      "vote_count.desc",
    ])
    .default("popularity.desc"),
  page: z.string().min(1).regex(/^\d+$/).default("1"),
});

export default async function GenrePage({
  searchParams,
}: {
  searchParams: { genreId: string; sort: string; page: string };
}) {
  const { success, data, error } = searchParamsSchema.safeParse(searchParams);
  if (!success) {
    console.error(error);
    throw new Error("Invalid genre id");
  }

  const searchData = await fetchMovieByGenreId(
    data.genreId,
    data.sort,
    data.page
  );

  return (
    <PageLayout className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchData.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} className="gap-2">
            <MoviePoster />
            <MovieTitle />
          </MovieCard>
        ))}
      </div>
    </PageLayout>
  );
}
