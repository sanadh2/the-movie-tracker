import { fetchUpcomingMovies } from "@/db/services/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await fetchUpcomingMovies();
    movies.results = movies?.results?.sort((a, b) => {
      if (!a.release_date || !b.release_date) return 0;
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
    return NextResponse.json({
      movies,
      message: "Upcoming Movies",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
