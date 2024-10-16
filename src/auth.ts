import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, users } from "./db/user/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}
const providers: Provider[] = [
  Github({}),
  Google({}),
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await getUser(email);
        if (!user || !user.password) throw new InvalidLoginError();
        const isPasswordSame = await isSamePassword(password, user.password);
        if (!isPasswordSame) throw new InvalidLoginError();
        const { password: pw, ...rest } = user;
        return rest;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  }),
];
export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/personal-info",
  },
  session: {
    strategy: "jwt",
  },
};

const getUser = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(
      and(eq(users.email, email.toLowerCase()), eq(users.isEmailVerified, true))
    )
    .limit(1)
    .then((users) => users[0]);
};

const isSamePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
