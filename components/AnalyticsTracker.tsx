"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushEvent(event: string, payload: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        pushEvent("phone_click", { link_url: href, page_path: window.location.pathname });
      } else if (href.startsWith("mailto:")) {
        pushEvent("email_click", { link_url: href, page_path: window.location.pathname });
      } else if (href === "/estimate/" || href.startsWith("/estimate/?")) {
        pushEvent("estimate_cta_click", { link_url: href, page_path: window.location.pathname });
      }
    };

    let leadRecorded = false;
    const detectLeadSuccess = () => {
      if (leadRecorded) return;
      const success = document.querySelector(".estimateSuccess");
      if (!success) return;
      leadRecorded = true;
      pushEvent("generate_lead", { form_name: "estimate", page_path: window.location.pathname });
    };

    const observer = new MutationObserver(detectLeadSuccess);
    observer.observe(document.body, { childList: true, subtree: true });
    detectLeadSuccess();
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
