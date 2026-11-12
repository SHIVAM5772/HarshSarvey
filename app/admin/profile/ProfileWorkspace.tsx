"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, KeyRound, Mail, MapPin, Pencil, Phone, ShieldCheck, UserPlus, X } from "lucide-react";
import type { ProfileData } from "@/lib/profile-validation";
import PersonalFields from "../PersonalFields";
import EmailVerification from "../EmailVerification";
import styles from "../admin.module.css";

type Section = "new" | "password" | "email" | "edit" | null;
function date(value: string, withTime = false) {
  if (!value) return "Not provided";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", ...(withTime ? { timeStyle: "short", timeZone: "Asia/Kolkata" } : { timeZone: "UTC" }) }).format(new Date(value));
}

export default function ProfileWorkspace({ initialProfile, mailReady, initialSection }: { initialProfile: ProfileData; mailReady: boolean; initialSection: Section }) {
  const [profile, setProfile] = useState(initialProfile);
  const [section, setSection] = useState<Section>(initialSection);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [formVersion, setFormVersion] = useState(0);
  const initials = profile.name.split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();
  function open(next: Section) { setSection(next); setError(""); setNotice(""); }
  const titles = { edit: "Edit personal details", email: "Change account email", password: "Change password", new: "Create new admin" };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true); setError(""); setNotice("");
    const endpoint = section === "edit" ? "/api/admin/profile" : section === "email" ? "/api/admin/profile/email" : section === "password" ? "/api/admin/password" : "/api/admin/users";
    try {
      const response = await fetch(endpoint, { method: section === "edit" ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save. Please try again.");
      if (section === "password" || section === "email") {
        await signOut({ callbackUrl: section === "email" ? "/admin?emailChanged=1" : "/admin?passwordChanged=1" });
      } else {
        if (result.profile) setProfile(result.profile);
        form.reset(); setFormVersion(value => value + 1); setNotice(result.message);
        if (section === "edit") setSection(null);
      }
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { setBusy(false); }
  }
  const details = [
    ["Full name", profile.name], ["Username", profile.username], ["Phone number", profile.phone], ["Email address", profile.email],
    ["Date of birth", profile.dob ? date(profile.dob) : ""], ["Gender", profile.gender], ["Address", profile.address],
  ];
  return <section className={`${styles.page} ${styles.profilePage}`}>
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/admin">Admin workspace</Link><ChevronRight size={14} /><span>My profile</span><span className={styles.privateBadge}><ShieldCheck size={14} />Private workspace</span></nav>
      <div className={styles.heading}>
        <div><span className={styles.eyebrow}>YOUR ACCOUNT</span><h1>My profile</h1><p>Your personal details and account security, in one place.</p></div>
        <div className={styles.controls}><Link className={styles.secondaryButton} href="/admin"><ArrowLeft size={15} />Enquiries</Link><a className={styles.primaryButton} href="#account-form" onClick={() => open("new")}><UserPlus size={16} />Create new admin</a></div>
      </div>
      {notice && <p className={styles.profileSuccess} role="status">{notice}</p>}
      <div className={styles.profileGrid}>
        <aside className={`${styles.profileCard} ${styles.identityCard}`}>
          <div className={styles.profilePortrait}>{initials}</div><h2>{profile.name}</h2><span className={styles.roleBadge}>Administrator</span>
          <a href="#account-form" className={styles.editProfileLink} onClick={() => open("edit")}><Pencil size={14} />Edit personal details</a>
          <div className={styles.contactDetails}><h3>Contact information</h3><p><Mail size={16} /><span>{profile.email || "Email not added"}</span></p><p><Phone size={16} /><span>{profile.phone || "Phone not added"}</span></p><p><MapPin size={16} /><span>{profile.address || "Address not added"}</span></p></div>
          <div className={styles.memberSince}>Member since {date(profile.createdAt)}</div>
        </aside>
        <div className={`${styles.profileCard} ${styles.detailsCard}`}><div className={styles.cardHeading}><div><h2>Personal information</h2><p>Your account details</p></div><a href="#account-form" className={styles.iconButton} aria-label="Edit personal details" onClick={() => open("edit")}><Pencil size={17} /></a></div>
          <table className={styles.detailsTable}><caption className={styles.srOnly}>Your personal and contact details</caption><tbody>{details.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value || <span className={styles.missingValue}>Not provided</span>}</td></tr>)}</tbody></table>
        </div>
        <div className={styles.securityColumn}>
          <div className={styles.profileCard}><div className={styles.cardHeading}><span className={styles.securityIcon}><ShieldCheck size={24} /></span><div><h2>Account security</h2><p>Email verification</p></div></div>
            <div className={styles.emailStatus}><small>Sign-in email</small><strong>{profile.email || "No email connected"}</strong><span>{profile.emailVerified ? <><CheckCircle2 size={14} />Verified email</> : profile.email ? "Verification not recorded" : "Username/password login is available"}</span></div>
            <p className={styles.profileHint}>Changing your email requires a verification code sent to the new address.</p>
            <a className={styles.secondaryButton} href="#account-form" onClick={() => open("email")}>{profile.email ? "Edit account email" : "Add account email"}<ArrowUpRight size={14} /></a>
            <a className={`${styles.secondaryButton} ${styles.passwordLink}`} href="#account-form" onClick={() => open("password")}><KeyRound size={14} />Change password</a>
          </div>
          <div className={styles.profileCard}><h2>Account information</h2><p className={styles.profileHint}>Keep your details current. Your profile is visible only after admin sign-in.</p><div className={styles.accountDates}><span>Account created</span><strong>{date(profile.createdAt, true)}</strong><span>Last updated</span><strong>{date(profile.updatedAt, true)}</strong></div><div className={styles.privateNote}><ShieldCheck size={15} />Private to your account</div></div>
        </div>
      </div>
      {section && <div id="account-form" className={`${styles.profileCard} ${styles.accountFormCard}`}>
        <div className={styles.cardHeading}><div><h2>{titles[section]}</h2><p>{section === "new" ? "Create an administrator with username/password login and an optional verified Google email." : section === "password" ? "Updating your password signs you out on all devices." : section === "email" ? "Verify your new email and confirm your current password. You will need to sign in again." : "Update the personal information shown on your profile."}</p></div><button type="button" className={styles.iconButton} disabled={busy} onClick={() => open(null)} aria-label="Close form"><X size={19} /></button></div>
        <form key={`${section}-${formVersion}`} className={styles.loginForm} onSubmit={submit}><fieldset className={styles.profileFields} disabled={busy}>
          {(section === "edit" || section === "new") && <PersonalFields details={section === "edit" ? profile : undefined} prefix={section} />}
          {section === "new" && <div className={styles.personalFields}><label htmlFor="new-username">Username<input id="new-username" name="username" minLength={3} maxLength={64} pattern="[a-zA-Z0-9_.\-]+" autoComplete="off" required /></label><label htmlFor="new-admin-password">Password<input id="new-admin-password" name="password" type="password" autoComplete="new-password" minLength={12} maxLength={256} required /></label></div>}
          {(section === "new" || section === "email") && <EmailVerification purpose={section === "new" ? "create-admin" : "change-email"} required={section === "email"} mailReady={mailReady} />}
          {(section === "password" || section === "email") && <><input hidden readOnly name="username" value={profile.username} autoComplete="username" /><label htmlFor="current-password">Current password<input id="current-password" name="currentPassword" type="password" autoComplete="current-password" required maxLength={256} /></label></>}
          {section === "password" && <div className={styles.personalFields}><label htmlFor="new-password">New password<input id="new-password" name="newPassword" type="password" autoComplete="new-password" minLength={12} maxLength={256} required /></label><label htmlFor="confirm-password">Confirm new password<input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={12} maxLength={256} required /></label></div>}
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.controls}><button className={styles.primaryButton} type="submit">{busy ? "Saving…" : section === "new" ? "Create admin" : "Save changes"}</button><button className={styles.secondaryButton} type="button" onClick={() => open(null)}>Cancel</button></div>
        </fieldset></form>
      </div>}
    </div>
  </section>;
}
