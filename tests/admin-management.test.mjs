import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import { issueEmailOtp, consumeEmailOtp } from "../lib/otp.ts";

const base = process.env.TEST_BASE_URL;
async function login(username, password) {
  const cookies = new Map();
  function capture(response) {
    for (const header of response.headers.getSetCookie()) {
      const pair = header.split(";")[0];
      const index = pair.indexOf("=");
      cookies.set(pair.slice(0, index), pair.slice(index + 1));
    }
  }
  function cookie() { return [...cookies].map(([key, value]) => `${key}=${value}`).join("; "); }
  const csrf = await fetch(`${base}/api/auth/csrf`);
  capture(csrf);
  const { csrfToken } = await csrf.json();
  const response = await fetch(`${base}/api/auth/callback/credentials`, {
    method: "POST", headers: { Cookie: cookie(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, username, password, json: "true" }),
  });
  capture(response);
  return { response, cookie: cookie() };
}

test("admin creation, duplicate protection, password change and session revocation", { skip: !base || !process.env.TEST_ADMIN_PASSWORD || process.env.TEST_ADMIN_MANAGEMENT !== "true" }, async () => {
  nextEnv.loadEnvConfig(process.cwd());
  const dbClient = new MongoClient(process.env.MONGODB_URI);
  const username = `test-${randomUUID()}`;
  const password = `Original-${randomUUID()}`;
  const newPassword = `Changed-${randomUUID()}`;
  let insertedId;
  let actorId;
  const actor = await login(process.env.TEST_ADMIN_USERNAME || "RamKumar", process.env.TEST_ADMIN_PASSWORD);
  assert.equal(actor.response.status, 200);
  const origin = new URL(process.env.NEXTAUTH_URL).origin;
  async function post(path, body, cookie = actor.cookie, requestOrigin = origin) {
    return fetch(`${base}${path}`, { method: "POST", headers: { Cookie: cookie, Origin: requestOrigin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  }
  const data = { username, password, email: `${username}@example.com` };
  try {
    const actorProfile = await fetch(`${base}/api/admin/profile`, { headers: { Cookie: actor.cookie } });
    actorId = (await actorProfile.json()).profile.id;
    assert.equal((await post("/api/admin/users", data, "")).status, 401);
    assert.equal((await post("/api/admin/password", {}, "")).status, 401);
    assert.equal((await post("/api/admin/users", data, actor.cookie, "https://external.example")).status, 403);
    assert.equal((await post("/api/admin/users", { ...data, username: { $ne: null } })).status, 400);
    // Email-bearing accounts must not be created without verification.
    assert.equal((await post("/api/admin/users", data)).status, 400);
    const db = dbClient.db(process.env.MONGODB_DB || "Harsh");
    let sentCode;
    data.challengeId = await issueEmailOtp(db, actorId, data.email, "create-admin", process.env.NEXTAUTH_SECRET, async (_email, code) => { sentCode = code; });
    data.otp = sentCode;
    assert.equal((await post("/api/admin/users", data)).status, 201);
    const users = dbClient.db(process.env.MONGODB_DB || "Harsh").collection("user");
    const created = await users.findOne({ username });
    insertedId = created?._id;
    assert.ok(insertedId);
    assert.equal(created.role, "admin");
    assert.equal(created.passwordHash.includes(password), false);
    assert.ok(created.emailVerifiedAt);
    assert.equal((await post("/api/admin/users", data)).status, 409);
    assert.equal((await post("/api/admin/users", { ...data, username: `${username}-2` })).status, 409);
    const admin = await login(username, password);
    assert.equal(admin.response.status, 200);
    const profileResponse = await fetch(`${base}/api/admin/profile`, { headers: { Cookie: admin.cookie } });
    const profile = (await profileResponse.json()).profile;
    assert.equal(profile.username, username);
    assert.equal(profile.passwordHash, undefined);
    assert.equal(profile.emailVerified, true);
    const personal = { name: "Test Admin", phone: "9876543210", dob: "1990-01-02", gender: "Other", address: "Test address" };
    const edited = await fetch(`${base}/api/admin/profile`, { method: "PATCH", headers: { Cookie: admin.cookie, Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(personal) });
    assert.equal(edited.status, 200);
    assert.equal((await edited.json()).profile.name, "Test Admin");
    const tampered = await fetch(`${base}/api/admin/profile`, { method: "PATCH", headers: { Cookie: admin.cookie, Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ ...personal, email: "unverified@example.com" }) });
    assert.equal(tampered.status, 400);
    const profilePage = await fetch(`${base}/admin/profile`, { headers: { Cookie: admin.cookie } });
    const profileHtml = await profilePage.text();
    for (const text of ["Personal information", "Date of birth", "Gender", "Test address", "Create new admin"]) assert.ok(profileHtml.includes(text));
    const change = { currentPassword: password, newPassword, confirmPassword: newPassword };
    assert.equal((await post("/api/admin/password", change, admin.cookie, "https://external.example")).status, 403);
    assert.equal((await post("/api/admin/password", { ...change, currentPassword: "wrong" }, admin.cookie)).status, 400);
    assert.equal((await post("/api/admin/password", { ...change, confirmPassword: "mismatch" }, admin.cookie)).status, 400);
    assert.equal((await post("/api/admin/password", change, admin.cookie)).status, 200);
    const expired = await fetch(`${base}/api/auth/session`, { headers: { Cookie: admin.cookie } });
    assert.equal((await expired.json()).user, undefined);
    assert.equal((await login(username, password)).response.status, 401);
    const refreshed = await login(username, newPassword);
    assert.equal(refreshed.response.status, 200);
    const newEmail = `changed-${username}@example.com`;
    const changeEmail = { email: newEmail, currentPassword: newPassword };
    assert.equal((await post("/api/admin/profile/email", changeEmail, refreshed.cookie)).status, 400);
    changeEmail.challengeId = await issueEmailOtp(db, insertedId.toHexString(), newEmail, "change-email", process.env.NEXTAUTH_SECRET, async (_email, code) => { changeEmail.otp = code; });
    const changedEmail = await post("/api/admin/profile/email", changeEmail, refreshed.cookie);
    assert.equal(changedEmail.status, 200);
    const ended = await fetch(`${base}/api/auth/session`, { headers: { Cookie: refreshed.cookie } });
    assert.equal((await ended.json()).user, undefined);
    const stored = await users.findOne({ _id: insertedId });
    assert.equal(stored.email, newEmail);
    assert.ok(stored.emailVerifiedAt);
    await assert.rejects(consumeEmailOtp(db, insertedId.toHexString(), newEmail, "change-email", changeEmail.challengeId, changeEmail.otp, process.env.NEXTAUTH_SECRET));
  } finally {
    // Only this test's unique account is removed; existing admins are untouched.
    const db = dbClient.db(process.env.MONGODB_DB || "Harsh");
    if (insertedId) await db.collection("user").deleteOne({ _id: insertedId, username });
    else await db.collection("user").deleteOne({ username, usernameNormalized: username });
    await db.collection("adminLoginAttempts").deleteMany({ _id: { $regex: `^${username}:` } });
    await db.collection("adminEmailOtps").deleteMany({ email: { $in: [data.email, `changed-${username}@example.com`] } });
    await dbClient.close();
  }
});
