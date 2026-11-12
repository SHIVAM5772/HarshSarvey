import test from "node:test";
import assert from "node:assert/strict";

// Run against a local production server:
// $env:TEST_BASE_URL='http://localhost:3001'; npm test
const base = process.env.TEST_BASE_URL;
const options = { skip: !base };

test("Google login exposes the provider and starts the OAuth redirect", { skip: !base || process.env.TEST_GOOGLE_PROVIDER !== "true" }, async () => {
  const providers = await fetch(`${base}/api/auth/providers`);
  assert.equal((await providers.json()).google?.id, "google");
  const csrf = await fetch(`${base}/api/auth/csrf`);
  const cookie = csrf.headers.getSetCookie().map(header => header.split(";")[0]).join("; ");
  const { csrfToken } = await csrf.json();
  const start = await fetch(`${base}/api/auth/signin/google`, {
    method: "POST", headers: { Cookie: cookie, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, callbackUrl: `${base}/admin`, json: "true" }),
  });
  assert.equal(start.status, 200);
  const url = new URL((await start.json()).url);
  assert.equal(url.hostname, "accounts.google.com");
  assert.equal(new URL(url.searchParams.get("redirect_uri")).pathname, "/api/auth/callback/google");
});

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

test("without configuration, saving fails honestly and admin shows setup", { skip: !base || process.env.TEST_UNCONFIGURED !== "true" }, async () => {
  const response = await fetch(`${base}/api/inquiries`, { method: "POST", headers: { Origin: "http://localhost:3000", "Content-Type": "application/json" }, body: JSON.stringify({ name: "Integration Test", phone: "9876543210", service: "Solar", source: "quote" }) });
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /being configured/);
  const auth = await fetch(`${base}/api/auth/session`);
  assert.equal(auth.status, 503);
  const page = await fetch(`${base}/admin`);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /Admin login setup is pending/);
  assert.match(html, /noindex/);
});

test("MongoDB admin can sign in, access the dashboard, and sign out", { skip: !base || !process.env.TEST_ADMIN_PASSWORD }, async () => {
  const cookies = new Map();
  function capture(response) {
    for (const header of response.headers.getSetCookie()) {
      const pair = header.split(";")[0];
      const index = pair.indexOf("=");
      cookies.set(pair.slice(0, index), pair.slice(index + 1));
    }
  }
  function cookie() { return Array.from(cookies, ([key, value]) => `${key}=${value}`).join("; "); }
  const csrf = await fetch(`${base}/api/auth/csrf`);
  capture(csrf);
  const { csrfToken } = await csrf.json();
  const invalid = await fetch(`${base}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { Cookie: cookie(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, username: process.env.TEST_ADMIN_USERNAME || "RamKumar", password: "Definitely-wrong-password!", json: "true" }),
  });
  assert.equal(invalid.status, 401);
  const anonymous = await fetch(`${base}/api/auth/session`, { headers: { Cookie: cookie() } });
  assert.equal((await anonymous.json()).user, undefined);
  const login = await fetch(`${base}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { Cookie: cookie(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, username: process.env.TEST_ADMIN_USERNAME || "RamKumar", password: process.env.TEST_ADMIN_PASSWORD, callbackUrl: `${base}/admin`, json: "true" }),
  });
  capture(login);
  assert.equal(login.status, 200);
  const session = await fetch(`${base}/api/auth/session`, { headers: { Cookie: cookie() } });
  assert.equal((await session.json()).user?.name, process.env.TEST_ADMIN_USERNAME || "RamKumar");
  const page = await fetch(`${base}/admin`, { headers: { Cookie: cookie() } });
  const dashboard = await page.text();
  assert.match(dashboard, /Customer enquiries/);
  const logout = await fetch(`${base}/api/auth/signout`, {
    method: "POST", headers: { Cookie: cookie(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, json: "true" }),
  });
  capture(logout);
  const ended = await fetch(`${base}/api/auth/session`, { headers: { Cookie: cookie() } });
  assert.equal((await ended.json()).user, undefined);
});
