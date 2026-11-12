import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { MongoClient } from "mongodb";

const base = process.env.TEST_BASE_URL;
test("bill/quotation endpoints require admin access, recompute totals and support repeat PDF downloads", { skip: !base || !process.env.TEST_ADMIN_PASSWORD }, async () => {
  const cookies = new Map();
  function capture(response) { for (const value of response.headers.getSetCookie()) { const pair = value.split(";")[0]; const i = pair.indexOf("="); cookies.set(pair.slice(0, i), pair.slice(i + 1)); } }
  const cookie = () => [...cookies].map(([key, value]) => `${key}=${value}`).join("; ");
  const csrf = await fetch(`${base}/api/auth/csrf`); capture(csrf);
  const { csrfToken } = await csrf.json();
  const login = await fetch(`${base}/api/auth/callback/credentials`, { method: "POST", headers: { Cookie: cookie(), "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ csrfToken, username: process.env.TEST_ADMIN_USERNAME, password: process.env.TEST_ADMIN_PASSWORD, json: "true" }) }); capture(login); assert.equal(login.status, 200);
  const session = await fetch(`${base}/api/auth/session`, { headers: { Cookie: cookie() } }); const actorId = (await session.json()).user.id;
  const origin = new URL(process.env.NEXTAUTH_URL).origin;
  const post = (body, auth = cookie(), requestOrigin = origin) => fetch(`${base}/api/admin/documents`, { method: "POST", headers: { Cookie: auth, Origin: requestOrigin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    assert.equal((await fetch(`${base}/api/admin/documents`)).status, 401);
    assert.equal((await fetch(`${base}/api/admin/documents/000000000000000000000001/pdf`)).status, 401);
    assert.equal((await post({}, "")).status, 401);
    assert.equal((await post({}, cookie(), "https://external.example")).status, 403);
    assert.equal((await post({})).status, 400);
    for (const kind of ["bill", "quotation"]) {
      const input = { kind, issueDate: "2026-11-12", clientName: "Test business client", items: [{ description: "Survey", quantity: "2", rate: "100", amountPaise: 1 }], discount: "10", taxRate: "18", paid: "50", requestId: randomUUID(), totals: { totalPaise: 1 } };
      const response = await post(input); assert.equal(response.status, 201);
      const doc = (await response.json()).document;
      assert.equal(doc.totals.totalPaise, 22420);
      assert.equal(doc.paidPaise, kind === "bill" ? 5000 : 0);
      const retry = await post(input); assert.equal((await retry.json()).document.id, doc.id);
      for (let attempt = 0; attempt < 2; attempt++) {
        const download = await fetch(`${base}/api/admin/documents/${doc.id}/pdf`, { headers: { Cookie: cookie() } });
        assert.equal(download.status, 200); assert.match(download.headers.get("content-type"), /application\/pdf/); assert.match(download.headers.get("content-disposition"), /attachment/); assert.match(download.headers.get("cache-control"), /no-store/);
        assert.equal(Buffer.from(await download.arrayBuffer()).subarray(0, 5).toString(), "%PDF-");
      }
    }
    const listing = await fetch(`${base}/api/admin/documents`, { headers: { Cookie: cookie() } });
    assert.ok((await listing.json()).documents.some(doc => doc.clientName === "Test business client"));
    assert.equal((await fetch(`${base}/api/admin/documents/invalid/pdf`, { headers: { Cookie: cookie() } })).status, 404);
  } finally {
    await client.db(process.env.MONGODB_DB || "Harsh").collection("billingDocuments").deleteMany({ createdBy: actorId, clientName: "Test business client" });
    await client.close();
  }
});
