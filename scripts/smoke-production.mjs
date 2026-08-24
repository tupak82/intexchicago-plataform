const baseUrl = (process.env.INTEX_SMOKE_BASE_URL || "https://intexchicago.com").replace(/\/$/, "");
const productionBaseUrl = "https://intexchicago.com";
const isProductionTarget = baseUrl === productionBaseUrl;

const routes = [
  "/",
  "/about/",
  "/contact/",
  "/estimate/",
  "/projects/",
  "/resources/",
  "/service-areas/",
  "/roofing-chicago/",
  "/roof-repair-chicago/",
  "/roof-replacement-chicago/",
  "/storm-damage-restoration-chicago/",
  "/flat-roofing-chicago/",
  "/commercial-roofing-chicago/",
  "/roof-inspection-chicago/",
  "/water-damage-restoration-chicago/",
  "/fire-damage-restoration-chicago/",
  "/mold-remediation-chicago/",
  "/commercial-restoration-chicago/",
  "/trauma-biohazard-cleaning-chicago/",
  "/insurance-claims/",
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
    const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "IntexDeploymentSmoke/1.0" } });
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
        if (health.ok !== true) throw new Error(`health is not ok: ${health.status || "unknown"}`);
        if (health.readiness?.web !== true) throw new Error("web readiness is false");
        if (health.readiness?.leadBackend !== true) throw new Error("lead backend is not ready");
      } catch (error) {
        console.error(`FAIL unhealthy /api/health at ${url}: ${error instanceof Error ? error.message : String(error)}`);
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

console.log(`Deployment smoke target: ${baseUrl} (${isProductionTarget ? "production" : "preview"})`);
for (const route of routes) await checkRoute(route);

if (isProductionTarget) {
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
} else {
  console.log("SKIP www canonical redirect for preview target");
}

if (failures > 0) {
  console.error(`\nDeployment smoke test failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("\nDeployment smoke test passed.");
