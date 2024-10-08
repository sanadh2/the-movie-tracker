import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ message: "unauthorised" }, { status: 401 });
  const watchlist = await prisma.watched.findMany({
    where: {
      userID: user.id,
    },
    include: {
      movie: true,
    },
  });
  return NextResponse.json({ watchlist }, { status: 200 });
}
