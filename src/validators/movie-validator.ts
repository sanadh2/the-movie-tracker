import { movieSchema } from "@/types/movie-lists";

export function validateMovie(movie: any) {
  return movieSchema.safeParse(movie);
}
