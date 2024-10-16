import { db, users } from "@/db/user/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { sendMail } from "@/lib/send-mail";
import { generateOTP } from "@/lib/generate-otp";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { success, data, error } = bodySchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      {
        message: "Missing fields",
        error: error,
      },
      { status: 400 }
    );
  }
  const { email, name, password } = data;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1)
    .then((users) => users[0]);
  const otp = generateOTP();

  if (existingUser) {
    if (existingUser.isEmailVerified && existingUser.password) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    } else {
      await db
        .update(users)
        .set({ otp, password: await bcrypt.hash(password, 12) })
        .where(eq(users.email, email));
      sendMail({
        email,
        otp,
        reason: "activateAccount",
        subject: "Activate your account",
      });
    }
    return NextResponse.json({ message: "check your mail" }, { status: 201 });
  }

  await db.insert(users).values({
    email,
    name,
    password: await bcrypt.hash(password, 12),
    isEmailVerified: false,
    otp,
  });

  sendMail({
    email,
    otp,
    reason: "activateAccount",
    subject: "Activate your account",
  });

  return NextResponse.json({ message: "check your mail" }, { status: 200 });
};

const bodySchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string().min(3),
});
