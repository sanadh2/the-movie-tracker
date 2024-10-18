import moviedb from "@/db/moviedb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await moviedb.upcomingMovies({});
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
