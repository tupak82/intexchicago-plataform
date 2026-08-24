import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken, validAdminPassword } from "@/lib/admin-auth";
import { allowAdminLoginAttempt } from "@/lib/rate-limit";

export const runtime = "nodejs";

function requestKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export async function POST(request: Request) {
  if (!allowAdminLoginAttempt(requestKey(request))) {
    return NextResponse.redirect(new URL("/admin/login/?error=rate_limited", request.url), 303);
  }

  const form = await request.formData();
  const password = String(form.get("password") || "");

  if (!validAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login/?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin/", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, adminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
