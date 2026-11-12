import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, isInquiryStatus } from "../lib/inquiry-validation.ts";
import { allowSubmission, isSameOrigin } from "../lib/request-security.ts";

const valid = { name: "Test Customer", phone: "+91 98765 43210", service: "Solar survey", source: "quote" };
test("valid form input is trimmed and optional fields are normalized", () => {
  const result = validateInquiry({ ...valid, name: "  Test Customer  ", message: "Two-line\nproject scope" });
  assert.equal(result.name, "Test Customer");
  assert.equal(result.organization, "");
  assert.equal(result.message, "Two-line\nproject scope");
  assert.equal(result.source, "quote");
  assert.equal(validateInquiry({ ...valid, source: "contact", email: "test@example.com" }).email, "test@example.com");
});

test("rejects incomplete, oversized, malformed and non-string enquiry fields", () => {
  for (const value of [null, [], {}, { ...valid, name: " " }, { ...valid, phone: "123" }, { ...valid, phone: "javascript:alert(1)" }, { ...valid, phone: "1234567890123456" }, { ...valid, email: "invalid" }, { ...valid, source: "admin" }, { ...valid, name: { injected: true } }, { ...valid, message: "x".repeat(4001) }, { ...valid, name: "bad\u0000name" }]) {
    assert.throws(() => validateInquiry(value));
  }
});

test("status allowlist prevents arbitrary writes through status endpoint", () => {
  for (const status of ["New", "Contacted", "Completed"]) assert.equal(isInquiryStatus(status), true);
  for (const status of ["Deleted", "=IMPORTXML()", null, {}, "completed"]) assert.equal(isInquiryStatus(status), false);
});

test("same-origin check rejects missing and external origins", () => {
  const previous = process.env.NEXTAUTH_URL;
  process.env.NEXTAUTH_URL = "https://harsh.example";
  try {
    assert.equal(isSameOrigin(new Request("https://internal.example/api/inquiries", { headers: { origin: "https://harsh.example" } })), true);
    assert.equal(isSameOrigin(new Request("https://harsh.example/api/inquiries", { headers: { origin: "https://attacker.example" } })), false);
    assert.equal(isSameOrigin(new Request("https://harsh.example/api/inquiries")), false);
  } finally {
    if (previous === undefined) delete process.env.NEXTAUTH_URL;
    else process.env.NEXTAUTH_URL = previous;
  }
});

test("submission throttle stops bursts and expires the limit", () => {
  const now = Date.now();
  for (let i = 0; i < 10; i++) assert.equal(allowSubmission("test-ip", now), true);
  assert.equal(allowSubmission("test-ip", now), false);
  assert.equal(allowSubmission("other-test-ip", now), true);
  assert.equal(allowSubmission("test-ip", now + 60001), true);
});
