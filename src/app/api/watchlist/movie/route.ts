import { auth } from "@/auth";
import { db } from "@/db";
import { movieTable, watchedMoviesTable } from "@/db/schema/movie";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tmdbSchema = z.string().regex(/^\d+$/).or(z.number());

const postSchema = z.object({
  poster: z.string(),
  rating: z.number(),
  title: z.string(),
  tmdbID: tmdbSchema,
});
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
    const { poster, rating, title, tmdbID } = data;

    const movie = await db
      .insert(movieTable)
      .values({
        title: title,
        posterPath: poster,
        voteAverage: rating.toString(),
        tmdbID: Number(tmdbID),
      })
      .onConflictDoUpdate({
        target: movieTable.tmdbID,
        set: {
          title: title,
          posterPath: poster,
          voteAverage: rating.toString(),
        },
      })
      .returning()
      .then((res) => res[0]);

    const watched = await db
      .select()
      .from(watchedMoviesTable)
      .where(
        and(
          eq(watchedMoviesTable.tmdbID, movie.tmdbID),
          eq(watchedMoviesTable.userID, session.user.id)
        )
      )
      .then((res) => res[0]);

    if (!watched) {
      await db.insert(watchedMoviesTable).values({
        tmdbID: movie.tmdbID,
        userID: session.user.id,
      });
    }

    return NextResponse.json(
      { message: "Added to watchlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );

    const url = new URL(request.url);
    const tmdbId = url.searchParams.get("tmdbID");
    const { data: tmdbID, success, error } = tmdbSchema.safeParse(tmdbId);
    if (!success)
      return NextResponse.json(
        {
          message: "Missing required fields: movieID",
          error: error,
        },
        { status: 400 }
      );

    const watched = await db
      .select()
      .from(watchedMoviesTable)
      .where(eq(watchedMoviesTable.tmdbID, Number(tmdbID)));

    return NextResponse.json({ watched }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );

    const url = new URL(request.url);
    const tmdbId = url.searchParams.get("tmdbID");
    const { data: tmdbID, success, error } = tmdbSchema.safeParse(tmdbId);
    if (!success)
      return NextResponse.json(
        {
          message: "Missing required fields: movieID",
          error: error,
        },
        { status: 400 }
      );

    const record = await db
      .select()
      .from(watchedMoviesTable)
      .where(
        and(
          eq(watchedMoviesTable.tmdbID, Number(tmdbID)),
          eq(watchedMoviesTable.userID, session.user.id)
        )
      )
      .then((res) => res[0]);

    if (!record) {
      return NextResponse.json(
        {
          error: "Record does not exist.",
        },
        { status: 404 }
      );
    }
    await db
      .delete(watchedMoviesTable)
      .where(eq(watchedMoviesTable.id, record.id));

    return NextResponse.json(
      { message: "Removed from watchlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during watchlist deletion:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
