import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  const justReviewedReviewes = await prisma.review.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    select: {
      movie: true,
    },
  });
  const movies = justReviewedReviewes.map((review) => review.movie);
  return NextResponse.json({ movies }, { status: 200 });
}
