import { auth } from "@/auth";
import { db } from "@/db";
import { watchedMoviesTable } from "@/db/schema/movie";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return NextResponse.json(
      { error: "unauthorised, please sign in" },
      { status: 401 }
    );
  const watchlist = await db
    .select()
    .from(watchedMoviesTable)
    .where(eq(watchedMoviesTable.userID, session.user.id));

  return NextResponse.json({ watchlist }, { status: 200 });
}
