import { SearchResults } from "../../services/search-movies";
import Image from "next/image";
import { baseUrlImage } from "../../../config/tmdb";
import { format, parseISO } from "date-fns";
interface Props {
  isLoading: boolean;
  data?: SearchResults[];
  error: Error | null;
}
export default function SearchList({ isLoading, error, data }: Props) {
  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;
  return (
    <div className="grid place-items-center divide-y overflow-y-scroll max-h-[90vh] no-scrollbar">
      {data?.length === 0 ? (
        <p>No results found</p>
      ) : (
        data?.map((movie) => (
          <div
            key={movie.id}
            className=" w-full h-20 flex items-center gap-2 px-3"
          >
            <div className="relative w-10 h-16">
              <Image
                alt=""
                src={baseUrlImage + "w92" + movie.poster_path}
                fill
                sizes="(40px)"
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
          </div>
        ))
      )}
    </div>
  );
}
