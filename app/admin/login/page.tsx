import type { Metadata } from "next";
import { adminConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Intex Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const configured = adminConfigured();

  return (
    <main className="adminPage">
      <section className="adminLoginCard">
        <span>Intex Platform</span>
        <h1>Control Center</h1>
        {!configured ? (
          <p>Admin access is disabled until the required production environment variables are configured.</p>
        ) : (
          <form action="/api/admin/login/" method="post">
            <label>
              Admin password
              <input name="password" type="password" autoComplete="current-password" required />
            </label>
            {error && <p className="adminLoginError">Incorrect password.</p>}
            <button type="submit">Sign in</button>
          </form>
        )}
      </section>
    </main>
  );
}
