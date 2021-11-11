import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getToken } from "next-auth/jwt";
const dotenv = require("dotenv");
dotenv.config();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // step before calling session()
      // TODO: Check if token can be used token to get more info from google users
      return token;
    },
    async session(session, token) {
      return {
        ...session,
        user: {
          ...session.user,
          google_id: token.sub,
          first_name: session.user?.name?.split(" ")[0],
          last_name: session.user?.name?.split(" ")[1],
        },
      };
    },
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
