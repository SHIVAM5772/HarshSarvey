export const ADMIN_EMAIL = "sc698027@gmail.com";

export function isAdminEmail(email: unknown): boolean {
  return typeof email === "string" && email.trim().toLowerCase() === ADMIN_EMAIL;
}

export function canSignInAsAdmin(provider: unknown, profile: unknown): boolean {
  if (!profile || typeof profile !== "object") return false;
  const identity = profile as Record<string, unknown>;
  return provider === "google" && identity.email_verified === true && isAdminEmail(identity.email);
}
