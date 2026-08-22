import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";
import "./service-pages.css";
import "./platform-pages.css";
import "./resource-pages.css";
import "./admin/admin.css";
import "./estimate/estimate.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Intex Restoration | Chicago Restoration & Roofing",
    template: "%s | Intex Restoration",
  },
  description: site.description,
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
    title: "Intex Restoration | Chicago Restoration & Roofing",
    description: site.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
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
