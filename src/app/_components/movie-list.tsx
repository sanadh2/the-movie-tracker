import Image from "next/image";
import { baseUrlImage } from "../../../config/tmdb";
import Link from "next/link";
import { MovieResultType } from "@/db/services/tmdb/types";
import { env } from "@/lib/env";

interface Props {
  movies?: MovieResultType[];
}
const MovieList = ({ movies }: Props) => {
  return (
    <div className="flex w-full gap-3 ">
      {movies?.map((movie) => (
        <Link
          prefetch
          href={env.NEXT_PUBLIC_API_BASE_URL + "/movies/" + movie.id}
          className="relative z-0 border border-secondary min-w-20 md:min-w-32 aspect-[9/14]"
          key={movie.id}
        >
          <Image
            alt={movie.title || "movie poster"}
            className="object-cover z-0"
            loading="lazy"
            title={movie.title}
            placeholder="blur"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            blurDataURL={baseUrlImage + "w92" + movie.poster_path}
            src={
              baseUrlImage + "w154" + movie.poster_path ||
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fimage-not-found&psig=AOvVaw2du4jPZlQXjlE8Tl280Tw2&ust=1723368310677000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCjl7WN6ocDFQAAAAAdAAAAABAE"
            }
            fill
          />
        </Link>
      ))}
    </div>
  );
};
export default MovieList;
