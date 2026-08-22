import type { Metadata } from "next";
import Script from "next/script";
import SiteMotion from "@/components/SiteMotion";
import MobileActionBar from "@/components/MobileActionBar";
import { site } from "@/lib/site";
import "./globals.css";
import "./brand.css";
import "./roofing-home.css";
import "./climate-animations.css";
import "./process-animations.css";
import "./home-experience-animations.css";
import "./premium-interactions.css";
import "./cinematic-scroll.css";
import "./service-pages.css";
import "./platform-pages.css";
import "./resource-pages.css";
import "./site-motion.css";
import "./mobile-premium.css";
import "./desktop-premium.css";
import "./reviews/reviews.css";
import "./admin/admin.css";
import "./estimate/estimate.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

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
        <SiteMotion />
        {children}
        <MobileActionBar />
        {googleAnalyticsId ? (
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
