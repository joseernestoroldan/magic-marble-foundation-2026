import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import "next-auth/jwt";
import { cache } from "react";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { db } from "./db";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth({
  pages:{
    signIn: "/login",
    error: "/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {

    async signIn({user, account}){
      if (account?.provider !== "credentials"){
        return true
      }
     if(!user.id) return false
      const existingUser = await getUserById(user.id)

      if(!existingUser?.emailVerified) return false
      return true
    },


    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

const auth = cache(uncachedAuth);
export { auth, handlers, signIn, signOut };
