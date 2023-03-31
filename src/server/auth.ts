import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import Credentials from "next-auth/providers/credentials";

type UserRole = "Admin" | "User";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: UserRole;
    };
  }
  interface User {
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET_TOKEN, maxAge: 24 * 60 * 60 },
  pages: { signIn: "/login" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        role: { label: "Role", type: "text", placeholder: "role" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Did not retrieve credentials");
        }

        // Sign In
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (!(user.role === "Admin" || user.role === "User")) {
          throw new Error("User has an invalid role");
        }

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
