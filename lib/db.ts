import mysql, { type Pool } from "mysql2/promise";

let pool: Pool | null = null;

export function isDatabaseConfigured() {
  return Boolean(
    process.env.INTEX_DB_HOST &&
    process.env.INTEX_DB_USER &&
    process.env.INTEX_DB_PASSWORD &&
    process.env.INTEX_DB_NAME,
  );
}

export function getDatabase() {
  if (!isDatabaseConfigured()) return null;
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.INTEX_DB_HOST,
    port: Number(process.env.INTEX_DB_PORT || 3306),
    user: process.env.INTEX_DB_USER,
    password: process.env.INTEX_DB_PASSWORD,
    database: process.env.INTEX_DB_NAME,
    connectionLimit: 5,
    enableKeepAlive: true,
    waitForConnections: true,
    queueLimit: 20,
    charset: "utf8mb4",
  });

  return pool;
}

export async function databasePing() {
  const db = getDatabase();
  if (!db) return { configured: false, reachable: false };

  try {
    await db.query("SELECT 1");
    return { configured: true, reachable: true };
  } catch {
    return { configured: true, reachable: false };
  }
}
