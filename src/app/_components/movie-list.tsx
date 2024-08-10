import { MovieResult } from "moviedb-promise";
import Image from "next/image";
import { baseUrlImage } from "../../../config/tmdb";

interface MovieListProps {
  movies?: MovieResult[];
}
const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="flex w-full gap-3">
      {movies?.map((movie) => (
        <div
          className="relative z-0 border min-w-20 md:min-w-32 aspect-[9/14]"
          key={movie.id}
        >
          <Image
            alt={movie.title || "movie poster"}
            className="object-cover z-0"
            src={
              baseUrlImage + "w342" + movie.poster_path ||
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fimage-not-found&psig=AOvVaw2du4jPZlQXjlE8Tl280Tw2&ust=1723368310677000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCjl7WN6ocDFQAAAAAdAAAAABAE"
            }
            fill
          />
        </div>
      ))}
    </div>
  );
};
export default MovieList;
