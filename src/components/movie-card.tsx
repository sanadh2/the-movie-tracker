"use client";
import Image, { ImageLoader, ImageLoaderProps } from "next/image";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { baseUrlImage, PosterSize } from "../../config/tmdb";
import { cn } from "@/lib/utils";

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
      <div className={cn(`w-fit aspect-[11/12]`, className)}>{children}</div>
    </MovieCardContext.Provider>
  );
}

export const MovieTitle = ({ className }: { className?: string }) => {
  const { title } = useMovieContext();
  return (
    <div className=" flex justify-center">
      <h5
        className={cn(
          " px-2 font-medium line-clamp-1 text-xs md:text-sm",
          className
        )}
      >
        {title}
      </h5>
    </div>
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
  const [src, setSrc] = useState(`${baseUrlImage}${quality}${poster_path}`);
  const imageLoader: ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="w-full px-4 flex justify-center items-center">
      <div
        className={cn(
          "h-60 aspect-[9/14] md:h-80 border relative",
          className,
          similar && "border-green-500 h-28 md:h-28 lg:h-28"
        )}
      >
        <Image
          src={src}
          alt={title}
          width={450}
          height={700}
          placeholder="blur"
          priority
          loader={imageLoader}
          onError={(e) => {
            console.log("Image not found, using fallback.");
            e.preventDefault();
            setSrc("https://m.media-amazon.com/images/I/61s8vyZLSzL.jpg");
          }}
          blurDataURL={`${baseUrlImage}w92${poster_path}`}
          className="size-full z-[1] object-cover object-center transition-colors ease-in-out duration-300"
          title={showTitile ? title : undefined}
        />
      </div>
    </div>
  );
};
