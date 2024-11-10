import { fetchMovieById } from "@/db/services/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Missing required fields: id" },
        { status: 400 }
      );
    }
    const response = await fetchMovieById(params.id);

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
