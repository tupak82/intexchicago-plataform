"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

type LeadDraft = {
  service: string;
  emergency: string;
  propertyType: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  preferredContact: string;
  consent: boolean;
  website: string;
};

const serviceOptions = [
  "Roof leak / roof repair",
  "Roof replacement",
  "Storm / hail damage roofing",
  "Flat roof / TPO roofing",
  "Commercial roofing",
  "Roof inspection",
  "Water damage",
  "Fire / smoke damage",
  "Mold concern",
  "Trauma / biohazard cleanup",
  "Insurance claim documentation",
  "Commercial restoration",
  "Other property damage",
] as const;

export type EstimateServiceOption = (typeof serviceOptions)[number];

const propertyOptions = ["Single-family home", "Multi-family property", "Commercial property"];

function createInitialLead(initialService?: EstimateServiceOption): LeadDraft {
  return {
    service: initialService || "",
    emergency: "",
    propertyType: "",
    zip: "",
    name: "",
    phone: "",
    email: "",
    description: "",
    preferredContact: "phone",
    consent: false,
    website: "",
  };
}

function buildFallbackMailto(lead: LeadDraft): string {
  const subject = `Estimate request: ${lead.service || "Roofing / restoration"}${lead.zip.trim() ? ` (${lead.zip.trim()})` : ""}`;
  const body = [
    "Hello Intex,",
    "",
    "The online estimate form could not send my request, so I am emailing it instead.",
    "",
    `Service: ${lead.service}`,
    `Happening now: ${lead.emergency}`,
    `Property type: ${lead.propertyType}`,
    `ZIP code: ${lead.zip.trim()}`,
    `Name: ${lead.name.trim()}`,
    `Phone: ${lead.phone.trim()}`,
    `Email: ${lead.email.trim() || "(not provided)"}`,
    `Preferred contact: ${lead.preferredContact === "email" ? "Email" : "Phone / text"}`,
    "",
    "What happened:",
    lead.description.trim(),
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function EstimateFlow({ initialService }: { initialService?: EstimateServiceOption }) {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<LeadDraft>(() => createInitialLead(initialService));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [showErrors, setShowErrors] = useState(false);
  const stepHeadingRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const totalSteps = 6;
  const progress = useMemo(() => `${Math.min(step + 1, totalSteps)} / ${totalSteps}`, [step]);

  const update = <K extends keyof LeadDraft>(key: K, value: LeadDraft[K]) => {
    setLead((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  };

  // Move focus to the new step's heading so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setShowErrors(false);
    stepHeadingRef.current?.focus();
  }, [step]);

  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim());

  const canContinue = () => {
    if (step === 0) return Boolean(lead.service);
    if (step === 1) return Boolean(lead.emergency);
    if (step === 2) return Boolean(lead.propertyType && /^\d{5}(-\d{4})?$/.test(lead.zip.trim()));
    if (step === 3) return Boolean(lead.name.trim() && lead.phone.trim()) && (!lead.email.trim() || hasValidEmail);
    if (step === 4) return Boolean(lead.description.trim());
    if (step === 5) return lead.consent && (lead.preferredContact !== "email" || hasValidEmail);
    return false;
  };

  const stepError = (): string => {
    if (step === 0) return lead.service ? "" : "Choose the service that is closest to what you need.";
    if (step === 1) return lead.emergency ? "" : "Tell us whether this is happening right now.";
    if (step === 2) {
      if (!lead.propertyType) return "Choose the property type.";
      return /^\d{5}(-\d{4})?$/.test(lead.zip.trim()) ? "" : "Enter a 5-digit ZIP code for the property.";
    }
    if (step === 3) {
      if (!lead.name.trim()) return "Enter your name.";
      if (!lead.phone.trim()) return "Enter a phone number so Intex can reach you.";
      return !lead.email.trim() || hasValidEmail ? "" : "Check the email address, or leave it blank.";
    }
    if (step === 4) return lead.description.trim() ? "" : "Add a short description of what happened.";
    if (step === 5) {
      if (lead.preferredContact === "email" && !hasValidEmail) return "Add a valid email address in step 4, or choose Phone / text.";
      return lead.consent ? "" : "Check the consent box so Intex can contact you about this request.";
    }
    return "";
  };

  const goNext = () => {
    if (!canContinue()) {
      setShowErrors(true);
      return;
    }
    setStep((current) => Math.min(totalSteps - 1, current + 1));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (!canContinue()) {
      setShowErrors(true);
      return;
    }
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, sourcePage: `${window.location.pathname}${window.location.search}` }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="estimateCard estimateSuccess" aria-live="polite">
        <p className="estimateEyebrow">Request received</p>
        <h2>Thanks, {lead.name.split(" ")[0] || "there"}.</h2>
        <p>Your request was delivered to Intex. If the property is actively taking on water or has an unsafe opening, call now rather than waiting for an online response.</p>
        <a className="estimatePrimary" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </section>
    );
  }

  return (
    <form className="estimateCard" onSubmit={submit}>
      <div className="estimateTopline">
        <span>Intex request</span>
        <span>{progress}</span>
      </div>
      <div className="estimateProgress"><span style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>

      <div ref={stepHeadingRef} tabIndex={-1} className="estimateStepStatus">
        <span className="srOnly">Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
      </div>

      <div className="estimateHoneypot" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={lead.website} onChange={(e) => update("website", e.target.value)} /></label>
      </div>

      {step === 0 && (
        <fieldset>
          <legend>What do you need help with?</legend>
          <p>Choose the closest match. You can explain the details later.</p>
          <div className="estimateChoices">
            {serviceOptions.map((service) => (
              <label key={service} className={lead.service === service ? "selected" : ""}>
                <input type="radio" name="service" value={service} checked={lead.service === service} onChange={() => update("service", service)} />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend>Is this happening right now?</legend>
          <p>This helps separate active property damage from planned roofing work.</p>
          <div className="estimateChoices twoCol">
            {["Yes — active property damage", "No — planned / stable"].map((option) => (
              <label key={option} className={lead.emergency === option ? "selected" : ""}>
                <input type="radio" name="emergency" value={option} checked={lead.emergency === option} onChange={() => update("emergency", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {lead.emergency.startsWith("Yes") && <div className="estimateEmergency">For active leaks, storm openings, fire damage or unsafe conditions: <a href={`tel:${site.phone}`}>call {site.phoneDisplay}</a>.</div>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>What type of property is it?</legend>
          <div className="estimateChoices">
            {propertyOptions.map((option) => (
              <label key={option} className={lead.propertyType === option ? "selected" : ""}>
                <input type="radio" name="propertyType" value={option} checked={lead.propertyType === option} onChange={() => update("propertyType", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <label className="estimateField">Property ZIP code<input inputMode="numeric" autoComplete="postal-code" required aria-required="true" maxLength={10} value={lead.zip} onChange={(e) => update("zip", e.target.value)} placeholder="60634" /></label>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>How can Intex reach you?</legend>
          <div className="estimateFields">
            <label className="estimateField">Name<input autoComplete="name" required aria-required="true" value={lead.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></label>
            <label className="estimateField">Phone<input type="tel" inputMode="tel" autoComplete="tel" required aria-required="true" value={lead.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(773) 555-0123" /></label>
            <label className="estimateField">Email <span>optional unless you prefer email</span><input type="email" autoComplete="email" value={lead.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend>Tell us what happened.</legend>
          <p>A few useful details are enough: where the problem is, when you noticed it, and what is changing.</p>
          <label className="estimateField"><span className="srOnly">What happened</span><textarea rows={6} required aria-required="true" value={lead.description} onChange={(e) => update("description", e.target.value)} placeholder="Example: Water started coming through the second-floor ceiling after last night's storm..." /></label>
        </fieldset>
      )}

      {step === 5 && (
        <fieldset>
          <legend>How should we contact you?</legend>
          <div className="estimateChoices twoCol">
            <label className={lead.preferredContact === "phone" ? "selected" : ""}>
              <input type="radio" name="preferredContact" value="phone" checked={lead.preferredContact === "phone"} onChange={() => update("preferredContact", "phone")} />
              <span>Phone / text</span>
            </label>
            <label className={lead.preferredContact === "email" ? "selected" : ""}>
              <input type="radio" name="preferredContact" value="email" checked={lead.preferredContact === "email"} onChange={() => update("preferredContact", "email")} />
              <span>Email</span>
            </label>
          </div>
          {lead.preferredContact === "email" && !hasValidEmail && (
            <div className="estimateEmergency" role="alert">Please go back one step and add a valid email address, or choose Phone / text.</div>
          )}
          <label className="estimateConsent">
            <input type="checkbox" checked={lead.consent} onChange={(e) => update("consent", e.target.checked)} />
            <span>I agree that Intex may contact me about this request using the information I provided. See the <a href="/privacy/" target="_blank" rel="noreferrer">Privacy Policy</a>.</span>
          </label>
          {status === "error" && (
            <div className="estimateEmergency estimateFallback" role="alert">
              <p>We could not send this request online. Your answers are still here &mdash; send them another way:</p>
              <div className="estimateFallbackActions">
                <a className="estimatePrimary" href={buildFallbackMailto(lead)}>Email this request</a>
                <a className="estimateBack" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              </div>
              <p className="estimateFallbackNote">The email button opens your mail app with your request pre-filled to {site.email}.</p>
            </div>
          )}
        </fieldset>
      )}

      <div className="estimateNav">
        <button type="button" className="estimateBack" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0 || status === "submitting"}>Back</button>
        {step < totalSteps - 1 ? (
          <button type="button" className="estimatePrimary" aria-disabled={!canContinue()} aria-describedby={showErrors && stepError() ? "estimate-step-error" : undefined} onClick={goNext}>Continue</button>
        ) : (
          <button type="submit" className="estimatePrimary" aria-disabled={!canContinue()} aria-describedby={showErrors && stepError() ? "estimate-step-error" : undefined} disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send request"}</button>
        )}
      </div>
      <p id="estimate-step-error" className="estimateStepError" role="alert">
        {showErrors ? stepError() : ""}
      </p>
    </form>
  );
}
