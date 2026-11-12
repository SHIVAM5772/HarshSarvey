"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRef } from "react";
import { UserRound, LogOut, ChevronRight } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminProfile({ username, email, inHeader = false }: { username: string; email: string | null; inHeader?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  function close() { if (menu.current) menu.current.open = false; }
  return <details ref={menu} className={`${styles.profile}${inHeader ? ` ${styles.headerProfile}` : ""}`} onKeyDown={event => { if (event.key === "Escape") { close(); menu.current?.querySelector("summary")?.focus(); } }}>
    <summary className={styles.profileTrigger} aria-label={`Profile for ${username}`} title={`Profile for ${username}`}><span className={styles.avatar}><UserRound size={20} /></span><span className={styles.profileName}>{username}</span></summary>
    <div className={styles.profilePanel}>
      <div className={styles.profileIdentity}><strong>{username}</strong>{email && <span>{email}</span>}<small>Administrator</small></div>
      <span className={styles.menuEyebrow}>YOUR ACCOUNT</span>
      <div className={styles.profileActions} onClick={close}>
        <Link className={styles.viewProfileLink} href="/admin/profile"><UserRound size={17} />View profile<ChevronRight size={16} /></Link>
        <button type="button" onClick={() => signOut({ callbackUrl: "/admin" })}><LogOut size={17} />Sign out</button>
      </div>
    </div>
  </details>;
}
