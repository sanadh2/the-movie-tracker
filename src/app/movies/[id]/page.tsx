import React from "react";
import { fetchMovie } from "@/services/movie-service";
import { validateMovie } from "@/validators/movie-validator";
import BackgroundImage from "./components/background";
import PageLayout from "@/components/PageLayout";
import { WatchlistButton } from "./components/watchListButton";
import NotFound from "./not-found";
import { MovieCard, MoviePoster } from "@/components/movie-card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = params;
  const fetchData = await fetchMovie(id);
  if (!fetchData.ok) {
    return <NotFound />;
  }
  const movie = await fetchData.json();
  const { success, data: movieData, error } = validateMovie(movie);
  if (!success) {
    throw error;
  }

  return (
    <PageLayout>
      <BackgroundImage backdrop={movieData.backdrop_path} />
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">{movieData.title}</h2>
          <WatchlistButton movie={movieData} />
        </div>
        <div className="mt-10 flex justify-between flex-col md:flex-row">
          <div className="flex gap-3 flex-col lg:flex-row">
            <MovieCard movie={movieData} className="w-full">
              <MoviePoster />
            </MovieCard>
            <div className="md:w-1/2">
              <ScrollArea className="h-8 w-full">
                <div className="flex gap-3 w-full justify-start items-center">
                  {movieData.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="py-2 px-3 leading-3 rounded-full text-[5px] border border-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </ScrollArea>
              <p className="text-sm mt-3">{movieData.overview}</p>
            </div>
          </div>
          <div
            className="
            "
          >
            <iframe
              allowFullScreen
              allowTransparency
              className="rounded-xl h-40 md:h-60 aspect-[560/315]"
              src="https://www.youtube-nocookie.com/embed/8edS2o5RxJM?si=2FloNyZHn09VQhSM"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
