import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MovieCard, MoviePoster, MovieTitle } from "@/components/movie-card";
import Link from "next/link";

interface Props {
  movies: {
    id: number;
    vote_average: number;
    poster_path: string;
    title: string;
  }[];
}
export default function MovieCarousal({ movies }: Props) {
  return (
    <Carousel
      opts={{
        dragFree: true,
        slidesToScroll: 2,
      }}
      className="w-full"
    >
      <CarouselContent className="">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="basis-auto px-6">
            <Link href={`/movies/${movie.id}`} className="">
              <MovieCard movie={movie}>
                <MoviePoster />
                <div className="hidden md:block">
                  <MovieTitle />
                </div>
              </MovieCard>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
