import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getAdminSession } from "@/lib/auth";
import { getUsers } from "@/lib/mongodb";
import { serializeProfile } from "@/lib/profile";
import { isMailConfigured } from "@/lib/mail";
import ProfileWorkspace from "./ProfileWorkspace";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My profile | Harsh Survey", robots: { index: false, follow: false } };
export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const session = await getAdminSession();
  if (!session?.user) redirect("/admin");
  const user = await (await getUsers()).findOne({ _id: new ObjectId(session.user.id), role: "admin", isActive: true });
  if (!user) redirect("/admin");
  const { section } = await searchParams;
  const initialSection = section === "new" || section === "password" || section === "email" || section === "edit" ? section : null;
  return <ProfileWorkspace initialProfile={serializeProfile(user)} mailReady={isMailConfigured()} initialSection={initialSection} />;
}
