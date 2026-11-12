import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (error, key) => error ? reject(error) : resolve(key));
  });
}

export function normalizeUsername(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const username = value.trim().toLowerCase();
  return /^[a-z0-9_.-]{3,64}$/.test(username) ? username : null;
}

export async function hashPassword(password: string) {
  if (password.length < 12 || password.length > 256) throw new Error("Password must contain 12 to 256 characters.");
  const salt = randomBytes(16).toString("hex");
  return `scrypt:${salt}:${(await derive(password, salt)).toString("hex")}`;
}

export async function verifyPassword(password: string, encoded: unknown) {
  if (typeof encoded !== "string" || password.length > 256) return false;
  const match = /^scrypt:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(encoded);
  if (!match) return false;
  return timingSafeEqual(await derive(password, match[1]), Buffer.from(match[2], "hex"));
}
