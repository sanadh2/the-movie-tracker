import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getUserByEmail } from "./db/services/users";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";
import { db } from "./db";
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
        const user = await getUserByEmail(email);
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
  trustHost: true,
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

const isSamePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
