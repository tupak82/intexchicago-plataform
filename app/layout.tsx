import type { Metadata } from "next";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import SiteMotion from "@/components/SiteMotion";
import SiteChrome from "@/components/SiteChrome";
import MobileActionBar from "@/components/MobileActionBar";
import { site } from "@/lib/site";
import "./globals.css";
import "./brand.css";
import "./roofing-home.css";
import "./climate-animations.css";
import "./process-animations.css";
import "./process-rail-premium.css";
import "./home-experience-animations.css";
import "./premium-interactions.css";
import "./cinematic-scroll.css";
import "./service-pages.css";
import "./platform-pages.css";
import "./resource-pages.css";
import "./site-motion.css";
import "./mobile-premium.css";
import "./desktop-premium.css";
import "./related-services-premium.css";
import "./home-services-editorial.css";
import "./chicago-climate-editorial.css";
import "./home-climate-editorial.css";
import "./field-trust-editorial.css";
import "./home-process-editorial.css";
import "./service-visual-layout.css";
import "./site-chrome.css";
import "./reviews/reviews.css";
import "./admin/admin.css";
import "./estimate/estimate.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Chicago Roofing Contractor | Intex Chicago Roofing",
    template: "%s | Intex Chicago Roofing",
  },
  description: site.description,
  keywords: [
    "Chicago roofing contractor",
    "roof repair Chicago",
    "roof replacement Chicago",
    "storm damage roofing Chicago",
    "commercial roofing Chicago",
    "flat roofing Chicago",
    "roofing company Chicagoland",
  ],
  alternates: { canonical: "/" },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Chicago Roofing Contractor | Intex Chicago Roofing",
    description: site.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {googleTagManagerId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <AnalyticsTracker />
        <SiteMotion />
        <SiteChrome />
        {children}
        <MobileActionBar />
        {googleTagManagerId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`}
          </Script>
        ) : null}
        {!googleTagManagerId && googleAnalyticsId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
