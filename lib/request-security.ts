function sameHost(value: string, requestUrl: string) {
  try {
    return new URL(value).host === new URL(requestUrl).host;
  } catch {
    return false;
  }
}

export function isTrustedSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return sameHost(origin, request.url);

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;

  const referer = request.headers.get("referer");
  if (referer) return sameHost(referer, request.url);

  return fetchSite === "same-origin";
}
