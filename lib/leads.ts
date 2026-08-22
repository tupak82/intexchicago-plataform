export type LeadPayload = {
  service: string;
  emergency: string;
  propertyType: string;
  zip: string;
  name: string;
  phone: string;
  email?: string;
  description: string;
  preferredContact: string;
  consent: boolean;
  sourcePage?: string;
  website?: string;
};

export type LeadValidation = {
  valid: boolean;
  errors: string[];
};

export function validateLead(input: Partial<LeadPayload>): LeadValidation {
  const errors: string[] = [];
  if (!input.service?.trim()) errors.push("service");
  if (!input.emergency?.trim()) errors.push("emergency");
  if (!input.propertyType?.trim()) errors.push("propertyType");
  if (!/^\d{5}(-\d{4})?$/.test(input.zip?.trim() || "")) errors.push("zip");
  if (!input.name?.trim()) errors.push("name");
  if (!input.phone?.trim()) errors.push("phone");
  if (!input.description?.trim()) errors.push("description");
  if (!input.preferredContact?.trim()) errors.push("preferredContact");
  if (input.consent !== true) errors.push("consent");
  if (input.website?.trim()) errors.push("spam");
  return { valid: errors.length === 0, errors };
}

export function normalizeLead(input: LeadPayload) {
  return {
    ...input,
    service: input.service.trim(),
    emergency: input.emergency.trim(),
    propertyType: input.propertyType.trim(),
    zip: input.zip.trim(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || "",
    description: input.description.trim(),
    preferredContact: input.preferredContact.trim(),
    sourcePage: input.sourcePage?.trim() || "/estimate/",
    receivedAt: new Date().toISOString(),
  };
}
