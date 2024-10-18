import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "./schema";

export async function POST(request: NextRequest) {
  try {
    // const user = await currentUser();

    // if (!user)
    //   return NextResponse.json(
    //     {
    //       error: "unauthorised, please sign in",
    //     },
    //     { status: 401 }
    //   );

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
    const { poster, rating, title, tmdbID } = data;
    const movie = await prisma.movie.upsert({
      where: {
        tmdbID,
      },
      create: {
        title: title,
        poster_path: poster,
        tmdbID: tmdbID,
        vote_average: rating,
      },
      update: {
        title: title,
        poster_path: poster,
        tmdbID: tmdbID,
        vote_average: rating,
      },
    });

    const watched = await prisma.watched.findUnique({
      where: {
        tmdbID_userID: {
          tmdbID: movie.tmdbID,
          userID: user.id,
        },
      },
    });
    if (!watched) {
      await prisma.watched.create({
        data: {
          tmdbID: movie.tmdbID,
          userID: user.id,
        },
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
    const url = new URL(request.url);
    const tmdbID = url.searchParams.get("tmdbID");
    const user = await currentUser();
    if (!user)
      return NextResponse.json(
        {
          error: "Unauthorised. Please Log in",
        },
        { status: 401 }
      );

    if (!tmdbID)
      return NextResponse.json(
        {
          error: "Missing required fields: movieID",
        },
        { status: 400 }
      );

    const watched = await prisma.watched.findUnique({
      where: {
        tmdbID_userID: {
          tmdbID: Number(tmdbID),
          userID: user.id,
        },
      },
    });
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
    const user = await currentUser();

    if (!user)
      return NextResponse.json(
        {
          error: "Unauthorised. Please Log in",
        },
        { status: 401 }
      );

    const url = new URL(request.url);
    const tmdbID = url.searchParams.get("tmdbID");

    if (!tmdbID)
      return NextResponse.json(
        {
          error: "Missing required fields: movieID",
        },
        { status: 400 }
      );

    const record = await prisma.watched.findUnique({
      where: {
        tmdbID_userID: {
          tmdbID: Number(tmdbID),
          userID: user.id,
        },
      },
    });

    if (!record) {
      return NextResponse.json(
        {
          error: "Record does not exist.",
        },
        { status: 404 }
      );
    }

    await prisma.watched.delete({
      where: {
        id: record.id,
      },
    });

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
