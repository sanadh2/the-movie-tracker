"use client";
import Image from "next/image";
import { createContext, PropsWithChildren, useContext } from "react";
import { baseUrlImage, PosterSize } from "../../config/tmdb";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ContextType {
  title: string;
  poster_path: string;
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
  quality?: PosterSize;
  showTitile?: boolean;
  similar?: boolean;
}
export const MoviePoster = ({
  className,
  quality = "w500",
  showTitile,
  similar,
}: PosterProps) => {
  const { poster_path, title } = useMovieContext();

  return (
    <div
      className={cn(
        "h-40 md:h-60 lg:h-80 w-full relative z-[5] aspect-[9/14] overflow-hidden border-4 flex justify-center items-center hover:border-green-500 transition-colors ease-in-out duration-300 border-white rounded-sm lg:rounded-md",
        className,
        similar && "border-green-500 h-28 md:h-28 lg:h-28"
      )}
    >
      <Image
        src={baseUrlImage + quality + poster_path}
        alt={title}
        width={450}
        height={700}
        placeholder="blur"
        priority
        blurDataURL={baseUrlImage + "w92" + poster_path}
        className="size-full z-[1] object-cover object-center"
        title={showTitile ? title : undefined}
      />
    </div>
  );
};
