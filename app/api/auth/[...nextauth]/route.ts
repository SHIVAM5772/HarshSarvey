import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions, isAuthConfigured } from "@/lib/auth";

const handler = NextAuth(authOptions);
async function handle(request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  if (!isAuthConfigured()) return Response.json({ error: "Admin login setup is pending." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  return handler(request, context);
}
export { handle as GET, handle as POST };
