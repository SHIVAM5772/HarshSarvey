import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { MongoClient, ObjectId } from "mongodb";
import nextEnv from "@next/env";
import { issueEmailOtp, consumeEmailOtp } from "../lib/otp.ts";

test("email OTP binds to actor, address and purpose, expires, limits guesses and cannot be replayed", { skip: process.env.TEST_OTP_DB !== "true" }, async () => {
  nextEnv.loadEnvConfig(process.cwd());
  const client = new MongoClient(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB || "Harsh");
  const actorId = new ObjectId().toHexString();
  const prefix = `otp-test-${randomUUID()}`;
  const secret = randomUUID();
  const addresses = [];
  let index = 0;
  async function issue(purpose = "create-admin") {
    const email = `${prefix}-${index++}@example.com`;
    addresses.push(email);
    let code;
    const id = await issueEmailOtp(db, actorId, email, purpose, secret, async (_to, value) => { code = value; });
    return { email, code, id, purpose };
  }
  function consume(challenge, overrides = {}) {
    const values = { actorId, secret, ...challenge, ...overrides };
    return consumeEmailOtp(db, values.actorId, values.email, values.purpose, values.id, values.code, values.secret);
  }
  try {
    const valid = await issue();
    const stored = await db.collection("adminEmailOtps").findOne({ _id: new ObjectId(valid.id) });
    assert.equal(stored.code, undefined);
    assert.notEqual(stored.codeHash, valid.code);
    await assert.rejects(consume(valid, { actorId: new ObjectId().toHexString() }));
    await assert.rejects(consume(valid, { email: "different@example.com" }));
    await assert.rejects(consume(valid, { purpose: "change-email" }));
    await assert.rejects(issueEmailOtp(db, actorId, valid.email, valid.purpose, secret, async () => {}), /60 seconds/);
    await consume(valid);
    await assert.rejects(consume(valid));
    const expired = await issue();
    await db.collection("adminEmailOtps").updateOne({ _id: new ObjectId(expired.id) }, { $set: { expiresAt: new Date(0) } });
    await assert.rejects(consume(expired));
    const locked = await issue();
    const wrong = locked.code === "000000" ? "000001" : "000000";
    for (let attempt = 0; attempt < 5; attempt++) await assert.rejects(consume(locked, { code: wrong }));
    await assert.rejects(consume(locked));
    const concurrent = await issue("change-email");
    const results = await Promise.allSettled([consume(concurrent), consume(concurrent)]);
    assert.equal(results.filter(result => result.status === "fulfilled").length, 1);
    const failedEmail = `${prefix}-failed@example.com`;
    addresses.push(failedEmail);
    await assert.rejects(issueEmailOtp(db, actorId, failedEmail, "create-admin", secret, async () => { throw new Error("SMTP failure"); }), /Could not send/);
    assert.equal(await db.collection("adminEmailOtps").countDocuments({ actorId, email: failedEmail }), 0);
  } finally {
    await db.collection("adminEmailOtps").deleteMany({ actorId });
    await db.collection("adminOtpLimits").deleteMany({ _id: { $regex: `^actor:${actorId}:` } });
    await client.close();
  }
});
