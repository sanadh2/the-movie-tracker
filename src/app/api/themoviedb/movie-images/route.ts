import moviedb from "@/db/moviedb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields: id" },
        { status: 400 }
      );
    }
    const movies = await moviedb.movieImages({
      id,
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
