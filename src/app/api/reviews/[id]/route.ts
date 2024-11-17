import { db } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import { updateSchema } from "../validation";
import { auth } from "@/auth";
import { reviewTable } from "@/db/schema/movie";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );
    const id = params.id;
    if (!id)
      return NextResponse.json(
        { message: "Missing reviewID" },
        { status: 400 }
      );

    const review = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.id, id))
      .then((res) => res[0]);

    return NextResponse.json(
      { review, message: "Review found" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );
    const id = params.id;
    if (!id)
      return NextResponse.json(
        { message: "Missing reviewID" },
        { status: 400 }
      );
    await db.delete(reviewTable).where(eq(reviewTable.id, id));
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { error: "unauthorised, please sign in" },
        { status: 401 }
      );
    const id = params.id;
    if (!id)
      return NextResponse.json(
        { message: "Missing reviewID" },
        { status: 400 }
      );
    const jsonBody = await request.json();
    const { success, data, error } = updateSchema.safeParse(jsonBody);
    if (!success) {
      return NextResponse.json(
        {
          message: "Missing fields",
          error: error,
        },
        { status: 400 }
      );
    }
    const { rating, comment } = data;
    const review = await db
      .update(reviewTable)
      .set({
        rating,
        comment,
      })
      .where(eq(reviewTable.id, id));

    return NextResponse.json(
      { review, message: "Review updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
