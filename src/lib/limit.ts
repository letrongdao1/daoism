const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const hits = new Map<string, { count: number; reset: number }>();

// fixed window per server instance; used locally and when Redis is unreachable
export function allowLocal(
  key: string,
  max: number,
  windowMs: number,
  now = Date.now(),
) {
  const hit = hits.get(key);
  if (!hit || hit.reset <= now) {
    if (hits.size > 10_000) {
      for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
    }
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  return ++hit.count <= max;
}

export async function allow(key: string, max: number, windowMs: number) {
  if (!url || !token) return allowLocal(key, max, windowMs);
  const k = `rl:${key}`;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify([
        ["SET", k, 0, "PX", windowMs, "NX"],
        ["INCR", k],
      ]),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Redis ${res.status}: ${await res.text()}`);
    const [, incr]: { result: number }[] = await res.json();
    return incr.result <= max;
  } catch (err) {
    console.error(err);
    return allowLocal(key, max, windowMs);
  }
}
