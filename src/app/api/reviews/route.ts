import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { postSchema } from "./validation";
import moviedb from "@/db/moviedb";
import { addMovieToDB } from "@/app/actions/add-movie-to-db";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "unauthorised, please sign in" }, { status: 401 });
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
      return NextResponse.json({ error: "unauthorised, please sign in" }, { status: 401 });
    const jsonBody = await request.json();
    const isReviewExist = await prisma.review.findUnique({
      where: {
        tmdbID_userID: {
          tmdbID: jsonBody.tmdbID,
          userID: user.id,
        },
      },
    });

    if (isReviewExist) {
      return NextResponse.json(
        {
          message: "Review already exists",
        },
        { status: 400 }
      );
    }
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
    let movieInDB = await prisma.movie.findUnique({
      where: { tmdbID: id },
    });

    if (!movieInDB) {
      movieInDB = await addMovieToDB({
        poster_path,
        title,
        tmdbID,
        vote_average: vote_average ?? 0,
      });
    }

    const review = await prisma.review.create({
      data: {
        name: user.fullName,
        username: user.username,
        comment,
        rating,
        userID: user.id,
        tmdbID: movieInDB.tmdbID,
      },
    });

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.review.deleteMany();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
