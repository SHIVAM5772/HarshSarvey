import test from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail, validatePersonalDetails } from "../lib/profile-validation.ts";

test("personal details validate calendar dates, phone numbers, and allowed genders", () => {
  const value = validatePersonalDetails({ name: " Ram Kumar ", phone: "+91 98765 43210", dob: "1990-06-15", gender: "Male", address: "Agra\nUttar Pradesh" });
  assert.equal(value.name, "Ram Kumar");
  assert.equal(value.address, "Agra\nUttar Pradesh");
  assert.deepEqual(validatePersonalDetails({}), { name: "", phone: "", dob: "", gender: "", address: "" });
  for (const input of [null, [], { name: { $ne: null } }, { phone: "123" }, { phone: "x9876543210" }, { dob: "2025-02-29" }, { dob: "2999-01-01" }, { dob: "1899-01-01" }, { gender: "bad" }, { address: "a".repeat(501) }, { name: "bad\u0000name" }]) assert.throws(() => validatePersonalDetails(input));
});

test("email normalization rejects injected, malformed, and header-bearing emails", () => {
  assert.equal(normalizeEmail(" Admin@Gmail.com "), "admin@gmail.com");
  for (const value of [{ $ne: null }, null, "invalid", "a@b", "a@gmail.com\r\nBcc:b@gmail.com", "a".repeat(255) + "@gmail.com"]) assert.equal(normalizeEmail(value), null);
});
