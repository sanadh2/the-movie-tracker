import { db } from "@/db";
import { reviewTable } from "@/db/schema/movie";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  movieID: z.string().regex(/^\d+$/),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { movieID: string } }
) {
  try {
    const { success, data, error } = schema.safeParse(params);
    if (!success)
      return NextResponse.json(
        { error, message: "Missing movieID" },
        { status: 400 }
      );
    const { movieID } = data;
    const reviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.tmdbID, Number(movieID)));

    return NextResponse.json(
      { reviews, message: "Reviews found" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
