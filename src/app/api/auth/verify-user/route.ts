import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, otp } = body;
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((users) => users[0]);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { message: "User already verified" },
        { status: 400 }
      );
    }
    if (user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    await db
      .update(users)
      .set({ emailVerified: new Date(), otp: null, isEmailVerified: true })
      .where(eq(users.email, email));

    return NextResponse.json({ message: "Account verified" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
