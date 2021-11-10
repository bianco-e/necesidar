import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const dotenv = require("dotenv");
dotenv.config();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
