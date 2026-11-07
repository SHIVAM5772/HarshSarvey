import "server-only";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { canSignInAsAdmin, isAdminEmail } from "./admin-policy";

export function isAuthConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    authorization: { params: { scope: "openid email profile", prompt: "select_account" } },
  })],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin", error: "/admin" },
  callbacks: {
    async signIn({ account, profile }) {
      return canSignInAsAdmin(account?.provider, profile);
    },
    async jwt({ token, account, profile }) {
      if (account) token.adminVerified = canSignInAsAdmin(account.provider, profile);
      return token;
    },
    async session({ session, token }) {
      // Only server-issued, verified Google identities can retain an admin session.
      if (token.adminVerified !== true || !isAdminEmail(token.email)) session.user = undefined;
      else if (session.user) session.user.email = token.email;
      return session;
    },
  },
};

export async function getAdminSession() {
  if (!isAuthConfigured()) return null;
  const session = await getServerSession(authOptions);
  return isAdminEmail(session?.user?.email) ? session : null;
}
