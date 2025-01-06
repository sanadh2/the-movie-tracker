import { db } from "@/db";
import { reviewTable } from "@/db/schema/movie";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  tmdbID: z.string().regex(/^\d+$/).or(z.number()),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { tmdbID: string } }
) {
  try {
    const { success, data, error } = schema.safeParse(params);
    if (!success)
      return NextResponse.json(
        { error, message: "Missing movieID" },
        { status: 400 }
      );
    const { tmdbID } = data;
    const reviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.tmdbID, Number(tmdbID)));

    return NextResponse.json(
      { reviews, message: "Reviews found" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
