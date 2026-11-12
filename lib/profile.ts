import "server-only";
import type { AdminUser } from "./mongodb";
import type { ProfileData } from "./profile-validation";

export function serializeProfile(user: AdminUser): ProfileData {
  return {
    id: user._id.toHexString(), username: user.username, name: user.name || user.username,
    phone: user.phone || "", email: user.email || "", dob: user.dob || "", gender: user.gender || "", address: user.address || "",
    emailVerified: Boolean(user.emailVerifiedAt), createdAt: user.createdAt.toISOString(), updatedAt: user.updatedAt.toISOString(),
  };
}
