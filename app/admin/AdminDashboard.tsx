"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowUpRight, CheckCircle2, ClipboardList, Clock3, LockKeyhole, MessageSquare, Phone, RefreshCw, Search, ShieldCheck, Receipt, FileText } from "lucide-react";
import { INQUIRY_STATUSES, type Inquiry, type InquiryStatus } from "@/lib/inquiry-validation";
import styles from "./admin.module.css";

type Props = {
  username: string | null;
  email: string | null;
  googleReady: boolean;
  passwordChanged: boolean;
  emailChanged: boolean;
  authReady: boolean;
  sheetsReady: boolean;
  initialInquiries: Inquiry[];
  initialError: string;
  loginError: boolean;
  sheetUrl: string | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(date);
}

export default function AdminDashboard(props: Props) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(props.initialInquiries);
  const [error, setError] = useState(props.initialError);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => inquiries.filter(item => (status === "All" || item.status === status) && `${item.name} ${item.phone} ${item.email} ${item.organization} ${item.service} ${item.location} ${item.message}`.toLowerCase().includes(search.toLowerCase().trim())), [inquiries, search, status]);

  async function refresh() {
    setRefreshing(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load enquiries.");
      setInquiries(data.inquiries);
      setNotice("Enquiries refreshed from Google Sheets.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { setRefreshing(false); }
  }

  async function updateStatus(id: string, nextStatus: InquiryStatus) {
    setUpdating(id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: nextStatus }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update status.");
      setInquiries(items => items.map(item => item.id === id ? { ...item, status: nextStatus } : item));
      setNotice(`Status saved as ${nextStatus}.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { setUpdating(null); }
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setAuthBusy(true); setError("");
    try {
      const result = await signIn("credentials", { username: form.get("username"), password: form.get("password"), redirect: false, callbackUrl: "/admin" });
      if (result?.ok && !result.error) router.refresh();
      else setError(result?.error === "CredentialsSignin" ? "Invalid username or password, or too many attempts. Please try again later." : "Login is temporarily unavailable. Please try again later.");
    } catch { setError("Login could not complete. Please try again."); }
    finally { setAuthBusy(false); }
  }

  if (!props.username) return (
    <section className={`${styles.page} ${styles.loginPage}`}>
      <div className={styles.loginCard}>
        <div className={styles.lock}><LockKeyhole size={27} /></div>
        <span className={styles.eyebrow}>HARSH SURVEY CONSULTANCY</span>
        <h1>Welcome to your<br />enquiry workspace.</h1>
        <p>Sign in with your admin Google account or username and password to manage customer enquiries.</p>
        {props.passwordChanged && <p className={styles.profileSuccess} role="status">Password changed successfully. Please sign in again.</p>}
        {props.emailChanged && <p className={styles.profileSuccess} role="status">Email verified and updated. Please sign in again.</p>}
        {(props.loginError || error) && <div role="alert" className={styles.error}>{error || "Access denied or sign-in was not completed. Please try again."}</div>}
        {!props.authReady && <div className={styles.setup}><strong>Admin login setup is pending</strong><p>Please contact the website administrator to enable login.</p></div>}
        <form className={styles.loginForm} onSubmit={login}>
          <label htmlFor="admin-username">Username<input id="admin-username" name="username" autoComplete="username" required minLength={3} maxLength={64} disabled={authBusy} /></label>
          <label htmlFor="admin-password">Password<input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={256} disabled={authBusy} /></label>
          <button type="submit" className={styles.primaryButton} disabled={!props.authReady || authBusy}>
            <ShieldCheck size={18} /> {authBusy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className={styles.loginDivider}>or</div>
        <button type="button" className={`${styles.secondaryButton} ${styles.googleButton}`} disabled={!props.googleReady || authBusy} onClick={async () => {
          setAuthBusy(true); setError("");
          try { await signIn("google", { callbackUrl: "/admin" }); }
          catch { setError("Google sign-in could not start. Please try again."); setAuthBusy(false); }
        }}>Continue with Google</button>
        {!props.googleReady && <p className={styles.profileHint}>Google sign-in is currently unavailable. Use your username and password.</p>}
        <small><LockKeyhole size={12} /> Access is verified securely on the server.</small>
        <Link href="/" className={styles.homeLink}>Back to website <ArrowUpRight size={14} /></Link>
      </div>
    </section>
  );

  const stats = [
    { label: "Total enquiries", value: inquiries.length, icon: ClipboardList },
    { label: "New enquiries", value: inquiries.filter(i => i.status === "New").length, icon: MessageSquare },
    { label: "Contacted", value: inquiries.filter(i => i.status === "Contacted").length, icon: Clock3 },
    { label: "Completed", value: inquiries.filter(i => i.status === "Completed").length, icon: CheckCircle2 },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div><span className={styles.eyebrow}><ShieldCheck size={14} /> ADMIN WORKSPACE</span><h1>Enquiries, in one place.</h1><p>Manage survey and solar enquiries from your website.</p></div>
          <div className={styles.controls}><Link className={styles.secondaryButton} href="/admin/documents?kind=bill"><Receipt size={16} />Create bill</Link><Link className={styles.primaryButton} href="/admin/documents?kind=quotation"><FileText size={16} />Create quotation</Link></div>
        </div>
        {!props.sheetsReady && <div className={styles.setup}><strong>Connect Google Sheets to start collecting enquiries</strong><p>The Google Sheets connection has not been configured yet. No sample customer data is displayed.</p></div>}
        <div className={styles.stats}>{stats.map(stat => <div className={styles.stat} key={stat.label}><stat.icon size={19} /><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <div className={styles.panel}>
          <div className={styles.toolbar}>
            <div><h2>Customer enquiries</h2><p>{filtered.length} of {inquiries.length} enquiries · Times in IST</p></div>
            <div className={styles.controls}>
              {props.sheetUrl && <a className={styles.secondaryButton} href={props.sheetUrl} target="_blank" rel="noreferrer">Open Sheet <ArrowUpRight size={14} /></a>}
              <button className={styles.secondaryButton} onClick={refresh} disabled={refreshing || Boolean(updating) || !props.sheetsReady}><RefreshCw size={14} /> {refreshing ? "Refreshing…" : "Refresh"}</button>
            </div>
          </div>
          <div className={styles.filters}>
            <label className={styles.search}><Search size={17} /><input aria-label="Search enquiries" placeholder="Search name, phone, service or location…" value={search} onChange={event => setSearch(event.target.value)} /></label>
            <select aria-label="Filter by enquiry status" value={status} onChange={event => setStatus(event.target.value)}><option value="All">All statuses</option>{INQUIRY_STATUSES.map(value => <option key={value}>{value}</option>)}</select>
          </div>
          {error && <div className={styles.error} role="alert">{error}</div>}
          {notice && <p className={styles.notice} role="status">{notice}</p>}
          {filtered.length === 0 ? <div className={styles.empty}><ClipboardList size={32} /><h3>{search || status !== "All" ? "No matching enquiries" : "Your next project starts here."}</h3><p>{search || status !== "All" ? "Try another search or status filter." : error ? "Enquiries will appear once the connection is restored." : "Once a customer submits an enquiry, it will appear here after you refresh."}</p></div> : (
            <div className={styles.tableWrap}><table className={styles.table}>
              <thead><tr><th>Customer</th><th>Service & site</th><th>Received</th><th>Status</th><th>Contact</th></tr></thead>
              <tbody>{filtered.map(item => {
                const digits = item.phone.replace(/\D/g, "");
                const whatsapp = digits.length === 10 ? `91${digits}` : digits;
                return <tr key={item.id}>
                  <td><strong>{item.name}</strong><span>{item.organization || "Individual enquiry"}</span><span>{item.phone}</span>{item.email && <a href={`mailto:${encodeURIComponent(item.email)}`}>{item.email}</a>}</td>
                  <td><strong>{item.service}</strong><span>{item.location || "Location to be discussed"}</span>{item.message && <details><summary>Project details</summary><p>{item.message}</p></details>}</td>
                  <td><span>{formatDate(item.createdAt)}</span><small>{item.source === "quote" ? "Quote form" : "Contact form"}</small></td>
                  <td><select className={styles.statusSelect} data-status={item.status} aria-label={`Status for ${item.name}`} value={item.status} disabled={Boolean(updating) || refreshing} onChange={event => updateStatus(item.id, event.target.value as InquiryStatus)}>{INQUIRY_STATUSES.map(value => <option key={value}>{value}</option>)}</select>{updating === item.id && <small>Saving…</small>}</td>
                  <td><div className={styles.rowActions}><a href={`tel:+${whatsapp}`} aria-label={`Call ${item.name}`} title="Call customer"><Phone size={16} /></a><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${item.name}`} title="Open WhatsApp"><MessageSquare size={16} /></a></div></td>
                </tr>;
              })}</tbody>
            </table></div>
          )}
        </div>
      </div>
    </section>
  );
}
