import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import { randomBytes } from "node:crypto";
import { hashPassword, normalizeUsername } from "../lib/password.ts";

nextEnv.loadEnvConfig(process.cwd());
const username = (process.env.ADMIN_USERNAME || "RamKumar").trim();
const normalized = normalizeUsername(username);
if (!process.env.MONGODB_URI || !normalized) {
  console.error("Set MONGODB_URI in .env.local and a valid ADMIN_USERNAME (default: RamKumar).");
  process.exit(1);
}
const password = process.env.ADMIN_PASSWORD || randomBytes(18).toString("base64url");
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
try {
  const passwordHash = await hashPassword(password);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "Harsh");
  const users = db.collection("user");
  await users.createIndex({ usernameNormalized: 1 }, { unique: true, partialFilterExpression: { usernameNormalized: { $type: "string" } } });
  await db.collection("adminLoginAttempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  const existing = await users.findOne({ $or: [{ usernameNormalized: normalized }, { username }] });
  if (existing) {
    console.error("This user already exists. No password or role was changed.");
    process.exitCode = 1;
  } else {
    const now = new Date();
    await users.insertOne({ username, usernameNormalized: normalized, passwordHash, role: "admin", isActive: true, createdAt: now, updatedAt: now });
    console.log(`Admin created in ${db.databaseName}.user. Username: ${username}`);
    if (!process.env.ADMIN_PASSWORD) console.log(`Generated password (save securely): ${password}`);
    else console.log("Password: the ADMIN_PASSWORD value you supplied.");
  }
} catch {
  console.error("Admin creation failed. Check the Atlas URI, database permissions, network access, and unique usernames. No credentials are printed.");
  process.exitCode = 1;
} finally {
  await client.close();
}
