import "server-only";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ObjectId } from "mongodb";
import { getDatabase, getUsers } from "./mongodb";
import { normalizeUsername, verifyPassword } from "./password";

export function isAuthConfigured() {
  return Boolean(process.env.MONGODB_URI && process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL);
}

export function isGoogleConfigured() {
  return isAuthConfigured() && Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider({
    name: "Admin login",
    credentials: { username: { label: "Username", type: "text" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      const username = normalizeUsername(credentials?.username);
      const password = credentials?.password;
      if (!username || typeof password !== "string" || !password || password.length > 256) return null;
      try {
        const db = await getDatabase();
        const window = Math.floor(Date.now() / 900_000);
        const attempt = await db.collection<{ _id: string; count: number; expiresAt: Date }>("adminLoginAttempts").findOneAndUpdate(
          { _id: `${username}:${window}` },
          { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * 900_000) } },
          { upsert: true, returnDocument: "after" },
        );
        if (!attempt || attempt.count > 10) return null;
        const user = await (await getUsers()).findOne({ usernameNormalized: username });
        const dummyHash = `scrypt:${"0".repeat(32)}:${"0".repeat(128)}`;
        const valid = await verifyPassword(password, user?.passwordHash || dummyHash);
        if (!valid || !user || user.role !== "admin" || user.isActive !== true) return null;
        return { id: user._id.toHexString(), name: user.username };
      } catch {
        throw new Error("Login is temporarily unavailable. Please try again later.");
      }
    },
  }), ...(isGoogleConfigured() ? [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization: { params: { prompt: "select_account" } },
  })] : [])],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin", error: "/admin" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
      if (account?.provider !== "google" || !profile || !("email_verified" in profile) || profile.email_verified !== true || typeof profile.email !== "string") return false;
      try {
        const admin = await (await getUsers()).findOne({ email: profile.email.trim().toLowerCase(), role: "admin", isActive: true });
        if (!admin) return false;
        user.id = admin._id.toHexString();
        user.name = admin.username;
        return true;
      } catch { return false; }
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.adminVerified = false;
        if (["credentials", "google"].includes(account.provider) && user?.id && ObjectId.isValid(user.id)) {
          const admin = await (await getUsers()).findOne({ _id: new ObjectId(user.id), role: "admin", isActive: true });
          if (admin) {
            token.adminVerified = true;
            token.sub = admin._id.toHexString();
            token.sessionVersion = admin.sessionVersion || 0;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = undefined;
      if (token.adminVerified !== true || !token.sub || !ObjectId.isValid(token.sub)) return session;
      try {
        const user = await (await getUsers()).findOne({ _id: new ObjectId(token.sub), role: "admin", isActive: true });
        if (user && (user.sessionVersion || 0) === (token.sessionVersion || 0)) session.user = { id: user._id.toHexString(), name: user.username, email: user.email };
      } catch { /* Database failures must never grant access. */ }
      return session;
    },
  },
};

export async function getAdminSession() {
  if (!isAuthConfigured()) return null;
  const session = await getServerSession(authOptions);
  return session?.user?.name ? session : null;
}
