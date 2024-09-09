import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User as PrismaUser } from "@prisma/client";
import prisma from "./prisma";

interface ExtendedUser extends PrismaUser {
  maxAge: number;
}

const THIRTY_DAYS = 30 * 24 * 60 * 60;
export const MILLISECONDS_TO_SECONDS: number = 1000;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "sign in",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const prismaUser = await prisma.user.findFirst({
          where: {
            OR: [{ username: credentials.email }, { email: credentials.email }],
          },
        });

        if (!prismaUser)
          throw new Error(
            "User with this email does not exist"
          );

        const passwordMatch = await compare(
          credentials.password,
          prismaUser.password
        );

        if (!passwordMatch)
          throw new Error(
            "Pasword does not match"
          );

        const maxAge = THIRTY_DAYS;
        const sessionExpiry = new Date();
        sessionExpiry.setSeconds(sessionExpiry.getSeconds() + THIRTY_DAYS);
        const { password, ...userProfile } = prismaUser;

        return { ...userProfile, maxAge };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        return {
          ...token,
          user: user as ExtendedUser,
        };
      }
      const { maxAge } = token.user as ExtendedUser;
      const newToken = {
        ...token,
        exp: Math.floor(Date.now() / MILLISECONDS_TO_SECONDS) + maxAge,
      };

      if (trigger === "update") {
        return {
          ...newToken,
          ...session,
        };
      }

      return newToken;
    },
    session: async ({ token, session }) => {
      const { maxAge } = token.user as ExtendedUser;
      const updatedSession = {
        ...session,
        user: token.user,
        expires: new Date(
          Date.now() + maxAge * MILLISECONDS_TO_SECONDS
        ).toISOString(),
      };

      return updatedSession;
    },
  },
};
