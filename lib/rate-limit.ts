const attemptsByKey = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function allowLeadRequest(key: string) {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (attemptsByKey.get(key) || []).filter((timestamp) => timestamp > cutoff);

  if (recent.length >= MAX_ATTEMPTS) {
    attemptsByKey.set(key, recent);
    return false;
  }

  recent.push(now);
  attemptsByKey.set(key, recent);

  if (attemptsByKey.size > 5_000) {
    for (const [bucketKey, timestamps] of attemptsByKey) {
      if (!timestamps.some((timestamp) => timestamp > cutoff)) attemptsByKey.delete(bucketKey);
    }
  }

  return true;
}
