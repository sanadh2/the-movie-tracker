import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { movieID: string } }
) {
  try {
    const movieID = params.movieID;
    if (!movieID)
      return NextResponse.json({ error: "Missing movieID" }, { status: 400 });
    const reviews = await prisma.review.findMany({
      where: {
        tmdbID: Number(movieID),
      },
    });
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
