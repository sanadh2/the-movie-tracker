"use server";
import { db } from "@/db";
import { movieTable } from "@/db/schema/movie";
import { InferInsertModel } from "drizzle-orm";

type AddMovieToDB = InferInsertModel<typeof movieTable>;
export const addMovieToDB = async (movie: AddMovieToDB) => {
  return await db
    .insert(movieTable)
    .values(movie)
    .returning()
    .then((res) => res[0]);
};
