"use client";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { createContext, PropsWithChildren, useContext } from "react";
import { baseUrlImage } from "../../config/tmdb";
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
}
export function MovieCard(props: Props) {
  return (
    <MovieCardContext.Provider value={props.movie}>
      <Card className="w-32 md:w-40 lg:w-48 border-hidden bg-inherit shadow-none">
        {props.children}
      </Card>
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
    size === "sm" ? "text-xs" : size == "md" ? "text-base" : "text-lg";
  return (
    <CardTitle
      className={cn(
        " flex justify-center text-left px-2 font-medium line-clamp-1",
        textSize,
        className
      )}
    >
      {title}
    </CardTitle>
  );
};

export const MoviePoster = ({ className }: { className?: string }) => {
  const { poster_path, title, vote_average } = useMovieContext();

  return (
    <div
      className={cn(
        "w-full overflow-hidden relative z-[5] border-2 flex justify-center items-center  dark:border-white rounded-md sm:rounded-lg",
        className
      )}
    >
      <Image
        src={baseUrlImage + "w500" + poster_path}
        alt={title}
        width={225}
        height={350}
        placeholder="blur"
        loading="lazy"
        blurDataURL={baseUrlImage + "w92" + poster_path}
        className="size-full z-[1] object-contain object-center"
      />
      <span className="absolute top-2 left-2 flex justify-center items-center backdrop-brightness-50 text-xs  text-white p-1 px-2 gap-1 rounded-md z-[6]">
        {vote_average.toFixed(2)}
        <Star strokeWidth={0} fill="yellow" className="size-4" />
      </span>
    </div>
  );
};
