import "./admin.css";

// Admin-only styles are loaded for /admin routes instead of on every public page.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
