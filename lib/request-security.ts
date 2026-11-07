export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(process.env.NEXTAUTH_URL || request.url).origin;
  return origin === expected;
}

const attempts = new Map<string, { count: number; expiresAt: number }>();
export function allowSubmission(key: string, now = Date.now()) {
  for (const [ip, value] of attempts) if (value.expiresAt <= now) attempts.delete(ip);
  const value = attempts.get(key);
  if (value && value.count >= 10) return false;
  if (value) value.count++;
  else {
    if (attempts.size >= 10000) return false;
    attempts.set(key, { count: 1, expiresAt: now + 60_000 });
  }
  return true;
}
