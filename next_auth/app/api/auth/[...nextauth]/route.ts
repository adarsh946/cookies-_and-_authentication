import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "username", placeholder: "username", type: "text" },
        password: {
          label: "password",
          placeholder: "password",
          type: "password",
        },
      },
      async authorize(credential: any) {
        console.log(credential);
        // some database validation here....
        return {
          id: "1",
          name: "Adarsh Shukla",
          email: "adarshshukla@gmail.com",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
