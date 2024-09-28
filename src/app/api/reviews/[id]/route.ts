import prisma from "@/db/db";
import { NextResponse, NextRequest } from "next/server";
import { updateSchema } from "../validation";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user)
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
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // const user = await currentUser();
    // if (!user)
    //   return NextResponse.json(
    //     { error: "unauthorised, please sign in" },
    //     { status: 401 }
    //   );
    const id = params.id;
    if (!id)
      return NextResponse.json(
        { message: "Missing reviewID" },
        { status: 400 }
      );
    const review = await prisma.review.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // const user = await currentUser();
    // if (!user)
    //   return NextResponse.json(
    //     { error: "unauthorised, please sign in" },
    //     { status: 401 }
    //   );
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
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        rating,
        comment,
      },
    });
    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
