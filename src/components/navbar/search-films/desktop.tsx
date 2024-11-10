"use client";
import { useDebounce } from "@uidotdev/usehooks";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { baseUrlImage } from "../../../../config/tmdb";
import { parse, format } from "date-fns";
import useSearchData from "../../../store/useSearch";
import SearchInput from "./search-input";
import { useSearch } from "./useSearch";

export default function SearchFilmsInDesktop() {
  const { search, setSearch } = useSearch();
  const debouncedValue = useDebounce(search, 600);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useSearchData(
    {
      query: debouncedValue,
    },
    ["search", debouncedValue]
  );
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  if (error) console.log(error.message);
  const handleFocusBlur = async (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.type === "focus") {
      setIsSearchFocused(true);
    } else if (e.type === "blur") {
      setTimeout(() => {
        setIsSearchFocused(false);
      }, 400);
    }
  };

  return (
    <div className="relative z-10 max-w-96 hidden md:block">
      <SearchInput
        handleFocusBlur={handleFocusBlur}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
      />
      {
        <div
          ref={dropdownRef}
          className={`absolute top-full w-full transition-all duration-200 ease-in-out ${
            isSearchFocused && data ? "block" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="border mt-3 dark:border-white border-t-transparent rounded-b-2xl w-full bg-white dark:bg-black p-2 hidden md:block">
            <div className="max-h-80 no-scrollbar overflow-y-scroll h-full">
              <div className="grid gap-2">
                {data &&
                data.movies.results &&
                data.movies.results.length > 0 ? (
                  data.movies.results.map((movie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      onClick={() => setSearch("")}
                      key={movie.id}
                      className=" flex items-center hover:bg-stone-100 hover:dark:bg-stone-900 rounded p-2"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          loading="eager"
                          priority
                          fetchPriority="high"
                          quality={60}
                          src={baseUrlImage + "w92" + movie.poster_path}
                          width={30}
                          height={50}
                          className=""
                          alt={"poster"}
                        />
                        {movie.title}&nbsp;&nbsp;&nbsp;
                        {movie.release_date &&
                          parse(movie.release_date, "yyyy-MM-dd", new Date()) &&
                          format(
                            parse(movie.release_date, "yyyy-MM-dd", new Date()),
                            "yyyy"
                          )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
