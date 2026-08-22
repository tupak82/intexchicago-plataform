import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Intex Restoration handles information submitted through the Intex Chicago platform.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Privacy</div>
        <p className="kicker"><span /> Privacy</p>
        <h1>Clear rules for customer information.</h1>
        <p>This policy describes the information the Intex Chicago platform is designed to collect and how it is intended to be used.</p>
      </section>

      <section className="platformSection legalContent">
        <p><strong>Effective date:</strong> August 22, 2026</p>

        <h2>Information you provide</h2>
        <p>When you request roofing or restoration help, the platform may collect your name, phone number, email address, property ZIP code, property type, service requested, description of the property issue, preferred contact method, and the consent you provide with the request.</p>

        <h2>How the information is used</h2>
        <p>Information submitted through the platform is intended to be used to review your request, contact you about that request, coordinate restoration or roofing services, prevent abuse, and maintain the security and reliability of the service.</p>

        <h2>Lead delivery</h2>
        <p>The online request form is designed to deliver information only to an approved private destination configured by Intex. The platform does not represent a request as received when that destination is unavailable.</p>

        <h2>Emergency requests</h2>
        <p>The website is not a replacement for emergency services. If there is an immediate threat to life, health, fire safety, structural safety, or another emergency condition, contact the appropriate emergency service. For urgent property-service requests, you can call Intex at <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.</p>

        <h2>Security and spam prevention</h2>
        <p>The platform uses measures such as server-side validation, request-size limits, anti-spam checks, and rate limiting. No website or transmission method can guarantee absolute security.</p>

        <h2>Retention and deletion</h2>
        <p>Customer request data should be retained only as long as reasonably necessary for customer service, operational, legal, accounting, or dispute-resolution needs. Final production retention periods will follow the approved Intex business process and applicable requirements.</p>

        <h2>Third-party services</h2>
        <p>Production hosting, analytics, communications, or lead-management providers may process limited data when those services are enabled. Intex should configure those providers with appropriate access controls and only for legitimate business purposes.</p>

        <h2>Your choices</h2>
        <p>You can choose not to submit the online form and contact Intex by phone or email instead. Questions about information submitted through this website can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

        <h2>Changes</h2>
        <p>This policy may be updated as the platform and its production integrations change. Material changes should be reflected on this page with an updated effective date.</p>
      </section>
    </main>
  );
}
