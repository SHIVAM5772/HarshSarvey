import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword, normalizeUsername } from "../lib/password.ts";

test("password hashes use independent salts and reject wrong or malformed credentials", async () => {
  const password = "Test-password-123!";
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(first.includes(password), false);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword("Wrong-password-123!", first), false);
  for (const hash of [null, password, "scrypt:invalid:abcd"]) assert.equal(await verifyPassword(password, hash), false);
  assert.equal(await verifyPassword("a".repeat(257), first), false);
  await assert.rejects(hashPassword("short"));
});

test("username normalization rejects MongoDB query injection and invalid names", () => {
  assert.equal(normalizeUsername(" RamKumar "), "ramkumar");
  for (const value of [{ $ne: null }, null, "a", "$admin", "a".repeat(65)]) assert.equal(normalizeUsername(value), null);
});
