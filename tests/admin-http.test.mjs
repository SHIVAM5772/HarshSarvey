import test from "node:test";
import assert from "node:assert/strict";

// Run against the local production server before Google credentials are configured:
// $env:TEST_BASE_URL='http://localhost:3001'; npm test
const base = process.env.TEST_BASE_URL;
const options = { skip: !base };

test("admin data and updates reject anonymous and forged sessions", options, async () => {
  for (const cookie of ["", "next-auth.session-token=forged-client-admin"]) {
    const response = await fetch(`${base}/api/admin/inquiries`, { headers: { Cookie: cookie } });
    assert.equal(response.status, 401);
    assert.match(response.headers.get("cache-control"), /no-store/);
    assert.equal((await response.json()).error, "Admin login required.");
    const update = await fetch(`${base}/api/admin/inquiries/12345678-1234-1234-1234-123456789012`, { method: "PATCH", headers: { Cookie: cookie, "Content-Type": "application/json", Origin: "http://localhost:3000" }, body: JSON.stringify({ status: "Completed" }) });
    assert.equal(update.status, 401);
  }
});

test("public form rejects external origin and malformed enquiries", options, async () => {
  const external = await fetch(`${base}/api/inquiries`, { method: "POST", headers: { Origin: "https://attacker.example", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(external.status, 403);
  const invalid = await fetch(`${base}/api/inquiries`, { method: "POST", headers: { Origin: "http://localhost:3000", "Content-Type": "application/json" }, body: JSON.stringify({ name: "", phone: "12", service: "Solar", source: "quote" }) });
  assert.equal(invalid.status, 400);
});

test("without Google configuration, saving fails honestly and admin shows setup", options, async () => {
  const response = await fetch(`${base}/api/inquiries`, { method: "POST", headers: { Origin: "http://localhost:3000", "Content-Type": "application/json" }, body: JSON.stringify({ name: "Integration Test", phone: "9876543210", service: "Solar", source: "quote" }) });
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /being configured/);
  const auth = await fetch(`${base}/api/auth/session`);
  assert.equal(auth.status, 503);
  const page = await fetch(`${base}/admin`);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /Google sign-in setup is pending/);
  assert.match(html, /noindex/);
});
