import { auth } from "@/auth";
import { db } from "@/db";
import { movieTable, watchedMoviesTable } from "@/db/schema/movie";
import logger from "@/lib/winston";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      logger.warn("unauthorised, please sign in");
      return NextResponse.json(
        { message: "unauthorised, please sign in" },
        { status: 401 }
      );
    }
    const watchlist = await db
      .select({
        id: watchedMoviesTable.id,
        tmdbID: watchedMoviesTable.tmdbID,
        createdAt: watchedMoviesTable.createdAt,
        updatedAt: watchedMoviesTable.updatedAt,
        title: movieTable.title,
        posterPath: movieTable.posterPath,
      })
      .from(watchedMoviesTable)
      .innerJoin(movieTable, eq(movieTable.tmdbID, watchedMoviesTable.tmdbID))
      .where(eq(watchedMoviesTable.userID, session.user.id));

    logger.info(
      "Watchlist fetched successfully with length: " + watchlist.length
    );

    return NextResponse.json(
      { watchlist, message: "Watchlist found" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching watchlist" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
