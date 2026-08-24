const leadAttemptsByKey = new Map<string, number[]>();
const adminLoginAttemptsByKey = new Map<string, number[]>();

const LEAD_WINDOW_MS = 10 * 60 * 1000;
const LEAD_MAX_ATTEMPTS = 8;
const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_LOGIN_MAX_ATTEMPTS = 5;

function allowAttempt(
  attemptsByKey: Map<string, number[]>,
  key: string,
  windowMs: number,
  maxAttempts: number,
  maxBuckets: number,
) {
  const now = Date.now();
  const cutoff = now - windowMs;
  const recent = (attemptsByKey.get(key) || []).filter((timestamp) => timestamp > cutoff);

  if (recent.length >= maxAttempts) {
    attemptsByKey.set(key, recent);
    return false;
  }

  recent.push(now);
  attemptsByKey.set(key, recent);

  if (attemptsByKey.size > maxBuckets) {
    for (const [bucketKey, timestamps] of attemptsByKey) {
      if (!timestamps.some((timestamp) => timestamp > cutoff)) attemptsByKey.delete(bucketKey);
    }
  }

  return true;
}

export function allowLeadRequest(key: string) {
  return allowAttempt(leadAttemptsByKey, key, LEAD_WINDOW_MS, LEAD_MAX_ATTEMPTS, 5_000);
}

export function allowAdminLoginAttempt(key: string) {
  return allowAttempt(adminLoginAttemptsByKey, key, ADMIN_LOGIN_WINDOW_MS, ADMIN_LOGIN_MAX_ATTEMPTS, 1_000);
}
