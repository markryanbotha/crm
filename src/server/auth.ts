import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import Credentials from "next-auth/providers/credentials";

// Define custom types for the Session and user so that we can attach the necessary data
type UserRole = "Admin" | "User";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: UserRole;
      partnerId: string;
    };
  }
  interface User {
    role: UserRole;
    partnerId: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    // Function that attaches user details to jwt token
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.partner = user.partnerId;
      }

      return token;
    },
    // Function that defines the session details from the token
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.partnerId = token.partner as string;
      }

      return session;
    },
  },
  // Use sessions via Javascript Web Tokens
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET_TOKEN, maxAge: 24 * 60 * 60 },
  //Define the page that is used to signIn
  pages: { signIn: "/login" },
  // Allow nextAuth to communicate with Prisma
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        role: { label: "Role", type: "text", placeholder: "role" },
      },
      // This is the function that authorizes a user, by ensuring that their email address exists within the database
      // It retrieves the users id, email, role and their respective PartnerId to be used in the session cookie, which can be read in the frontend
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

        if (user.role === "Admin") {
          user.partnerId = "Admin"; // Admins are not assigned to a specific Partner, thus, assign an Admin partnerId
        }

        if (!user.partnerId) {
          throw new Error("User is not assigned to a Partner");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          partnerId: user.partnerId,
        };
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
