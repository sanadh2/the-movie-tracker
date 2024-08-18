"use server";
import prisma from "@/db/db";

interface AddMovieToDB {
  poster_path: string;
  title: string;
  tmdbID: number;
  vote_average: number;
}
export const addMovieToDB = async (movie: AddMovieToDB) => {
  return await prisma.movie.create({
    data: {
      ...movie,
    },
  });
};
