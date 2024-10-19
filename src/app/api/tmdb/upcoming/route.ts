import moviedb from "@/db/moviedb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await moviedb.upcomingMovies({});
    movies.results = movies?.results?.sort((a, b) => {
      if (!a.release_date || !b.release_date) return 0;
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
