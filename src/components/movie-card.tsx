"use client";
import Image from "next/image";
import { createContext, PropsWithChildren, useContext } from "react";
import { baseUrlImage, PosterSize } from "../../config/tmdb";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ContextType {
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieCardContext = createContext<ContextType | undefined>(undefined);

const useMovieContext = () => {
  const context = useContext(MovieCardContext);

  if (!context) {
    throw new Error("only use Movie Context within MovieContextProvider");
  }
  return context;
};
interface Props extends PropsWithChildren {
  movie: ContextType;
  className?: string;
  size?: "md" | "lg" | "sm";
}
export function MovieCard({ movie, children, className, size = "md" }: Props) {
  return (
    <MovieCardContext.Provider value={movie}>
      <div
        className={cn(
          `border-none bg-inherit shadow-none overflow-hidden w-full ${
            size === "sm"
              ? "max-w-12 md:max-w-16 lg:max-w-20"
              : size === "md"
              ? "max-w-32 md:max-w-40 lg:max-w-48"
              : "max-w-40 md:max-w-48 lg:max-w-56 "
          }`,
          className
        )}
      >
        {children}
      </div>
    </MovieCardContext.Provider>
  );
}

export const MovieTitle = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg" | "sm";
}) => {
  const { title } = useMovieContext();
  const textSize =
    size === "sm"
      ? "text-xs md:text-sm lg:text-base"
      : size == "md"
      ? "text-base md:text-lg"
      : "text-lg md:text-xl";
  return (
    <h4
      className={cn(
        " flex justify-center text-left px-2 font-medium line-clamp-1",
        textSize,
        className
      )}
    >
      {title}
    </h4>
  );
};
interface PosterProps {
  className?: string;
  rating?: boolean;
  quality?: PosterSize;
  showTitile?: boolean;
}
export const MoviePoster = ({
  className,
  rating,
  quality = "w500",
  showTitile,
}: PosterProps) => {
  const { poster_path, title, vote_average } = useMovieContext();

  return (
    <div
      className={cn(
        "w-full relative z-[5] overflow-hidden border-4 flex justify-center items-center hover:border-green-500 transition-colors ease-in-out duration-300 border-white rounded-sm lg:rounded-md",
        className
      )}
    >
      <Image
        src={baseUrlImage + quality + poster_path}
        alt={title}
        width={150}
        height={233.33}
        placeholder="blur"
        loading="lazy"
        blurDataURL={baseUrlImage + "w92" + poster_path}
        className="size-full z-[1] object-cover object-center"
        title={showTitile ? title : undefined}
      />
      {rating && (
        <span className="absolute top-2 left-2 flex justify-center items-center backdrop-brightness-50 text-xs lg:text-base  text-white p-1 px-2 gap-1 rounded-md z-[6]">
          {vote_average.toFixed(2)}
          <Star strokeWidth={0} fill="yellow" className="size-4" />
        </span>
      )}
    </div>
  );
};
