"use client";

import { useId, useState } from "react";
import { Mail, Send } from "lucide-react";
import { normalizeEmail } from "@/lib/profile-validation";
import styles from "./admin.module.css";

export default function EmailVerification({ purpose, mailReady, required = false }: { purpose: "create-admin" | "change-email"; mailReady: boolean; required?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendAt, setResendAt] = useState(0);
  async function send() {
    if (!normalizeEmail(email)) { setError("Enter a valid email address first."); return; }
    if (Date.now() < resendAt) { setError("Please wait 60 seconds before requesting another code."); return; }
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, purpose }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send verification code.");
      setChallengeId(result.challengeId); setOtp(""); setResendAt(Date.now() + 60000); setMessage(result.message);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <div className={styles.emailVerification}>
    <label htmlFor={`${id}-email`}>{required ? "New email address" : "Google email (optional)"}<input id={`${id}-email`} name="email" type="email" value={email} autoComplete="email" maxLength={254} required={required} readOnly={busy} onChange={event => { setEmail(event.target.value); setChallengeId(""); setOtp(""); setMessage(""); setError(""); }} /></label>
    <p className={styles.fieldHint}>{required ? "Verify the new address before changing your sign-in email." : "An email needs verification before the admin is created. Leave it empty for username/password login only."}</p>
    {email && <>
      <button type="button" className={styles.secondaryButton} onClick={send} disabled={busy || !mailReady}><Send size={14} />{busy ? "Sending…" : challengeId ? "Resend code" : "Send verification code"}</button>
      <input type="hidden" name="challengeId" value={challengeId} />
      <label htmlFor={`${id}-otp`}>Email verification code<input id={`${id}-otp`} name="otp" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ""))} type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" placeholder="6-digit code" required /></label>
    </>}
    {!mailReady && <p className={styles.fieldHint}><Mail size={14} /> Email verification is currently unavailable.{!required && " You can still create an admin without an email."}</p>}
    {message && <p className={styles.profileSuccess} role="status">{message}</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
  </div>;
}
