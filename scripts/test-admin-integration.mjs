import nextEnv from "@next/env";
import { MongoClient, ObjectId } from "mongodb";
import { randomBytes, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { hashPassword } from "../lib/password.ts";

nextEnv.loadEnvConfig(process.cwd());
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
const fixtureId = new ObjectId();
const username = `test-owner-${randomUUID()}`;
const password = randomBytes(24).toString("base64url");
const databaseName = `Harsh_test_${randomUUID().replaceAll("-", "").slice(0, 24)}`;
const db = client.db(databaseName);
let server;
try {
  const now = new Date();
  await db.collection("user").insertOne({ _id: fixtureId, username, usernameNormalized: username, name: "Integration test owner", passwordHash: await hashPassword(password), role: "admin", isActive: true, sessionVersion: 0, createdAt: now, updatedAt: now });
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", "3002"], { windowsHide: true, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, MONGODB_DB: databaseName } });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Test server did not become ready.")), 20000);
    server.on("error", reject);
    server.on("exit", code => { clearTimeout(timer); reject(new Error(`Test server exited: ${code}`)); });
    server.stdout.on("data", chunk => { if (chunk.toString().includes("Ready")) { clearTimeout(timer); resolve(); } });
    server.stderr.on("data", () => {});
  });
  const testFiles = ["tests/admin-http.test.mjs", "tests/admin-management.test.mjs", "tests/email-otp.test.mjs", "tests/inquiry-security.test.mjs", "tests/password.test.mjs", "tests/profile-validation.test.mjs", "tests/business-documents.test.mjs", "tests/business-pdf.test.mjs", "tests/business-http.test.mjs"];
  const tests = spawn(process.execPath, ["--experimental-strip-types", "--test", ...testFiles], { windowsHide: true, stdio: "inherit", env: { ...process.env, MONGODB_DB: databaseName, TEST_BASE_URL: "http://127.0.0.1:3002", TEST_ADMIN_USERNAME: username, TEST_ADMIN_PASSWORD: password, TEST_ADMIN_MANAGEMENT: "true", TEST_GOOGLE_PROVIDER: "true", TEST_OTP_DB: "true" } });
  const [code] = await once(tests, "exit");
  process.exitCode = code || 0;
} finally {
  if (server && server.exitCode === null) { const ended = once(server, "exit"); server.kill(); await ended; }
  await db.collection("user").deleteOne({ _id: fixtureId, username });
  await db.collection("adminLoginAttempts").deleteMany({ _id: { $regex: `^${username}:` } });
  await db.collection("adminEmailOtps").deleteMany({ actorId: fixtureId.toHexString() });
  await db.collection("adminOtpLimits").deleteMany({ _id: { $regex: `^actor:${fixtureId.toHexString()}:` } });
  if (!/^Harsh_test_[a-f0-9]{24}$/.test(databaseName) || db.databaseName !== databaseName) throw new Error("Refusing to remove a non-test database.");
  await db.dropDatabase();
  await client.close();
}
