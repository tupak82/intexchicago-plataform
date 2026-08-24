import fs from "node:fs/promises";
import mysql from "mysql2/promise";

const requiredTables = ["intex_leads", "intex_projects", "intex_reviews", "intex_content"];
const dbKeys = ["INTEX_DB_HOST", "INTEX_DB_USER", "INTEX_DB_PASSWORD", "INTEX_DB_NAME"];

function has(name) {
  return Boolean(process.env[name]?.trim());
}

function print(label, ok, detail = "") {
  const suffix = detail ? ` — ${detail}` : "";
  console.log(`${ok ? "PASS" : "FAIL"} ${label}${suffix}`);
}

let failures = 0;

async function checkSchemaFile() {
  try {
    const schema = await fs.readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
    const missing = requiredTables.filter((table) => !schema.includes(`CREATE TABLE IF NOT EXISTS ${table}`));
    if (missing.length) {
      print("db/schema.sql", false, `missing: ${missing.join(", ")}`);
      failures += 1;
      return;
    }
    print("db/schema.sql", true, `${requiredTables.length} required tables declared`);
  } catch (error) {
    print("db/schema.sql", false, error instanceof Error ? error.message : String(error));
    failures += 1;
  }
}

async function checkDatabase() {
  const configured = dbKeys.every(has);
  const webhookConfigured = has("INTEX_LEADS_WEBHOOK_URL");

  if (!configured && !webhookConfigured) {
    print("lead backend", false, "configure Hostinger MySQL or INTEX_LEADS_WEBHOOK_URL");
    failures += 1;
    return;
  }

  if (!configured) {
    print("MySQL", true, "not configured; webhook will be the lead backend");
    print("lead webhook", true, "configured");
    return;
  }

  const pool = mysql.createPool({
    host: process.env.INTEX_DB_HOST,
    port: Number(process.env.INTEX_DB_PORT || 3306),
    user: process.env.INTEX_DB_USER,
    password: process.env.INTEX_DB_PASSWORD,
    database: process.env.INTEX_DB_NAME,
    connectionLimit: 1,
    connectTimeout: 7000,
    enableKeepAlive: true,
  });

  try {
    await pool.query("SELECT 1");
    print("MySQL connection", true, `${process.env.INTEX_DB_HOST}:${process.env.INTEX_DB_PORT || 3306}`);

    const [rows] = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = ? AND table_name IN (?, ?, ?, ?)",
      [process.env.INTEX_DB_NAME, ...requiredTables],
    );
    const found = new Set(rows.map((row) => row.TABLE_NAME || row.table_name));
    const missing = requiredTables.filter((table) => !found.has(table));
    if (missing.length) {
      print("database schema", false, `apply db/schema.sql; missing: ${missing.join(", ")}`);
      failures += 1;
    } else {
      print("database schema", true, `${requiredTables.length} required tables found`);
    }
  } catch (error) {
    print("MySQL connection", false, error instanceof Error ? error.message : String(error));
    failures += 1;
  } finally {
    await pool.end();
  }

  if (webhookConfigured) print("lead webhook", true, "configured as secondary delivery path");
}

function checkAdmin() {
  const enabled = process.env.INTEX_ADMIN_ENABLED === "true";
  if (!enabled) {
    print("admin", true, "disabled for preview");
    return;
  }

  const ready = has("INTEX_ADMIN_PASSWORD") && has("INTEX_ADMIN_SESSION_SECRET");
  print("admin", ready, ready ? "enabled with required secrets" : "missing password/session secret");
  if (!ready) failures += 1;
}

function checkAnalytics() {
  const gtm = has("NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID");
  const ga = has("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID");
  print("analytics", true, gtm ? "GTM configured" : ga ? "GA configured" : "optional; not configured");
  print("Search Console verification", true, has("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION") ? "configured" : "optional; not configured");
}

console.log("Intex Chicago preview preflight\n");
await checkSchemaFile();
await checkDatabase();
checkAdmin();
checkAnalytics();

if (failures) {
  console.error(`\nPreview preflight failed with ${failures} blocking issue(s).`);
  process.exit(1);
}

console.log("\nPreview preflight passed.");
