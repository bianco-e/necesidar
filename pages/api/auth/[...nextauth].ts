import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import UsersControllers from "../../../database/controllers/Users.controllers";
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
      // TODO: Check if token can be used to get more info from google users
      return token;
    },
    async session(session, token) {
      try {
        const user = await UsersControllers.createUserOrGetUserIfExists({
          ...session.user,
          //@ts-ignore
          google_id: token.sub,
          //@ts-ignore
          first_name: session.user?.name?.split(" ")[0],
          //@ts-ignore
          last_name: session.user?.name?.split(" ")[1],
        });
        return {
          ...session,
          user,
        };
      } catch (e) {
        console.error(e);
        return {
          user: undefined,
        };
      }
    },
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
