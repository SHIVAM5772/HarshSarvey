import "server-only";
import nodemailer from "nodemailer";

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && (process.env.SMTP_FROM || process.env.MAIL_FROM));
}

export async function sendVerificationEmail(email: string, code: string, purpose: string) {
  if (!isMailConfigured()) throw new Error("Email verification is not available yet. Contact the website administrator.");
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure, requireTLS: !secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  const result = await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.MAIL_FROM, to: email,
    subject: "Your Harsh Survey email verification code",
    text: `Your verification code is ${code}.\n\nUse it to ${purpose === "create-admin" ? "create your admin account" : "change your account email"}. It expires in 10 minutes.\n\nIf you did not request this, ignore this email. Do not share this code.\n\nHarsh Survey Consultancy`,
  });
  if (!result.accepted?.length) throw new Error("Email could not be delivered.");
}
