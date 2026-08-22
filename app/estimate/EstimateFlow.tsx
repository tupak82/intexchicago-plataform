"use client";

import { FormEvent, useMemo, useState } from "react";

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

const initialLead: LeadDraft = {
  service: "",
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

const serviceOptions = [
  "Roofing / roof leak",
  "Water damage",
  "Fire / smoke damage",
  "Storm / hail damage",
  "Mold concern",
  "Commercial restoration",
  "Trauma / biohazard cleanup",
  "Other property damage",
];

export default function EstimateFlow() {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<LeadDraft>(initialLead);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const totalSteps = 6;
  const progress = useMemo(() => `${Math.min(step + 1, totalSteps)} / ${totalSteps}`, [step]);

  const update = <K extends keyof LeadDraft>(key: K, value: LeadDraft[K]) => {
    setLead((current) => ({ ...current, [key]: value }));
  };

  const canContinue = () => {
    if (step === 0) return Boolean(lead.service);
    if (step === 1) return Boolean(lead.emergency);
    if (step === 2) return Boolean(lead.propertyType && /^\d{5}(-\d{4})?$/.test(lead.zip.trim()));
    if (step === 3) return Boolean(lead.name.trim() && lead.phone.trim());
    if (step === 4) return Boolean(lead.description.trim());
    if (step === 5) return lead.consent;
    return false;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canContinue() || status === "submitting") return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, sourcePage: window.location.pathname }),
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
        <p>Your request was delivered to Intex. For an active emergency, call now rather than waiting for an online response.</p>
        <a className="estimatePrimary" href="tel:+17738225892">Call 773-822-5892</a>
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
          <p>This helps separate urgent property damage from planned work.</p>
          <div className="estimateChoices twoCol">
            {["Yes — active emergency", "No — planned / stable"].map((option) => (
              <label key={option} className={lead.emergency === option ? "selected" : ""}>
                <input type="radio" name="emergency" value={option} checked={lead.emergency === option} onChange={() => update("emergency", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {lead.emergency.startsWith("Yes") && <div className="estimateEmergency">For active leaks, fire, storm openings, or unsafe conditions: <a href="tel:+17738225892">call 773-822-5892 now</a>.</div>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>What type of property is it?</legend>
          <div className="estimateChoices twoCol">
            {["Residential", "Commercial"].map((option) => (
              <label key={option} className={lead.propertyType === option ? "selected" : ""}>
                <input type="radio" name="propertyType" value={option} checked={lead.propertyType === option} onChange={() => update("propertyType", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <label className="estimateField">Property ZIP code<input inputMode="numeric" autoComplete="postal-code" value={lead.zip} onChange={(e) => update("zip", e.target.value)} placeholder="60634" /></label>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>How can Intex reach you?</legend>
          <div className="estimateFields">
            <label className="estimateField">Name<input autoComplete="name" value={lead.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></label>
            <label className="estimateField">Phone<input inputMode="tel" autoComplete="tel" value={lead.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(773) 555-0123" /></label>
            <label className="estimateField">Email <span>optional</span><input type="email" autoComplete="email" value={lead.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend>Tell us what happened.</legend>
          <p>A few useful details are enough: where the damage is, when you noticed it, and what is changing.</p>
          <label className="estimateField"><textarea rows={6} value={lead.description} onChange={(e) => update("description", e.target.value)} placeholder="Example: Water started coming through the second-floor ceiling after last night's storm..." /></label>
        </fieldset>
      )}

      {step === 5 && (
        <fieldset>
          <legend>How should we contact you?</legend>
          <div className="estimateChoices twoCol">
            {["phone", "email"].map((option) => (
              <label key={option} className={lead.preferredContact === option ? "selected" : ""}>
                <input type="radio" name="preferredContact" value={option} checked={lead.preferredContact === option} onChange={() => update("preferredContact", option)} />
                <span>{option === "phone" ? "Phone / text" : "Email"}</span>
              </label>
            ))}
          </div>
          <label className="estimateConsent">
            <input type="checkbox" checked={lead.consent} onChange={(e) => update("consent", e.target.checked)} />
            <span>I agree that Intex may contact me about this request using the information I provided.</span>
          </label>
          {status === "error" && (
            <div className="estimateEmergency" role="alert">
              We could not send this request online. Please call <a href="tel:+17738225892">773-822-5892</a> instead.
            </div>
          )}
        </fieldset>
      )}

      <div className="estimateNav">
        <button type="button" className="estimateBack" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0 || status === "submitting"}>Back</button>
        {step < totalSteps - 1 ? (
          <button type="button" className="estimatePrimary" disabled={!canContinue()} onClick={() => setStep((current) => Math.min(totalSteps - 1, current + 1))}>Continue</button>
        ) : (
          <button type="submit" className="estimatePrimary" disabled={!canContinue() || status === "submitting"}>{status === "submitting" ? "Sending…" : "Send request"}</button>
        )}
      </div>
    </form>
  );
}
