const baseUrl = (process.env.INTEX_SMOKE_BASE_URL || "https://intexchicago.com").replace(/\/$/, "");

const routes = [
  "/",
  "/about/",
  "/contact/",
  "/estimate/",
  "/roofing-chicago/",
  "/roof-repair-chicago/",
  "/roof-replacement-chicago/",
  "/storm-damage-restoration-chicago/",
  "/flat-roofing-chicago/",
  "/commercial-roofing-chicago/",
  "/roof-inspection-chicago/",
  "/sitemap.xml",
  "/robots.txt",
  "/api/health",
];

const forbiddenLegacyMarkers = [
  "sweet bonanza",
  "online casinos australia",
  "aspnews.com",
  "serving chicagoland since 2009",
  "4.9 star rated",
];

let failures = 0;

async function checkRoute(path) {
  const url = `${baseUrl}${path}`;
  try {
    const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "IntexProductionSmoke/1.0" } });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("text") || contentType.includes("json") ? await response.text() : "";

    if (!response.ok) {
      console.error(`FAIL ${response.status} ${url}`);
      failures += 1;
      return;
    }

    const lower = body.toLowerCase();
    const marker = forbiddenLegacyMarkers.find((value) => lower.includes(value));
    if (marker) {
      console.error(`FAIL legacy/unsafe marker \"${marker}\" found at ${url}`);
      failures += 1;
      return;
    }

    if (path === "/api/health") {
      try {
        const health = JSON.parse(body);
        if (!health || typeof health !== "object") throw new Error("invalid health payload");
      } catch {
        console.error(`FAIL invalid /api/health payload at ${url}`);
        failures += 1;
        return;
      }
    }

    console.log(`PASS ${response.status} ${url}`);
  } catch (error) {
    console.error(`FAIL ${url}: ${error instanceof Error ? error.message : String(error)}`);
    failures += 1;
  }
}

for (const route of routes) await checkRoute(route);

try {
  const response = await fetch("https://www.intexchicago.com/", { redirect: "manual" });
  const location = response.headers.get("location") || "";
  if (![301, 302, 307, 308].includes(response.status) || !location.startsWith("https://intexchicago.com")) {
    console.error(`FAIL www canonical redirect: status=${response.status} location=${location || "<missing>"}`);
    failures += 1;
  } else {
    console.log(`PASS www canonical redirect -> ${location}`);
  }
} catch (error) {
  console.error(`FAIL www canonical redirect: ${error instanceof Error ? error.message : String(error)}`);
  failures += 1;
}

if (failures > 0) {
  console.error(`\nProduction smoke test failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("\nProduction smoke test passed.");
