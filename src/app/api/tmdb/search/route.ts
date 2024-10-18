import moviedb from "@/db/moviedb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.string();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const { success, data, error } = querySchema.safeParse(
      searchParams.get("query")
    );

    if (!success) {
      return NextResponse.json(
        { message: "Missing required fields: query", error },
        { status: 400 }
      );
    }

    const movies = await moviedb.searchMovie({
      query: data,
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
