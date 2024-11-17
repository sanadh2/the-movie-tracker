import { db } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import { postSchema } from "./validation";
import { addMovieToDB } from "@/app/actions/add-movie-to-db";
import { auth } from "@/auth";
import { movieTable, reviewTable } from "@/db/schema/movie";
import { and, eq } from "drizzle-orm";
import { fetchMovieById } from "@/db/services/tmdb";

export async function GET() {
  const reviews = (await db.select().from(reviewTable)).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return NextResponse.json({ reviews }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );
    const body = await request.json();
    const { success, data, error } = postSchema.safeParse(body);
    if (!success) {
      return NextResponse.json(
        {
          message: "Missing fields",
          error: error,
        },
        { status: 400 }
      );
    }

    const isReviewExist = await db
      .select()
      .from(reviewTable)
      .where(
        and(
          eq(reviewTable.tmdbID, data.tmdbID),
          eq(reviewTable.userID, session.user.id)
        )
      )
      .then((res) => res[0]);

    if (isReviewExist) {
      return NextResponse.json(
        {
          message: "Review already exists",
        },
        { status: 400 }
      );
    }

    const { rating, tmdbID, comment } = data;
    const movie = await fetchMovieById(tmdbID);
    const { id, title, poster_path } = movie;
    if (!movie || !id || !title || !poster_path) {
      return NextResponse.json(
        {
          message: "Movie not found",
        },
        { status: 404 }
      );
    }

    let movieInDB = await db
      .select()
      .from(movieTable)
      .where(eq(movieTable.tmdbID, id))
      .then((res) => res[0]);

    if (!movieInDB) {
      movieInDB = await addMovieToDB({
        posterPath: poster_path,
        title: title,
        tmdbID: tmdbID,
      });
    }

    const review = await db.insert(reviewTable).values({
      reviewer: session.user.name || "Anonymous",
      comment,
      rating,
      userID: session.user.id,
      tmdbID: movieInDB.tmdbID,
    });

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await db.delete(reviewTable).execute();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
