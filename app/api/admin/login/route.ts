import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken, validAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
