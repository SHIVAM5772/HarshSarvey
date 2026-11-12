export const GENDERS = ["Male", "Female", "Non-binary", "Other", "Prefer not to say"] as const;
export type PersonalDetails = { name: string; phone: string; dob: string; gender: string; address: string };
export type ProfileData = PersonalDetails & { id: string; username: string; email: string; emailVerified: boolean; createdAt: string; updatedAt: string };

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}$/i.test(email) ? email : null;
}

export function validatePersonalDetails(value: unknown): PersonalDetails {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Enter valid personal details.");
  const body = value as Record<string, unknown>;
  function field(key: string, max: number) {
    const input = body[key];
    if (input === undefined || input === "") return "";
    if (typeof input !== "string" || input.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(input)) throw new Error(`Enter a valid ${key}.`);
    return input.trim();
  }
  const name = field("name", 100);
  const phone = field("phone", 25);
  const dob = field("dob", 10);
  const gender = field("gender", 30);
  const address = field("address", 500);
  if (phone && (!/^[+\d\s()-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, "")))) throw new Error("Enter a valid phone number.");
  if (dob && (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || !Number.isFinite(Date.parse(dob)) || new Date(dob).toISOString().slice(0, 10) !== dob || dob < "1900-01-01" || dob > new Date().toISOString().slice(0, 10))) throw new Error("Enter a valid date of birth, not in the future.");
  if (gender && !GENDERS.includes(gender as typeof GENDERS[number])) throw new Error("Choose a valid gender.");
  return { name, phone, dob, gender, address };
}
