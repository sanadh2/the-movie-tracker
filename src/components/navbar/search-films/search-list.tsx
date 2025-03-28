import Image from "next/image";
import { baseUrlImage } from "../../../../config/tmdb";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { MovieResultType } from "@/db/services/tmdb/types";
import { generateSlug } from "@/lib/slug";
interface Props {
  isLoading: boolean;
  data?: MovieResultType[];
  error: Error | null;
  close: () => void;
}
export default function SearchList({ isLoading, error, data, close }: Props) {
  if (isLoading) return <div>Loading...</div>;
  else if (error)
    return <div className="text-xs text-red-500">{error.message}</div>;
  return (
    <div className="grid place-items-center divide-y overflow-y-scroll max-h-[90vh] no-scrollbar grow h-full">
      {data?.length === 0 ? (
        <p>No results found</p>
      ) : (
        data?.map((movie) => (
          <Link
            href={"/movies/" + generateSlug(movie.title, movie.id)}
            key={movie.id}
            onClick={close}
            className=" w-full h-20 flex items-center gap-2 px-3"
          >
            <div className="relative aspect-[9/14] h-16">
              <Image
                alt=""
                src={baseUrlImage + "w92" + movie.poster_path}
                loading="lazy"
                quality={50}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center overflow-hidden h-fit gap-x-4 flex-wrap">
              <h3 className="text-sm">{movie.title}</h3>
              <p className="text-sm opacity-80">
                {movie.release_date &&
                  parseISO(movie.release_date) &&
                  format(parseISO(movie.release_date), "yyyy")}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
