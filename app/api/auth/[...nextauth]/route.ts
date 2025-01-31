import NextAuth, { NextAuthOptions } from "next-auth";
import { authenticator } from "otplib";

const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTHENTICATOR_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    {
      id: "google-authenticator",
      name: "Google Authenticator",
      type: "credentials",
      credentials: {
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { code } = credentials;
        if (!code || !GOOGLE_AUTH_SECRET) {
          console.error("Missing OTP code or secret key.");
          return null;
        }

        if (authenticator.check(code, GOOGLE_AUTH_SECRET)) {
          return { id: "1", name: "asep", email: "asep@example.com" };
        }

        console.error("Invalid OTP code.");
        return null;
      },
    },
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
