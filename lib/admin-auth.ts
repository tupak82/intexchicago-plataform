import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "intex_admin";
const SESSION_VALUE = "authorized";

function sessionSecret() {
  return process.env.INTEX_ADMIN_SESSION_SECRET || "";
}

export function adminConfigured() {
  return (
    process.env.INTEX_ADMIN_ENABLED === "true" &&
    Boolean(process.env.INTEX_ADMIN_PASSWORD) &&
    Boolean(sessionSecret())
  );
}

export function adminSessionToken() {
  const secret = sessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(SESSION_VALUE).digest("hex");
}

export function validAdminSession(value?: string) {
  if (!adminConfigured() || !value) return false;
  const expected = adminSessionToken();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export function validAdminPassword(value: string) {
  const expected = process.env.INTEX_ADMIN_PASSWORD || "";
  if (!adminConfigured() || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
