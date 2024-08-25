import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { postSchema } from "./validation";
import moviedb from "@/db/moviedb";
import { addMovieToDB } from "@/app/actions/add-movie-to-db";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ message: "unauthorised" }, { status: 401 });
  const reviews = await prisma.review.findMany({
    select: {
      movie: true,
      comment: true,
      id: true,
      userID: true,
      rating: true,
      tmdbID: true,
    },
  });
  return NextResponse.json({ reviews }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "unauthorised" }, { status: 401 });
    const jsonBody = await request.json();
    const { success, data, error } = postSchema.safeParse(jsonBody);
    if (!success) {
      return NextResponse.json(
        {
          message: "Missing fields",
          error: error,
        },
        { status: 400 }
      );
    }
    const { rating, tmdbID, comment } = data;
    const movie = await moviedb.movieInfo({ id: tmdbID });
    const { id, title, poster_path, vote_average } = movie;
    if (!movie || !id || !title || !poster_path) {
      return NextResponse.json(
        {
          message: "Movie not found",
        },
        { status: 404 }
      );
    }
    let isMovieAddedToDB =
      (await prisma.movie.findUnique({
        where: {
          tmdbID: id,
        },
      })) ||
      (await addMovieToDB({
        poster_path: poster_path,
        title: title,
        tmdbID: id,
        vote_average: vote_average || 0,
      }));

    const review = await prisma.review.create({
      data: {
        comment,
        rating,
        userID: user?.id || "sanadh",
        tmdbID: isMovieAddedToDB.tmdbID,
      },
    });

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.review.deleteMany();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
